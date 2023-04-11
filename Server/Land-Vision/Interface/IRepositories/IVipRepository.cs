using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IVipRepository
    {
        Task<List<Vip>> GetVipsAsync();
        Task<bool> DeleteVipByIdAsync(int vipId);
        Task<bool> CheckVipIsExistByIdAsync(int vipId);
        Task<Vip> GetVipByIdAsync(int vipId);
        Task<bool> UpdateVipAsync(Vip vip);
        Task<Vip> AddVipAsync(Vip vip);
        
        Task<bool> SaveChangesAsync();   
    }
}