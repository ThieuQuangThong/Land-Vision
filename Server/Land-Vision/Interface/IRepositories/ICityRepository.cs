using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface ICityRepository
    {
        Task<List<City>> GetCitiesAsync();
        Task<City> GetCityAsync(int cityId);
        Task<City> GetCityByNameAsync(string cityName);
        Task<bool> AddCityAsync(City city);
        Task<bool> UpdateCityAsync(City city);
        Task<bool> DeleteCityAsync(City city);
        Task<bool> SaveChangeAsync();
    }
}
