using System.Net.Mail;
using Land_Vision.Interface.IServices;

namespace Land_Vision.service
{
    public class EmailService : IEmailService
    {
        public async Task<bool> SendMail(string _from, string _to, string _subject, string _body, SmtpClient client)
        {
            MailMessage message = new MailMessage (
                from: _from,
                to: _to,
                subject: _subject,
                body: _body
            );
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.SubjectEncoding = System.Text.Encoding.UTF8;
            message.IsBodyHtml = true;
            message.ReplyToList.Add (new MailAddress (_from));
            message.Sender = new MailAddress (_from);
            try {
                await client.SendMailAsync (message);
                return true;
            } catch (Exception ex) {
                Console.WriteLine (ex.Message);
                return false;
            }
        }
        }
    }
