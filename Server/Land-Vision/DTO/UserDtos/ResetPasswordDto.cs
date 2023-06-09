using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Land_Vision.DTO.UserDtos
{
    public class ResetPasswordDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Code { get; set; }
        
        [Required]
        public string Password {get; set;}    
    }
}