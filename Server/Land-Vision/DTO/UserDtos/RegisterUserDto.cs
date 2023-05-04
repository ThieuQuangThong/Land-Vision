using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.UserDtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Name { get; set; }
        public string FrontOfIdentityCard {get; set;}="";
        public string BackOfIdentityCard { get; set; } =""; 
        public string IdentityNumber { get; set; }="";
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string password { get; set; }
    }
}