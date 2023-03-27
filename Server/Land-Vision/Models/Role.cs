using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class Role
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool CanSell { get; set; } = false;
        public List<User>? Users { get; set; }
    }
}
