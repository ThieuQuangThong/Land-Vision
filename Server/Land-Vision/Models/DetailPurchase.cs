namespace Land_Vision.Models
{
    public class DetailPurchase
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public User User { get; set; }
        public Vip Vip { get; set; }
    }
}
