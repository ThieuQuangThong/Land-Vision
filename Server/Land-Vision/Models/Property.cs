namespace Land_Vision.Models
{
    public class Property
    {
        public int Id { get; set; }
        public double Area { get; set; }
        public double FrontangeArea { get; set; }
        public double Price { get; set; }
        public string Juridical { get; set; }
        public string Interior { get; set; }
        public string Direction { get; set; }
        public double WayIn { get; set; }
        public int NumberOfFloor { get; set; }
        public int NumberOfBed { get; set; }
        public int NumberOfBath { get; set; }
        public Category Category { get; set; }
        public User User { get; set; }
        public City City { get; set; }
        public District District { get; set; }
        public Street Street { get; set; }

    }
}
