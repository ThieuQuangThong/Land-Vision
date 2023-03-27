namespace Land_Vision.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfView { get; set; }

        public bool isVerified {get; set;}
        public Status Status { get; set; }
        public User User { get; set; }
        public Property Property { get; set; }
        public List<Image> Images { get; set; }

    }
}
