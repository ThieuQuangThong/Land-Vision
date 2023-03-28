using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _dbContext;
        public RoleRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddRoleAsync(Role role)
        {
            await _dbContext.Roles.AddAsync(role);
            return await SaveChangesAsync();
        }

        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _dbContext.Roles.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Role> GetRoleByNameAsync(string name)
        {
            return await _dbContext.Roles.Where(x => x.Name == name).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}