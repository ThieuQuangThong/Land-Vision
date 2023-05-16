using System.ComponentModel.DataAnnotations;
using Land_Vision.DTO.ImageDtos;

namespace Land_Vision.DTO.PostDtos
{
    public class PostRequestDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string RejectReason {get;set;} ="";
        public int transactionType {get; set;}
        [Required]
        public List<ImageDto> images { get; set; }
    }
}