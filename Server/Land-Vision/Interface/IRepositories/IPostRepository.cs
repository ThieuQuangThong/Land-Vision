using Land_Vision.Dto.DateTimeDtos;
using Land_Vision.Dto.TypeDtos;
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
        Task<DateTimeDto> CountPostByDateTimeAsync();
        Task<bool> HidePostAsync(int postId);
        Task<bool> VerifyPostAsync(int postId);
        Task<bool> CheckIsPostExistByIdAsync(int postId);
        Task<bool> IncreaseViewByPostIdAsync(int postId);
        Task<List<Post>> GetAllPostsAsync(Pagination pagination);
        Task<List<Post>> GetAllRejectedPostsAsync(Pagination pagination);
        Task<int> GetAllRejectedCountPostsAsync();
        Task<int> GetAllPostCountAsync();
        Task<List<Post>> GetApprovedPostsAsync(Pagination pagination);
        Task<List<Post>> GetPostsByTimeAsync(Pagination pagination, DateTime startDate, DateTime endDate);
        Task<Post> GetPostAsync(int postId);
        Task<List<PostTypeDto>> CountPostByType();
        Task<Post> GetPostByTitleAsync(string postName);
        Task<int> GetApprovedPostCountAsync();
        Task<bool> AddPostAsync(int userId, Post post);
        Task<bool> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(Post post);
        Task<List<Post>> GetSearchedPosts(Pagination pagination, PostSearchDto postSearchDto);
        Task<int> GetTotalCountSearchedPostAsync(PostSearchDto postSearchDto);
        Task<List<Post>> GetPostsByUserIdAsync(int userId);
        Task<bool> SaveChangeAsync();
    }
}
