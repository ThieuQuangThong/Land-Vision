using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _dbContext;
        public CityRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddCityAsync(City city)
        {
            await _dbContext.AddAsync(city);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeleteCityAsync(City city)
        {
            _dbContext.Remove(city);
            return await SaveChangeAsync();
        }

        public async Task<List<City>> GetCitiesAsync()
        {
            return await _dbContext.Citys.AsNoTracking().OrderBy(c => c.Id).ToListAsync();
        }

        public async Task<City> GetCityAsync(int cityId)
        {
            return await _dbContext.Citys.AsNoTracking().Where(c => c.Id == cityId).FirstOrDefaultAsync();
        }

        public async Task<City> GetCityByNameAsync(string cityName)
        {
            return await _dbContext.Citys.AsNoTracking().Where(c => c.Name == cityName).FirstOrDefaultAsync();
        }

        public async Task<List<District>> GetDistrictOfCityAsync(int cityId)
        {
            return await _dbContext.Districts.AsNoTracking().Where(d => d.City.Id == cityId).ToListAsync();
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdateCityAsync(City city)
        {
            _dbContext.Update(city);
            return await SaveChangeAsync();
        }
    }
}
