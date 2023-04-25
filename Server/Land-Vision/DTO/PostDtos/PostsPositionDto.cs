using Land_Vision.DTO.PositionDtos;

namespace Land_Vision.DTO.PostDtos
{
    public class PostsPositionDto
    {
        public int Id {get;set;}
        public string AddressNumber {get; set;}
        public string Name {get;set;}
        public PositionDto[] positions {get; set;}
    }
}