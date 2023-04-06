using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfView { get; set; }
        public bool IsVerified { get; set; } = false;
        public int transactionType { get; set; }
        public DateTime CreateDate {get; set;}
        [Required]
        public User User { get; set; }
        public int PropertyId {get; set;}
        [Required]
        public Property Property { get; set; }
        [Required]
        public List<Image> Images { get; set; }
    }
}
