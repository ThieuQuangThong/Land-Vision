using Land_Vision.DTO.PositionDtos;
using Land_Vision.Models;
using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.PropertyDtos
{
    public class PropertyDto
    {
        public int Id { get; set; }
        [Required]
        public double Area { get; set; }
        public double FrontangeArea { get; set; }
        [Required]
        public double Price { get; set; }
        public int Juridical { get; set; }
        public bool IsInterior { get; set; }
        public string Direction { get; set; }
        public int AddressNumber { get; set; }
        public double WayIn { get; set; }
        public int NumberOfFloor { get; set; }
        public int NumberOfBed { get; set; }
        public int NumberOfBath { get; set; }
        public int PostId { get; set; }
        public int CategoryId { get; set; }
        public int StreetId { get; set; }
        [Required]
        public List<PositionDto> PositionDtos { get; set; }
    }
}
