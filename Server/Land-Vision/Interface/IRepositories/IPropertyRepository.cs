using Land_Vision.DTO;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IPropertyRepository
    {
        Task<List<Property>> GetPropertiesAsync();

        Task<Property> GetPropertyAsync(int propertyId);
        Task<bool> AddPropertyAsync(Property property);
        Task<bool> UpdatePropertyAsync(Property property);
        Task<bool> DeletePropertyAsync(Property property);
        Task<bool> SaveChangeAsync();
    }
}
