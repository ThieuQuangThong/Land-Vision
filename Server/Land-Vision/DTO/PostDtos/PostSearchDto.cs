using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.PostDtos
{
    public class PostSearchDto
    {
        [Required]
        public int TransactionType { get; set; }
        [Required]
        public int InteriorStatus { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int NumberOfFloor { get; set; }
        [Required]
        public int NumberOfBed { get; set; }
        [Required]
        public int NumberOfBath { get; set; }
        [Required]
        public int Direction { get; set; }
    }

}