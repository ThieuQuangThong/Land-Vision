using Land_Vision.Dto.DateTimeDtos;
using Land_Vision.Dto.TypeDtos;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IDetailPurchaseRepository
    {
        Task<List<DetailPurchase>> GetAllDetailPurchase();
        Task<int> CountPostUserBuy(int userId);
        Task<double> GetRevenue();
        Task<DateTimeRevenueDto> SumRevenueByDateTimeAsync();
        Task<List<VipTypeDto>> CountRevenueByTypeOfVip();
        Task<bool> AddDetailPurchaseAsync(DetailPurchase detailPurchase);
        Task<bool> SaveChangeAsync();
    }
}
