using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;
using Mysqlx;

namespace Land_Vision.Repositories
{

    public class CategoryRepository : ICategoryRepository
    {
        public readonly DataContext _dbContext;
        public CategoryRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddCategoryAsync(Category category)
        {
            await _dbContext.Categories.AddAsync(category);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeleteCategoryAsync(Category category)
        {
            _dbContext.Categories.Remove(category);
            return await SaveChangeAsync();
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _dbContext.Categories.OrderBy(c => c.Id).ToListAsync();

        }

        public async Task<Category> GetCategoryAsync(int categoryId)
        {
            return await _dbContext.Categories.Where(c => c.Id == categoryId).FirstOrDefaultAsync();
        }

        public async Task<Category> GetCategoryByNameAsync(string categoryName)
        {
            return await _dbContext.Categories.Where(c => c.Name == categoryName).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdateCategoryAsync(Category category)
        {
            _dbContext.Categories.Update(category);
            return await SaveChangeAsync();
        }
    }
}
