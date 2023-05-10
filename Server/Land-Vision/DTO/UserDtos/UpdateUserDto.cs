using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.UserDtos
{
    public class UpdateUserDto
    {

        [Required]
        public string Name { get; set; } = string.Empty;

        public string AvatarLink { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;
    }
}