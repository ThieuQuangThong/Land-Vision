namespace ChatBotAPI.Model
{
    public class Location
    {
        public string SubadminArea { get; set; }
        public string BusinessName { get; set; }
        public string Island { get; set; }
        public string AdminArea { get; set; }
        public string ZipCode { get; set; }
        public string Shortcut { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string StreetAddress { get; set; }
    }
    public class ParamsObject
    {
        public Location Location { get; set; }
    }
}
