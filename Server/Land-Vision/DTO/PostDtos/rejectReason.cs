using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.PostDtos
{
    public class RejectReasonDto
    {
        [Required]
        public string RejectReason {get; set;}
    }
}