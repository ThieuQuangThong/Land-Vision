using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IDetailPurchaseRepository
    {
        Task<List<DetailPurchase>> GetAllDetailPurchase();
        Task<double> GetRevenue();
        Task<bool> AddDetailPurchaseAsync(DetailPurchase detailPurchase);
        Task<bool> SaveChangeAsync();
    }
}
