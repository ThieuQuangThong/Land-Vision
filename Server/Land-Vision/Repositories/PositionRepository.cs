using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _dbContext;
        public PositionRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddPositionAsync(Position position)
        {
            await _dbContext.Positions.AddAsync(position);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeletePositionAsync(Position position)
        {
            _dbContext.Positions.Remove(position);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeletePositionListAsync(List<Position> positions)
        {
            _dbContext.Positions.RemoveRange(positions);
            return await SaveChangeAsync();
        }

        public async Task<Position> GetPositionByIdAsync(int positionId)
        {
            return await _dbContext.Positions.Where(p => p.Id == positionId).FirstOrDefaultAsync();

        }

        public async Task<List<Position>> GetPositionsAsync()
        {
            return await _dbContext.Positions.OrderBy(p => p.Id).ToListAsync();
        }

        public async Task<List<Position>> GetPositionsByPropertyIdAsync(int propertyId)
        {
            var positions = await _dbContext.Positions.Where(x => x.Property.Id == propertyId).ToListAsync();
            return positions;
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdatePositionAsync(Position position)
        {
            _dbContext.Positions.Update(position);
            return await SaveChangeAsync();
        }
    }
}
