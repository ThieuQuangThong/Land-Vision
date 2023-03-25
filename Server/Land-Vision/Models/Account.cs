
using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string PasswordSalt { get; set; }
        public string Code { get; set; }
        public DateTime CodeExpires { get; set; }
        public bool EmailConfirmed { get; set; } = false;
        public DateTime EmailConfirmedAt { get; set; }
        public Role Role { get; set; }
        public User User { get; set; }

    }
}
