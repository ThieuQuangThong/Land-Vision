using AutoMapper;
using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;

namespace Land_Vision.Repositories
{
    public class PostRepository : IPostRepository

    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        public PostRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Task<bool> CreatePostAsync(int userId, Property property, Post post)
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetPostAsync(int postId)
        {
            throw new NotImplementedException();
        }

        public async Task<Post> GetPostByNameAsync(string name)
        {
            
        }

        public Task<List<Post>> GetPostsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
