namespace Land_Vision.Dto.DateTimeDtos
{
    public class DateTimeRevenueDto
    {
        public Dictionary<string, double> NumbByDays { get; set; }
        public Dictionary<string, double> NumbByMonths { get; set; }
        public Dictionary<string, double> NumbByYears { get; set; }
    }
}
