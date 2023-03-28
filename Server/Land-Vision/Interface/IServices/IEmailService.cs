using Land_Vision.DTO;
using Land_Vision.Models;

namespace Land_Vision.Interface.IServices
{
    public interface IEmailService
    {
        void SendMail(Message message);
        string GenerateEmailConfirmToken(User user);
        Task ConfirmEmailAsync(string emailToken);
    }
}