namespace Land_Vision.Models
{
    public class District
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public City City { get; set; }
        public List<Street> Streets { get; set; }
        public List<Property> Properties { get; set; }

    }
}
