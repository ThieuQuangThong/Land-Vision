using Land_Vision.Common;
using Land_Vision.Data;
using Land_Vision.Dto.DateTimeDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

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
            return await _dbContext.Users.Include(x => x.Role)
            .Where(J => J.Role.Name == RoleField.USER)
            .Skip(pagination.SkipCount)
            .Take(pagination.MaxResultCount)
            .Include(v => v.Posts)
            .AsNoTracking()
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
            return await _dbContext.Users
            .Where(x => x.Role.Name == RoleField.USER)
            .CountAsync();
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
            return await _dbContext.Users.Where(x => x.RefreshToken == freshToken).Include(c => c.Role)
            .FirstOrDefaultAsync();
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

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dbContext.Users
            .Where(x => x.Id == id)
            .Include(k => k.Role)
            .Include(p => p.Posts)
            .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateVipUserAsync(int userId, int vipId)
        {
            var user = await _dbContext.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            var vip = await _dbContext.Vips.Where(x => x.Id == vipId).FirstOrDefaultAsync();
            user.Vip = vip;
            _dbContext.Users.Update(user);
            return await SaveChangesAsync();
        }

        public async Task<DateTimeDto> CountUserByDateTimeAsync()
        {
            var accounts = await _dbContext.Users.ToListAsync();
            var accountCountByYear = accounts
                .GroupBy(a => a.EmailExpiresTime.Year)
                .Select(g => new { Year = g.Key.ToString(), Count = g.Count() })
                .OrderBy(x => x.Year)
                .ToDictionary(x => x.Year, x => x.Count);
            var accountCountByMonth = accounts
               .GroupBy(c => new { c.EmailExpiresTime.Year, c.EmailExpiresTime.Month })
               .Select(g => new { Year = g.Key.Year.ToString(), Month = g.Key.Month.ToString(), Count = g.Count() })
               .OrderBy(x => x.Year)
               .ThenBy(x => x.Month)
               .ToDictionary(x => x.Year + "-" + x.Month, x => x.Count);
            var accountCountByDay = accounts
                .GroupBy(c => c.EmailExpiresTime.Date)
                .Select(g => new { Day = g.Key.ToString("yyyy-MM-dd"), Count = g.Count() })
                .OrderBy(x => x.Day)
                .ToDictionary(x => x.Day, x => x.Count);
            return new DateTimeDto
            {
                NumbByMonths = accountCountByMonth,
                NumbByYears = accountCountByYear,
                NumbByDays = accountCountByDay
            };
        }
    }
}
