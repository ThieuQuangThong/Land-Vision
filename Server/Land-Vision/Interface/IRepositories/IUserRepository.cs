using Land_Vision.DTO.UserDtos;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IUserRepository
    {
        Task<bool> CheckCodeIsExistWithEmail(ValidateCodeDto validateCodeDto);
        Task<bool> CodeIsExistAsync(string code);
        Task<User> GetUserByEmailAsync(string email);
        Task<bool> CreateUserAsync(User user);
        Task<bool> UpdateUserAsync(User user);
        Task<List<User>> GetUsersAsync();
        Task<bool> SaveChangesAsync();
    }
}