using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class VipRepository : IVipRepository
    {
        private readonly DataContext _dbContext;
        public VipRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public async Task<Vip> AddVipAsync(Vip vip)
        {
            await _dbContext.Vips.AddAsync(vip);
            await SaveChangesAsync();
            return vip;
        }

        public Task<bool> CheckVipIsExistByIdAsync(int vipId)
        {
            return _dbContext.Vips.AnyAsync(x => x.Id == vipId);
        }

        public async Task<bool> DeleteVipByIdAsync(int vipId)
        {
            var vip = await _dbContext.Vips.Where(x => x.Id == vipId).FirstOrDefaultAsync();
            _dbContext.Vips.Remove(vip);
            return await SaveChangesAsync();
        }

        public async Task<Vip> GetVipByIdAsync(int vipId)
        {
            return await _dbContext.Vips.Where(x => x.Id == vipId).FirstOrDefaultAsync();
        }

        public async Task<Vip> GetVipByLevelAsync(int level)
        {
            return await _dbContext.Vips.Where(x => x.VipLevel == level).FirstOrDefaultAsync();
        }

        public async Task<Vip> GetVipByNameAsync(string name)
        {
            return await _dbContext.Vips.Where(p => p.Name == name).FirstOrDefaultAsync();
        }

        public async Task<List<Vip>> GetVipsAsync()
        {
            return await _dbContext.Vips.ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateVipAsync(Vip vip)
        {
            _dbContext.Vips.Update(vip);
            
            return await SaveChangesAsync();
        }
    }
}