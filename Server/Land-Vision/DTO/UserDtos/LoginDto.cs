using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.UserDtos
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password {get; set;}    
    }
}