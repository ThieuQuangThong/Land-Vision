using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.UserDtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string FrontOfIdentityCard {get; set;}
        [Required]
        public string BackOfIdentityCard { get; set; }  
        [Required]
        public string IdentityNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string password { get; set; }
    }
}