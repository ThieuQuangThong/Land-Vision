using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Land_Vision.Interface.IServices
{
    public interface IEmailService
    {
        Task<bool> SendMail(string _from, string _to, string _subject, string _body, SmtpClient client);
    }
}