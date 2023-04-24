using Land_Vision.DTO.ImageDtos;
using Land_Vision.DTO.PropertyDtos;
using Land_Vision.DTO.UserDtos;
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
        public int transactionType { get; set; }
        public bool isHide { get; set; } = false;

        public DateTime CreateDate { get; set; }
        public PropertyDto Property { get; set; }
        public UserDto User { get; set; }
        public List<ImageDto> Images { get; set; }
    }
}
