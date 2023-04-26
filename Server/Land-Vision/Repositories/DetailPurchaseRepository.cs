using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class DetailPurchaseRepository : IDetailPurchaseRepository
    {
        private readonly DataContext _dbContext;

        public DetailPurchaseRepository(DataContext dbContext, IVipRepository vipRepository, IUserRepository userRepository)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddDetailPurchaseAsync(DetailPurchase detailPurchase)
        {

            await _dbContext.DetailPurchases.AddAsync(detailPurchase);
            return await SaveChangeAsync();
        }

        public async Task<List<DetailPurchase>> GetAllDetailPurchase()
        {
            return await _dbContext.DetailPurchases.OrderByDescending(x => x.TransactionDate)
                .Include(x => x.User)
                .Include(x => x.Vip)
                .ToListAsync();
        }

        public async Task<double> GetRevenue()
        {
            return await _dbContext.DetailPurchases.SumAsync(x => x.Vip.Price);
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
