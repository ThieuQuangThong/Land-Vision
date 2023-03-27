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
        public string Phone { get; set; }

        [Required]
        public string IdentityNumber { get; set; }
        public bool IsAccuracy { get; set; } = false;
        public int AccountId {get; set;}
        public Account Account { get; set; }
        public List<Post> Posts { get; set; }
    }
}
