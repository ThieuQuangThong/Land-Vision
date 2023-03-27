using System.Globalization;
using System.Text;
using Land_Vision.Common;
using Land_Vision.DTO;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using MimeKit;

namespace Land_Vision.service
{
    public class EmailService : IEmailService
    {
        private readonly IUserRepository _userRepository;
        private readonly EmailConfiguration _emailConfig;
        public EmailService(EmailConfiguration emailConfig, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _emailConfig = emailConfig;
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(TextField.SENDER_NAME,_emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = string.Format("<h2 style='color:red;'>{0}</h2>", message.Content) };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);
                    client.Send(mailMessage);
                }  
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        public void SendMail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }

        public string GenerateEmailConfirmToken(User user)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentException("Invalid user!");
                }
                var plainTextBytes = Encoding.UTF8.GetBytes(user.Email + "&" + user.EmailExpiresTime);

                return Convert.ToBase64String(plainTextBytes);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Invalid user!", ex);
            }
        }

        public async Task ConfirmEmailAsync(string emailToken)
        {
            byte[] data = Convert.FromBase64String(emailToken);
            string normalString = Encoding.UTF8.GetString(data);

            string[] parts = normalString.Split('&');
            if (parts.Length != 2){
                throw new ArgumentException("Invalid email token format!");               
            }

            string email = parts[0];
            DateTime exprireDateTime = DateTime.ParseExact(parts[1].ToString(), "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);

            var user = await _userRepository.GetUserByEmailAsync(email);

            if(user == null){
                throw new Exception("Person not found!");               
            }

            if(exprireDateTime < DateTime.Now){
                throw new Exception("Token has expired!");                
            }

            user.EmailConfirmed = true;
            await _userRepository.UpdateUserAsync(user);
        }
    }
}
