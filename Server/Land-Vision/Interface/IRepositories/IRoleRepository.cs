using Land_Vision.DTO.RoleDtos;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IRoleRepository
    {
        Task<Role> GetRoleByNameAsync(string name);
        Task<bool> AddRoleAsync(Role role);
        Task<bool> SaveChangesAsync();
    }
}