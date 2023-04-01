using Land_Vision.DTO;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IPropertyRepository
    {
        Task<bool> DeletePropertyByIdAsync(int propertyId);

        Task<int> GetPropertyIdByPostIdAsync(int postId);
        Task<List<Property>> GetPropertiesAsync();
        Task<bool> IsExistProperty(int propertyId);  
        Task<Property> GetPropertyAsync(int propertyId);
        Task<bool> AddPropertyAsync(Property property);
        Task<bool> UpdatePropertyAsync(Property property);
        Task<bool> DeletePropertyAsync(Property property);
        Task<bool> SaveChangeAsync();
    }
}
