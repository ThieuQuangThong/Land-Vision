using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IPositionRepository
    {
        Task<List<Position>> GetPositionsByPropertyIdAsync(int propertyId);
        Task<List<Position>> GetPositionsAsync();
        Task<Position> GetPositionByIdAsync(int positionId);
        Task<bool> AddPositionAsync(Position position);
        Task<bool> UpdatePositionAsync(Position position);
        Task<bool> DeletePositionAsync(Position position);
        Task<bool> DeletePositionListAsync(List<Position> positions);
        Task<bool> SaveChangeAsync();
    }
}
