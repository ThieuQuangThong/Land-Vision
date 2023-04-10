using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class DistrictRepository : IDistrictRepository
    {
        private readonly DataContext _dbContext;
        public DistrictRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddDistrictAsync(int cityId, District district)
        {
            district.City = await _dbContext.Citys.Where(c => c.Id == cityId).FirstOrDefaultAsync();

            await _dbContext.AddAsync(district);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeleteDistrictAsync(District district)
        {
            _dbContext.Remove(district);
            return await SaveChangeAsync();
        }

        public async Task<List<District>> GetDistrictsAsync()
        {
            return await _dbContext.Districts.AsNoTracking().OrderBy(d => d.Id).ToListAsync();
        }

        public async Task<District> GetDistrictAsync(int districtId)
        {
            return await _dbContext.Districts.Where(c => c.Id == districtId).FirstOrDefaultAsync();
        }

        public async Task<District> GetDistrictByNameAsync(string districtName)
        {
            return await _dbContext.Districts.Where(c => c.Name == districtName).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdateDistrictAsync(District district)
        {
            _dbContext.Update(district);
            return await SaveChangeAsync();
        }

        public async Task<List<Street>> GetStreetOfDistrictAsync(int districtId)
        {
            return await _dbContext.Streets.AsNoTracking().Where(s => s.District.Id == districtId).ToListAsync();
        }

        public async Task<bool> AddDistrictListAsync(City city, List<District> districts)
        {
            districts.ForEach(x => x.City = city);

           await _dbContext.Districts.AddRangeAsync(districts);
            
            return await SaveChangeAsync();
        }
    }
}
