using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IDistrictRepository
    {
        Task<List<District>> GetDistrictsAsync();
        Task<District> GetDistrictAsync(int districtId);
        Task<District> GetDistrictByNameAsync(string districtName);
        Task<bool> AddDistrictAsync(int cityId, District district);
        Task<bool> UpdateDistrictAsync(District district);
        Task<bool> DeleteDistrictAsync(District district);
        Task<bool> SaveChangeAsync();
    }
}
