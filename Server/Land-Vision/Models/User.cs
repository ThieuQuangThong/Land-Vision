using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string AvatarLink { get; set; } = "";

        [Required]
        public string FrontOfIdentityCard { get; set; }

        [Required]
        public string BackOfIdentityCard { get; set; }

        public string Phone { get; set; } = string.Empty;

        [Required]
        public string IdentityNumber { get; set; }

        public bool IsAccuracy { get; set; } = false;

        [Required]
        public string Email { get; set; }

        [Required]
        public new byte[] PasswordHash { get; set; }

        [Required]
        public new byte[] PasswordSalt { get; set; }

        public string Code { get; set; } = string.Empty;

        public DateTime CodeExpires { get; set; }

        public bool EmailConfirmed { get; set; } = false;
        
        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpireTime { get; set; }
        public string? ValidateResetToken { get; set; }

        public DateTime EmailExpiresTime { get; set; }

        [Required]
        public Role Role { get; set; }
        public Vip? Vip {get; set;}

        public List<Post> Posts { get; set; }
    }
}
