using AutoMapper;
using Land_Vision.DTO.CategoryDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        // GET Categories
        ///<summary>
        /// Get all categories
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CategoryDto>))]
        public async Task<IActionResult> GetCategories()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categories = await _categoryRepository.GetCategoriesAsync();
            return Ok(categories);
        }

        // GET Category by id
        /// <summary>
        /// Get category by id.
        /// </summary>
        [HttpGet("{categoryId}")]
        [ProducesResponseType(200, Type = typeof(CategoryDto))]
        public async Task<IActionResult> GetCategory(int categoryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = await _categoryRepository.GetCategoryAsync(categoryId);
            if (category == null)
            {
                ModelState.AddModelError("", "Category not exist");
                return StatusCode(422, ModelState);
            }
            return Ok(category);
        }

        // POST Category
        /// <summary>
        /// Add category
        /// </summary>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddCategory([FromBody] CategoryDto categoryDto)
        {
            if (categoryDto == null)
                return BadRequest(ModelState);

            var category = await _categoryRepository.GetCategoryByNameAsync(categoryDto.Name);
            if (category != null)
            {

                ModelState.AddModelError("", "Category already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoryCreate = _mapper.Map<Category>(categoryDto);
            if (!await _categoryRepository.AddCategoryAsync(categoryCreate))
            {
                ModelState.AddModelError("", "Something went wrong went saving");
                return StatusCode(500, ModelState);
            }
            return Ok(categoryCreate);
        }

        // UPDATE Category
        /// <summary>
        /// Update category by id.
        /// </summary>
        [HttpPut("{categoryId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateCategory(int categoryId, [FromBody] CategoryDto categoryDto)
        {
            if (categoryDto == null)
                return BadRequest(ModelState);

            var category = await _categoryRepository.GetCategoryAsync(categoryId);
            if (category == null)
            {
                ModelState.AddModelError("", "Category not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            category.Name = categoryDto.Name;
            if (!await _categoryRepository.UpdateCategoryAsync(category))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(category);
        }

        // Delete Category
        /// <summary>
        /// Delete category by id.
        /// </summary>
        [HttpDelete("{categoryId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            if (categoryId == null)
                return BadRequest(ModelState);

            var category = await _categoryRepository.GetCategoryAsync(categoryId);
            if (category == null)
            {
                ModelState.AddModelError("", "Category not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var categoryDelete = _mapper.Map<Category>(category);
            try
            {
                await _categoryRepository.DeleteCategoryAsync(categoryDelete);
                return Ok(categoryDelete);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
        }
    }
}
