using Land_Vision.Models;

namespace Land_Vision.Interface.IRepositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<Category> GetCategoryAsync(int categoryId);
        Task<Category> GetCategoryByNameAsync(string categoryName);
        Task<bool> AddCategoryAsync(Category category);
        Task<bool> UpdateCategoryAsync(Category category);
        Task<bool> DeleteCategoryAsync(Category category);
        Task<bool> SaveChangeAsync();
    }
}
