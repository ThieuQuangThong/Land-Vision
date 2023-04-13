using Land_Vision.DTO.Ward;

namespace Land_Vision.Interface.IServices
{
    public interface IWardService
    {
        Task<bool> AddWardList(List<WardDto> wardDtos);
    }
}