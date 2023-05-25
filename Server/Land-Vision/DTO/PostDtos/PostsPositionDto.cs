using Land_Vision.DTO.ImageDtos;
using Land_Vision.DTO.PositionDtos;

namespace Land_Vision.DTO.PostDtos
{
    public class PostsPositionDto
    {
        public int Id {get;set;}
        public string AddressNumber {get; set;}
        public string Title {get; set;}
        public int ApproveStatus {get; set;}
        public double Area {get; set;}
        public int UserId {get; set;}
        public string Name {get; set;}
        public double Price {get; set;}
        public List<ImageDto> Images {get; set;}
        public string AvatarLink {get; set;}
        public PositionDto[] positions {get; set;}
    }
}