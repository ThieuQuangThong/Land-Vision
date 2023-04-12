using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class Ward
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public District District { get; set; }
    }
}