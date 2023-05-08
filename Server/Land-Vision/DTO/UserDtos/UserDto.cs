namespace Land_Vision.DTO.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string AvatarLink { get; set; } = "";
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; }
        public string Role { get; set; }
        public int Posted {get; set;}
        public int VipLevel {get; set;}
        public string IdentityNumber { get; set; }

        public int NumberOfUserCanPost {get; set;}
        public DateTime EmailExpiresTime { get; set; }

        public bool isHide { get; set; } = false;

    }
}