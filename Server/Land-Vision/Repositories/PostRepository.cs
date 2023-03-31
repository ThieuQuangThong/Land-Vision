using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _dbContext;
        public PostRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddPostAsync(int userId, Post post)
        {
            post.User = await _dbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            await _dbContext.AddAsync(post);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeletePostAsync(Post post)
        {
            _dbContext.Remove(post);
            return await SaveChangeAsync();

        }

        public async Task<Post> GetPostAsync(int postId)
        {
            return await _dbContext.Posts.Where(p => p.Id == postId).FirstOrDefaultAsync();
        }

        public async Task<Post> GetPostByTitleAsync(string postTitle)
        {
            return await _dbContext.Posts.AsNoTracking().Where(p => p.Title == postTitle).FirstOrDefaultAsync();
        }

        public async Task<int> GetPostCountAsync()
        {
            return await _dbContext.Posts.CountAsync();
        }

        public async Task<List<Post>> GetPostsAsync(Pagination pagination)
        {
            return await _dbContext.Posts.AsNoTracking().OrderBy(p => p.Id).Skip(pagination.SkipCount).Take(pagination.MaxResultCount).ToListAsync();
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdatePostAsync(Post post)
        {
            _dbContext.Update(post);
            return await SaveChangeAsync();
        }
    }
}
