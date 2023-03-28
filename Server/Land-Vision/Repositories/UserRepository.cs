using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly DataContext _dbContext;
        public UserRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateUserAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            return await SaveChangesAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
           return await _dbContext.Users.Where(x => x.Email == email).Include(p => p.Role).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _dbContext.Users.Update(user);
            return await SaveChangesAsync();  
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _dbContext.Users.Include(x => x.Role).AsNoTracking().ToListAsync();
        }
    }
}