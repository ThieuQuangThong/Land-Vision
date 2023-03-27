namespace Land_Vision.dto.PostDtos
{
    public class PostDtos
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfView { get; set; }

        public bool isVerified { get; set; }
    }
}
