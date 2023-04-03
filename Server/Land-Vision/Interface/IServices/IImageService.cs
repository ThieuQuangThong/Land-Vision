using Land_Vision.DTO.ImageDtos;

namespace Land_Vision.Interface.IServices
{
    public interface IImageService
    {
        Task<string> ConvertFileToUrl(IFormFile file);
        Task<byte[]> ConvertFormFileToByteArray(IFormFile file);
        Task<bool> AddImageListToPostAsync(int postId,List<ImageDto> imageDtos);
     }
}