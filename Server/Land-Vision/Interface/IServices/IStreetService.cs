using Land_Vision.DTO.StreetDtos;

namespace Land_Vision.Interface.IServices
{
    public interface IStreetService
    {
        Task<bool> AddStreetListAsync(List<StreetDto> streetDtos);
    }
}