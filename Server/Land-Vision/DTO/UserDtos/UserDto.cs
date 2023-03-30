using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Land_Vision.DTO.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string AvatarLink { get; set; } = "";
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; }
        public string roleName { get; set; }
    }
}