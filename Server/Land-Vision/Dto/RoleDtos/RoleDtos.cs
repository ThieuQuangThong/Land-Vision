using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.RoleDtos
{
    public class RoleDto
    {
        public int Id { get; set;}

        [Required]
        public string Name { get; set;}

        [Required]
        public bool IsAdmin { get; set;} = false;

        [Required]
        public bool CanSell { get; set;} = false;
    }
}
