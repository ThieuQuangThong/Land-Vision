using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class WardRepository : IWardRepository
    {
        private readonly DataContext _dbContext;
        public WardRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddWardAsync(Ward ward)
        {
            await _dbContext.AddAsync(ward);
            return await SaveChangesAsync();
        }

        public async Task<bool> CheckWardIsExistByIdAsync(int wardId)
        {
            return await _dbContext.Wards.AnyAsync(x => x.Id == wardId);
        }

        public async Task<bool> DeleteWardByIdAsync(int wardId)
        {
            var ward = await _dbContext.Wards.Where(x => x.Id == wardId).FirstOrDefaultAsync();
            _dbContext.Wards.Remove(ward);
            return await SaveChangesAsync();
        }

        public async Task<Ward> GetWardByIdAsync(int wardId)
        {
            return await _dbContext.Wards.Where(x => x.Id == wardId).FirstOrDefaultAsync();
        }

        public async Task<List<Ward>> GetWardsAsync()
        {
            return await _dbContext.Wards.Include(x => x.District).ToListAsync();
        }

        public async Task<List<Ward>> GetWardsByDistrictIdAsync(int districtId)
        {
            return await _dbContext.Wards.Where(x => x.District.Id == districtId).ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateWardAsync(Ward ward)
        {
            _dbContext.Wards.Update(ward);
            return await SaveChangesAsync();
        }
    }
}