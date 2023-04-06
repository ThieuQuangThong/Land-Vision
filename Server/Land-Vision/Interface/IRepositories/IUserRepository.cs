using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IUserRepository
    {
        Task<bool> CheckIsExistIdentificationCardAsync(string idCard);
        Task<User> GetUserByFreshTokenAsync(string freshToken);
        Task<bool> CheckFreshTokenIsValidAsync(string freshToken);
        Task<bool> CheckIsExistUserByEmailAsync(string email);
        Task<bool> CheckCodeIsExistWithEmail(ValidateCodeDto validateCodeDto);
        Task<bool> CodeIsExistAsync(string code);
        Task<User> GetUserByEmailAsync(string email);
        Task<int> GetUserTotalAsync();
        Task<bool> CreateUserAsync(User user);
        Task<bool> UpdateUserAsync(User user);
        Task<List<User>> GetUsersAsync(Pagination pagination);
        Task<User> GetUserAsync(int userId);

        Task<bool> SaveChangesAsync();
    }
}