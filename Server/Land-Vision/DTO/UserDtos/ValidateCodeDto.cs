using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.UserDtos
{
    public class ValidateCodeDto
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Code {get; set;}        
    }
}