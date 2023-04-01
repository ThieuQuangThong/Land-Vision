using Land_Vision.DTO.PropertyDtos;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Models;
using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.PostDtos
{
    public class PostDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfView { get; set; }
        public bool isVerified { get; set; } = false;
        public PropertyDto Property { get; set; }
        public UserDto User { get; set; }
        
        public List<Image> Images { get; set; }

    }
}
