using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface ICityRepository
    {
        Task<List<City>> GetCitiesAsync();
        Task<City> GetCityAsync(int cityId);
        Task<City> GetCityByNameAsync(string cityName);
        Task<List<District>> GetDistrictOfCityAsync(int cityId);
        Task<bool> AddCityAsync(City city);
        Task<bool> CheckIsExistCity(int cityId);
        Task<bool> UpdateCityAsync(City city);
        Task<bool> DeleteCityAsync(City city);
        Task<bool> SaveChangeAsync();
    }
}
