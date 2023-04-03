using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IImageRepository
    {
        Task<bool> AddImageToPostAsync(int postId, Image image);
        Task<bool> AddImageListAsync(List<Image> images);
        Task<bool> SaveChanges();
    }
}