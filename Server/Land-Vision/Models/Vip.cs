using System.ComponentModel.DataAnnotations;

namespace Land_Vision.Models
{
    public class Vip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public int VipLevel { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int PostLimit { get; set; }
        public List<User> Users { get; set; }
        public List<DetailPurchase> DetailPurchases { get; set; }

    }
}