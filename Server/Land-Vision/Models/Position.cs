namespace Land_Vision.Models
{
    public class Position
    {
        public int Id { get; set; }
        public string Longtitude { get; set; }
        public string Latitude { get; set; }
        public List<Property> Properties { get; set; }


    }
}
