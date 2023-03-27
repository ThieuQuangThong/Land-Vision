namespace Land_Vision.dto.RoleDtos
{
    public class RoleDtos
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool CanSell { get; set; } = false;
    }
}
