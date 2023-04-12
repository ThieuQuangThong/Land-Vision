using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IWardRepository
    {
        Task<List<Ward>> GetWardsAsync();
        Task<List<Ward>> GetWardsByDistrictIdAsync(int districtId);
        Task<bool> DeleteWardByIdAsync(int wardId);
        Task<bool> CheckWardIsExistByIdAsync(int wardId);
        Task<Ward> GetWardByIdAsync(int wardId);
        Task<bool> UpdateWardAsync(Ward ward);
        Task<bool> AddWardAsync(Ward ward);
        
        Task<bool> SaveChangesAsync();   
    }
}