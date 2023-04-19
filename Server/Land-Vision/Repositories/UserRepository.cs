using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class UserRepository : IUserRepository
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

        public async Task<List<User>> GetUsersAsync(Pagination pagination)
        {
            return await _dbContext.Users.Include(x => x.Role).AsNoTracking()
            .Skip(pagination.SkipCount)
            .Take(pagination.MaxResultCount)
            .ToListAsync();
        }


        public async Task<bool> CodeIsExistAsync(string code)
        {
            return await _dbContext.Users.AnyAsync(p => p.Code == code);
        }

        public async Task<bool> CheckCodeIsExistWithEmail(ValidateCodeDto validateCodeDto)
        {
            return await _dbContext.Users.AnyAsync(x =>
                        x.Code == validateCodeDto.Code && x.Email == validateCodeDto.Email);
        }

        public async Task<int> GetUserTotalAsync()
        {
            return await _dbContext.Users.CountAsync();
        }

        public async Task<User> GetUserAsync(int userId)
        {
            return await _dbContext.Users.AsNoTracking().Where(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<bool> CheckIsExistUserByEmailAsync(string email)
        {
            return await _dbContext.Users.AnyAsync(x => x.Email == email);
        }

        public async Task<bool> CheckIsExistIdentificationCardAsync(string idCard)
        {
            return await _dbContext.Users.AnyAsync(x => x.IdentityNumber == idCard);
        }

        public async Task<bool> CheckFreshTokenIsValidAsync(string freshToken)
        {
            return await _dbContext.Users.AnyAsync(x => x.RefreshToken == freshToken && x.RefreshTokenExpireTime > DateTime.Now);
        }

        public async Task<User> GetUserByFreshTokenAsync(string freshToken)
        {
            return await _dbContext.Users.Where(x => x.RefreshToken == freshToken).FirstOrDefaultAsync();
        }

        public async Task<bool> CheckIsExistValidatePasswordToken(string email, string token)
        {
            return await _dbContext.Users.AnyAsync(x => x.ValidateResetToken == token && x.Email == email);
        }

        public async Task<bool> CheckIsExistByIdAsync(int id)
        {
            return await _dbContext.Users.AnyAsync(x => x.Id == id);
        }

        public async Task<bool> DeleteUserByIdAsync(int userId)
        {
            var user = await _dbContext.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            _dbContext.Users.Remove(user);
            return await SaveChangesAsync();
        }
    }
}