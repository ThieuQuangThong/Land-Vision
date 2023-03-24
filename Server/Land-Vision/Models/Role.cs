namespace Land_Vision.Models
{
    public class Role
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool CanSell { get; set; } = false;
        public List<Account> Accounts { get; set; }
    }
}
