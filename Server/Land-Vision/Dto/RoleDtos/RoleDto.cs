namespace Land_Vision.dto.RolesDto
{
    public class RoleDto
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool CanSell { get; set; } = false;
    }
}
