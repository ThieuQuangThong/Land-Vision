using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IVipRepository
    {
        Task<Vip> GetVipByNameAsync(string name);
        Task<List<Vip>> GetVipsAsync();
        Task<Vip> GetVipByLevelAsync(int level);
        Task<bool> DeleteVipByIdAsync(int vipId);
        Task<bool> CheckVipIsExistByIdAsync(int vipId);
        Task<Vip> GetVipByIdAsync(int vipId);
        Task<bool> UpdateVipAsync(Vip vip);
        Task<Vip> AddVipAsync(Vip vip);
        
        Task<bool> SaveChangesAsync();   
    }
}