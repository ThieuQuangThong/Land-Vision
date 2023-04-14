using System.ComponentModel.DataAnnotations;
using Land_Vision.DTO.PositionDtos;

namespace Land_Vision.DTO.PropertyDtos
{
    public class PropertyRequestDto
    {
        [Required]
        public double Area { get; set; }
        public double FrontangeArea { get; set; }
        [Required]
        public double Price { get; set; }
        public int Juridical { get; set; }
        public bool IsInterior { get; set; }
        public int Direction { get; set; }
        public string AddressNumber { get; set; }
        public double WayIn { get; set; }
        public int NumberOfFloor { get; set; }
        public int NumberOfBed { get; set; }
        public int NumberOfBath { get; set; }
        public int CategoryId { get; set; }
        public int WardId { get; set; }
        public int StreetId { get; set; }
        [Required]
        public List<PositionDto> Positions { get; set; }       
    }
}