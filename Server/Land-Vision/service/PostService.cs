using AutoMapper;
using Land_Vision.Dto.PostDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;

namespace Land_Vision.service
{
    public class PostService : IPostService
    {
        private readonly IPositionService _positionService;
        private readonly IPostRepository _postRepository;
        private readonly IPropertyRepository _propertyRepository;
        private readonly IStreetRepository _streetRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IPositionRepository _positionRepository;
        private readonly IImageService _imageService;

        private readonly IMapper _mapper;
        public PostService
        (
         IImageService imageService,
         IPositionService positionService,
         IMapper mapper,
         IPostRepository postRepository,
         IPropertyRepository propertyRepository,
         ICategoryRepository categoryRepository,
         IStreetRepository streetRepository,
         IPositionRepository positionRepository)
        {
            _imageService = imageService;
            _mapper = mapper;
            _postRepository = postRepository;
            _propertyRepository = propertyRepository;
            _postRepository = postRepository;
            _categoryRepository = categoryRepository;
            _streetRepository = streetRepository;
            _positionRepository = positionRepository;
            _positionService = positionService;
        }

        public async Task<bool> AddPostPropertyAsync(int userId, CreatePostPropertyDto createPostPropertyDto)
        {
            var property = _mapper.Map<Property>(createPostPropertyDto.property);
            var street = await _streetRepository.GetStreetByIdAsync(createPostPropertyDto.property.StreetId);
            var category = await _categoryRepository.GetCategoryAsync(createPostPropertyDto.property.CategoryId);

            if (street == null)
            {
                throw new Exception("Street not found");
            }
            if (category == null)
            {
                throw new Exception("Category not found");
            }

            property.Street = street;
            property.Category = category;

            if (!await _propertyRepository.AddPropertyAsync(property))
            {
                throw new Exception("Some thing went wrong when add property");
            }

            var post = _mapper.Map<Post>(createPostPropertyDto.post);
            post.Property = property;
            post.CreateDate = DateTime.Now;
            await _postRepository.AddPostAsync(userId, post);

            return true;
        }

        public async Task<PaginationRespone<PostDto>> GetPostsAsync(Pagination pagination)
        {
            var posts = await _postRepository.GetPostsAsync(pagination);
            var postTotal = await _postRepository.GetPostCountAsync();
            var postDtos = _mapper.Map<List<PostDto>>(posts);

            var paginResult = new PaginationRespone<PostDto>(postDtos)
            {
                pagination = new Pagination
                {
                    SkipCount = pagination.SkipCount,
                    MaxResultCount = pagination.MaxResultCount,
                },
                TotalCount = postTotal,
            };
            return paginResult;
        }

        public async Task<PaginationRespone<PostDto>> GetPostsByTimeAsync(Pagination pagination, DateTime startDate, DateTime endDate)
        {
            var posts = await _postRepository.GetPostsByTimeAsync(pagination, startDate, endDate);
            var postTotal = await _postRepository.GetPostCountAsync();
            var postDtos = _mapper.Map<List<PostDto>>(posts);

            var paginResult = new PaginationRespone<PostDto>(postDtos)
            {
                pagination = new Pagination
                {
                    SkipCount = pagination.SkipCount,
                    MaxResultCount = pagination.MaxResultCount,
                },
                TotalCount = postTotal,
            };
            return paginResult;
        }

        public static void UpdateEntityFromDto<TEntity, TDto>(TEntity entity, TDto dto)
        {
            // Lấy ra tất cả các thuộc tính của entity
            var entityProperties = typeof(TEntity).GetProperties();

            // Duyệt qua tất cả các thuộc tính của dto
            foreach (var dtoProperty in typeof(TDto).GetProperties())
            {
                // Tìm kiếm thuộc tính tương ứng trong entity
                var entityProperty = entityProperties.FirstOrDefault(p => p.Name == dtoProperty.Name);

                // Nếu tìm thấy thì cập nhật giá trị của thuộc tính
                if (entityProperty != null)
                {
                    var value = dtoProperty.GetValue(dto);
                    entityProperty.SetValue(entity, value);
                }
            }
        }

        public async Task<bool> UpdatePostPropertyAsync(int postId, CreatePostPropertyDto createPostPropertyDto)
        {
            var propertyId = await _propertyRepository.GetPropertyIdByPostIdAsync(postId);
            var property = await _propertyRepository.GetPropertyAsync(propertyId);

            var street = await _streetRepository.GetStreetByIdAsync(createPostPropertyDto.property.StreetId);
            var category = await _categoryRepository.GetCategoryAsync(createPostPropertyDto.property.CategoryId);

            if (street == null)
            {
                throw new Exception("Street is not found");
            }

            if (category == null)
            {
                throw new Exception("Category is not found");
            }

            if (property == null)
            {
                throw new Exception("Property is not found");
            }

            property.Street = street;
            property.Category = category;

            UpdateEntityFromDto(property, createPostPropertyDto.property);

            if (!await _propertyRepository.UpdatePropertyAsync(property))
            {
                throw new Exception("Some thing went wrong when update property");
            }

            var positions = _mapper.Map<List<Position>>(createPostPropertyDto.property.Positions);
            await _positionService.DeleteAndUpdatePositionAsync(propertyId, positions);

            var post = await _postRepository.GetPostAsync(postId);
            if (post == null)
            {
                throw new Exception("Post is not found");
            }

            UpdateEntityFromDto(post, createPostPropertyDto.post);

            if (!await _postRepository.UpdatePostAsync(post))
            {
                throw new Exception("Some thing went wrong when update post");
            }

            return true;
        }
    }
}
