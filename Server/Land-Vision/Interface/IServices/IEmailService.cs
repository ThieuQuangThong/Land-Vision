using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Land_Vision.DTO;
using Land_Vision.Models;
using MimeKit;

namespace Land_Vision.Interface.IServices
{
    public interface IEmailService
    {
        void SendMail(Message message);
        string GenerateEmailConfirmToken(User user);
        Task ConfirmEmailAsync(string emailToken);
    }
}