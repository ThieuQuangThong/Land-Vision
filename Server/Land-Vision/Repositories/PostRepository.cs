using Land_Vision.Common;
using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly DataContext _dbContext;
        public PostRepository(DataContext dbContext, IPropertyRepository propertyRepository)
        {
            _dbContext = dbContext;
            _propertyRepository = propertyRepository;
        }
        public async Task<bool> AddPostAsync(int userId, Post post)
        {
            post.User = await _dbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            await _dbContext.Posts.AddAsync(post);
            return await SaveChangeAsync();
        }

        public async Task<bool> CheckIsPostExistByIdAsync(int postId)
        {
            return await _dbContext.Posts.AnyAsync(x => x.Id == postId);
        }

        public async Task<int> CountPostByUserIdAsync(int userId)
        {
            return await _dbContext.Posts.Where(x => x.User.Id == userId).CountAsync();
        }

        public async Task<bool> DeletePostAsync(Post post)
        {
            _dbContext.Remove(post);
            return await SaveChangeAsync();
        }

        public async Task<List<Post>> GetAllInforPositionOfPostAsync()
        {
            return  await _dbContext.Posts.Include(l => l.Property.Positions.OrderByDescending(x => x.Id)).Select(x => new Post {
                Id = x.Id,
                Property = new Property{
                    AddressNumber = x.Property.AddressNumber,
                    Positions = x.Property.Positions.OrderBy(m => m.Id).ToList()
                },
                User = new User {
                    Name = x.User.Name
                }
            }
            ).ToListAsync();
        }

        public async Task<Post> GetPostAsync(int postId)
        {
            return await _dbContext.Posts.Where(p => p.Id == postId)
            .Include(x => x.User)
            .Include(l => l.Images)
            .Include(k => k.Property.Ward)
            .Include(c => c.Property.Street)
            .Include(j => j.Property.Street.District)
            .Include(i => i.Property.Street.District.City)
            .Include(m => m.Property.Category)
            .Include(n => n.Property.Positions)
            .FirstOrDefaultAsync();
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
            return await _dbContext.Posts.AsNoTracking()
            .OrderByDescending(p => p.CreateDate)
            .Skip(pagination.SkipCount)
            .Take(pagination.MaxResultCount)
            .Include(x => x.User)
            .Include(l => l.Images)
            .Include(k => k.Property.Ward)
            .Include(c => c.Property.Street)
            .Include(j => j.Property.Street.District)
            .Include(i => i.Property.Street.District.City)
            .Include(m => m.Property.Category)
            .Include(n => n.Property.Positions)
            .ToListAsync();
        }
        public async Task<List<Post>> GetPostsByTimeAsync(Pagination pagination, DateTime startDate, DateTime endDate)
        {
            return await _dbContext.Posts.AsNoTracking()
            .Where(a => a.CreateDate >= startDate && a.CreateDate <= endDate.AddDays(1))
            .OrderByDescending(p => p.CreateDate)
            .Skip(pagination.SkipCount)
            .Take(pagination.MaxResultCount)
            .Include(x => x.User)
            .Include(l => l.Images)
            .Include(c => c.Property.Street)
            .Include(j => j.Property.Street.District)
            .Include(i => i.Property.Street.District.City)
            .Include(m => m.Property.Category)
            .Include(n => n.Property.Positions)
            .ToListAsync();
        }

        public async Task<List<Post>> GetPostsByUserIdAsync(int userId)
        {
            return await _dbContext.Posts
            .OrderByDescending(p => p.CreateDate)            
            .Include(x => x.User)
            .Include(l => l.Images)
            .Include(k => k.Property.Ward)
            .Include(c => c.Property.Street)
            .Include(j => j.Property.Street.District)
            .Include(i => i.Property.Street.District.City)
            .Include(m => m.Property.Category)
            .Include(n => n.Property.Positions)
            .Where(x => x.User.Id == userId).ToListAsync();
        }

        public async Task<List<Post>> GetSearchedPosts(Pagination pagination, PostSearchDto postSearchDto)
        {
            var text = postSearchDto.Text;
            if(!String.IsNullOrEmpty(text)){
                text = text.Trim();
            }

            return await _dbContext.Posts
            .Where(x => (postSearchDto.TransactionType == NumberFiled.ALL || x.transactionType == postSearchDto.TransactionType)
            && (postSearchDto.InteriorStatus == NumberFiled.ALL ||x.Property.Interior == postSearchDto.InteriorStatus)
            && (postSearchDto.Price == NumberFiled.ALL ||x.Property.Price <= postSearchDto.Price)
            && (postSearchDto.NumberOfFloor == NumberFiled.ALL ||x.Property.NumberOfFloor == postSearchDto.NumberOfFloor)
            && (postSearchDto.NumberOfBed == NumberFiled.ALL ||x.Property.NumberOfBed == postSearchDto.NumberOfBed)
            && (postSearchDto.NumberOfBath == NumberFiled.ALL ||x.Property.NumberOfBath == postSearchDto.NumberOfBath)
            && (postSearchDto.Direction == NumberFiled.ALL ||x.Property.Direction == postSearchDto.Direction)
            && (String.IsNullOrEmpty(text) || x.Title.Contains(text) || x.Description.Contains(text)))
            .Skip(pagination.SkipCount)
            .Take(pagination.MaxResultCount)
            .Include(x => x.User)
            .Include(l => l.Images)
            .Include(c => c.Property.Street)
            .Include(j => j.Property.Street.District)
            .Include(i => i.Property.Street.District.City)
            .Include(m => m.Property.Category)
            .Include(n => n.Property.Positions)
            .ToListAsync();
        }

        public Task<int> GetTotalCountSearchedPostAsync(PostSearchDto postSearchDto)
        {
            var text = postSearchDto.Text;
            if(!String.IsNullOrEmpty(text)){
                text = text.Trim();
            }

            return _dbContext.Posts.Where(x => (postSearchDto.TransactionType == NumberFiled.ALL || x.transactionType == postSearchDto.TransactionType)
            && ( postSearchDto.InteriorStatus == NumberFiled.ALL ||x.Property.Interior == postSearchDto.InteriorStatus)
            && ( postSearchDto.Price == NumberFiled.ALL ||x.Property.Price <= postSearchDto.Price)
            && ( postSearchDto.NumberOfFloor == NumberFiled.ALL ||x.Property.NumberOfFloor == postSearchDto.NumberOfFloor)
            && ( postSearchDto.NumberOfBed == NumberFiled.ALL ||x.Property.NumberOfBed == postSearchDto.NumberOfBed)
            && ( postSearchDto.NumberOfBath == NumberFiled.ALL ||x.Property.NumberOfBath == postSearchDto.NumberOfBath)
            && ( postSearchDto.Direction == NumberFiled.ALL ||x.Property.Direction == postSearchDto.Direction)
            && (String.IsNullOrEmpty(text) || x.Title.Contains(text) || x.Description.Contains(text)))
            .CountAsync();
        }

        public async Task<bool> HidePostAsync(int postId)
        {
            var post = await GetPostAsync(postId);
            if (post.isHide == false)
            {
                post.isHide = true;
            }
            else
            {
                post.isHide = false;
            }
            return await UpdatePostAsync(post);
        }

        public async Task<bool> IncreaseViewByPostIdAsync(int postId)
        {
            var post = await GetPostAsync(postId);
            post.NumberOfView += 1;
            return await UpdatePostAsync(post);
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdatePostAsync(Post post)
        {
            _dbContext.Posts.Update(post);
            return await SaveChangeAsync();
        }

        public async Task<bool> VerifyPostAsync(int postId)
        {
            var post = await GetPostAsync(postId);
            post.IsVerified = true;
            await UpdatePostAsync(post);
            return await SaveChangeAsync();
        }

    }
}
