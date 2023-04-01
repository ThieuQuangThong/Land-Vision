using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Land_Vision.Models;

namespace Land_Vision.Interface.IServices
{
    public interface IPositionService
    {
        Task<bool> DeleteAndUpdatePositionAsync(int propertyId, List<Position> positions);
        Task<bool> AddPositionListAsync(int propertyId, List<Position> positions);
    }
}