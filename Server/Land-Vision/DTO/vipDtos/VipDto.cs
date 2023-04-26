using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.vipDtos
{
    public class VipDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public int VipLevel { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int PostLimit { get; set; }
    }
}