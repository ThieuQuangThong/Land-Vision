using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<bool> CreateUserAsync(User user);
        Task<bool> UpdateUserAsync(User user); 
        Task<bool> SaveChangesAsync(); 
    }
}