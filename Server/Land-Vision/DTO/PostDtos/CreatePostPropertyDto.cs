using Land_Vision.DTO.PositionDtos;
using Land_Vision.DTO.PostDtos;
using Land_Vision.DTO.PropertyDtos;

namespace Land_Vision.Dto.PostDtos
{
    public class CreatePostPropertyDto
    {
        public PostDto postDto { get; set; }
        public PropertyDto propertyDto { get; set; }
    }
}
