using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string AvatarLink { get; set; }
        [Required]
        public string FrontOfIdentityCard { get; set; }
        [Required]
        public string BackOfIdentityCard { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string IdentityNumber { get; set; }
        public bool IsAccuracy { get; set; } = false;
        public int AccountId {get; set;}
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
        public List<Post> Posts { get; set; }
    }
}
