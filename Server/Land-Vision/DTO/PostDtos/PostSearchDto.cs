using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.PostDtos
{
    public class PostSearchDto
    {
        public string? Text { get; set; }
        [Required]
        public int TransactionType { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public double Price { get; set; }
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