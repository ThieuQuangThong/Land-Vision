namespace Land_Vision.dto.PropertiesDto
{
    public class PropertyDto
    {
        public int Id { get; set; }
        public double Area { get; set; }
        public double FrontangeArea { get; set; }
        public double Price { get; set; }
        public string Juridical { get; set; }
        public string Interior { get; set; }
        public string Direction { get; set; }
        public int AddressNumber { get; set; }
        public double WayIn { get; set; }
        public int NumberOfFloor { get; set; }
        public int NumberOfBed { get; set; }
        public int NumberOfBath { get; set; }
        public int PostId { get; set; }
        public int DistrictId { get; set; }
        public int StreetId { get; set; }
    }
}
