namespace Land_Vision.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Property> Properties { get; set; }
    }
}
