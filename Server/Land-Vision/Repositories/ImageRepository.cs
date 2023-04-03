using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;

namespace Land_Vision.Repositories
{
    public class ImageRepository: IImageRepository
    {
        private readonly DataContext _dbContext; 

        public ImageRepository(DataContext dbContext, IPositionRepository positionRepository)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddImageListAsync(List<Image> images)
        {
            await _dbContext.Images.AddRangeAsync(images);
            return await SaveChanges();
        }


        public async Task<bool> AddImageToPostAsync(int postId, Image image)
        {
            await _dbContext.Images.AddAsync(image);
            return await SaveChanges();
        }

        public async Task<bool> SaveChanges()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}