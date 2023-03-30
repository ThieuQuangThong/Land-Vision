using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IStreetRepository
    {
        Task<List<Street>> GetStreetsAsync();
        Task<Street> GetStreetAsync(int streetId);
        Task<Street> GetStreetByNameAsync(string streetName);
        Task<bool> AddStreetAsync(int districtId, Street street);
        Task<bool> UpdateStreetAsync(Street street);
        Task<bool> DeleteStreetAsync(Street street);
        Task<bool> SaveChangeAsync();
    }
}
