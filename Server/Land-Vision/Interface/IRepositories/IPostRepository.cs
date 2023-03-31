using Land_Vision.DTO;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IPostRepository
    {
        Task<List<Post>> GetPostsAsync(Pagination pagination);
        Task<Post> GetPostAsync(int postId);
        Task<Post> GetPostByTitleAsync(string postName);
        Task<int> GetPostCountAsync();
        Task<bool> AddPostAsync(int userId, Post post);
        Task<bool> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(Post post);
        Task<bool> SaveChangeAsync();
    }
}
