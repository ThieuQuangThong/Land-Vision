using System.ComponentModel.DataAnnotations;
using Land_Vision.Common;

namespace Land_Vision.DTO.UserDtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Name { get; set; }
        public string FrontOfIdentityCard {get; set;}="";
        public string BackOfIdentityCard { get; set; } =""; 
        public string IdentityNumber { get; set; }="";
        public string AvatarLink {get; set;} = TextField.AVATAR_DEFAULT;
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string password { get; set; }
    }
}