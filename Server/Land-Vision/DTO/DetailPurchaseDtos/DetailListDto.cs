using Land_Vision.DTO.UserDtos;
using Land_Vision.DTO.vipDtos;

namespace Land_Vision.DTO.DetailPurchaseDtos
{
    public class DetailListDto
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public UserDto User { get; set; }
        public VipDto Vip { get; set; }
    }
}