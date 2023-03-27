using MimeKit;

namespace Land_Vision.DTO
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public Message(IEnumerable<string> to, string subject, string content)
        {
            Subject = subject;
            Content = content;        
        }
    }
}