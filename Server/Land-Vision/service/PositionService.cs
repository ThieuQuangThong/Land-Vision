using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;

namespace Land_Vision.service
{
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IPropertyRepository _propertyRepository;
        public PositionService(IPropertyRepository propertyRepository, IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
            _propertyRepository = propertyRepository;
        }

        public async Task<bool> AddPositionListAsync(int propertyId, List<Position> positions)
        {
            var property = await _propertyRepository.GetPropertyAsync(propertyId);

            foreach (var position in positions)
            {
                position.Property = property;
                if(!await _positionRepository.AddPositionAsync(position)){
                   return false;
                }
            }

            return true;
        }

        public async Task<bool> DeleteAndUpdatePositionAsync(int propertyId, List<Position> positions)
        {
            var currentPositions = await _positionRepository.GetPositionsByPropertyIdAsync(propertyId);
            if(currentPositions != null){
                await _positionRepository.DeletePositionListAsync(currentPositions);

            }

            if(!await AddPositionListAsync(propertyId, positions)){
                throw new Exception("Some thing went wrong when add positions"); 
            }

            return true;

        }

    }
}