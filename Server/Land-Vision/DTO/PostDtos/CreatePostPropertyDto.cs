using System.ComponentModel.DataAnnotations;
using Land_Vision.DTO.ImageDtos;
using Land_Vision.DTO.PostDtos;
using Land_Vision.DTO.PropertyDtos;

namespace Land_Vision.Dto.PostDtos
{
    public class CreatePostPropertyDto
    {
        public PostRequestDto post { get; set; }
        public PropertyRequestDto property { get; set; }

    }
}
