using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface IPostRepository
    {
        Task<List<Post>> GetApprovedPostByUserIdAsync(int userId);
        Task<List<Post>> GetUnapprovedPostsAsync(Pagination pagination);
        Task<int> GetCountUnapprovedPostsAsync();
        Task<List<Post>> GetAllInforPositionOfPostAsync();
        Task<int> CountPostByUserIdAsync(int userId);
        Task<bool> HidePostAsync(int postId);
        Task<bool> VerifyPostAsync(int postId);
        Task<bool> CheckIsPostExistByIdAsync(int postId);
        Task<bool> IncreaseViewByPostIdAsync(int postId);
        Task<List<Post>> GetPostsAsync(Pagination pagination);
        Task<List<Post>> GetPostsByTimeAsync(Pagination pagination, DateTime startDate, DateTime endDate);
        Task<Post> GetPostAsync(int postId);
        Task<Post> GetPostByTitleAsync(string postName);
        Task<int> GetPostCountAsync();
        Task<bool> AddPostAsync(int userId, Post post);
        Task<bool> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(Post post);
        Task<List<Post>> GetSearchedPosts(Pagination pagination, PostSearchDto postSearchDto);
        Task<int> GetTotalCountSearchedPostAsync(PostSearchDto postSearchDto);
        Task<List<Post>> GetPostsByUserIdAsync(int userId);
        Task<bool> SaveChangeAsync();
    }
}
