using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class StreetRepository : IStreetRepository
    {
        private readonly DataContext _dbContext;
        public StreetRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddStreetAsync(int districtId, Street street)
        {
            street.District = await _dbContext.Districts.Where(d => d.Id == districtId).FirstOrDefaultAsync();

            await _dbContext.Streets.AddAsync(street);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeleteStreetAsync(Street street)
        {
            _dbContext.Streets.Remove(street);
            return await SaveChangeAsync();
        }

        public async Task<Street> GetStreetByIdAsync(int streetId)
        {
            return await _dbContext.Streets.Where(s => s.Id == streetId).FirstOrDefaultAsync();
        }

        public async Task<Street> GetStreetByNameAsync(string streetName)
        {
            return await _dbContext.Streets.Where(s => s.Name == streetName).FirstOrDefaultAsync();
        }

        public async Task<List<Street>> GetStreetsAsync()
        {
            return await _dbContext.Streets.OrderBy(s => s.Id).ToListAsync();

        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdateStreetAsync(Street street)
        {
            _dbContext.Streets.Update(street);
            return await SaveChangeAsync();
        }
    }
}
