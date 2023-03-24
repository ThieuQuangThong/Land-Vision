namespace Land_Vision.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AvatarLink { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string IdentityNumber { get; set; }
        public bool IsAccuracy { get; set; } = false;
        public Account Account { get; set; }
        public List<Post> Posts { get; set; }
    }
}
