
namespace Land_Vision.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Code { get; set; }
        public DateTime CodeExpires { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTime EmailConfirmedAt { get; set; }
        public Role Role { get; set; }
        public User User { get; set; }

    }
}
