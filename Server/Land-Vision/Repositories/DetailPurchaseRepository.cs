using Land_Vision.Data;
using Land_Vision.Dto.DateTimeDtos;
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

        public async Task<int> CountPostUserBuy(int userId)
        {
            var userPurchases = await _dbContext.DetailPurchases
            .Include(x => x.Vip)
            .Where(p => p.User.Id == userId)
            .ToListAsync();

            var sum = 0;
            userPurchases.ForEach(
                k => sum += k.Vip.PostLimit
            );

            return sum;
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

        public async Task<DateTimeRevenueDto> SumRevenueByDateTimeAsync()
        {
            var purchases = await _dbContext.DetailPurchases.Include(p=> p.Vip).ToListAsync();
            var sumRevenueByYear = purchases
                .GroupBy(r => r.TransactionDate.Year)
                .Select(r => new
                {
                    Year = r.Key.ToString(),
                    Sum = r.Sum(g => g.Vip.Price)
                })
                .OrderBy(x => x.Year)
                .ToDictionary(x => x.Year, x => x.Sum);
            var sumRevenueByMonth = purchases
                .GroupBy(r => new { r.TransactionDate.Year, r.TransactionDate.Month })
                .Select(g => new { Year = g.Key.Year.ToString(), Month = g.Key.Month.ToString(), Sum = g.Sum(r => r.Vip.Price) })
                .OrderBy(x => x.Year)
                .ThenBy(x => x.Month)
                .ToDictionary(x => x.Year + "-" + x.Month, x => x.Sum);
            var sumRevenueByDay = purchases
                .GroupBy(r => r.TransactionDate.Date)
                .Select(r => new { Day = r.Key.ToString("yyyy-MM-dd"), Sum = r.Sum(g=>g.Vip.Price) })
                .OrderBy(x => x.Day)
                .ToDictionary(x=>x.Day, x=> x.Sum);
            return new DateTimeRevenueDto
            {
                NumbByYears = sumRevenueByYear,
                NumbByMonths= sumRevenueByMonth,
                NumbByDays = sumRevenueByDay,
            };
        }
    }
}
