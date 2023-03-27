using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IPostRepository
    {
        Task<List<Post>> GetPostsAsync();
        Task<Post> GetPostAsync(int postId);
        Task<Post> GetPostByNameAsync(string name);
        Task<bool> CreatePostAsync(int userId, Property property, Post post);
    }
}
