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
        private readonly IWardRepository _wardRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPositionRepository _positionRepository;
        private readonly IImageService _imageService;
        private readonly IDetailPurchaseRepository _detailPurchaseRepository;
        private readonly IMapper _mapper;

        public PostService
        (
         IUserRepository userRepository,
         IWardRepository wardRepository,
         IImageService imageService,
         IPositionService positionService,
         IMapper mapper,
         IPostRepository postRepository,
         IPropertyRepository propertyRepository,
         ICategoryRepository categoryRepository,
         IStreetRepository streetRepository,
         IPositionRepository positionRepository,
         IDetailPurchaseRepository detailPurchaseRepository)
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
            _wardRepository = wardRepository;
            _userRepository = userRepository;
            _detailPurchaseRepository = detailPurchaseRepository;
        }

        public async Task<bool> AddPostPropertyAsync(int userId, CreatePostPropertyDto createPostPropertyDto)
        {
            var property = _mapper.Map<Property>(createPostPropertyDto.property);
            var street = await _streetRepository.GetStreetByIdAsync(createPostPropertyDto.property.StreetId);
            var category = await _categoryRepository.GetCategoryAsync(createPostPropertyDto.property.CategoryId);
            var ward = await _wardRepository.GetWardByIdAsync(createPostPropertyDto.property.WardId);

            if (street == null)
            {
                throw new Exception("Street not found");
            }

            if (category == null)
            {
                throw new Exception("Category not found");
            }

            if (ward == null)
            {
                throw new Exception("Category not found");
            }

            property.Street = street;
            property.Category = category;
            property.Ward = ward;

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

        public async Task<PaginationRespone<PostDto>> GetApprovedPostsAsync(Pagination pagination)
        {
            var posts = await _postRepository.GetApprovedPostsAsync(pagination);

            var postTotal = await _postRepository.GetApprovedPostCountAsync();
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
            var postTotal = await _postRepository.GetApprovedPostCountAsync();
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
                    if (entityProperty.PropertyType.IsGenericType && entityProperty.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                    {
                        continue;
                    }
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
            var ward = await _wardRepository.GetWardByIdAsync(createPostPropertyDto.property.WardId);

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

            if (ward == null){
                throw new Exception("Ward is not found");  
            }

            property.Street = street;
            property.Category = category;
            property.Ward = ward;

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
            post.Images = _mapper.Map<List<Image>>(createPostPropertyDto.post.images);
            post.ApproveStatus = 1;
            UpdateEntityFromDto(post, createPostPropertyDto.post);

            if (!await _postRepository.UpdatePostAsync(post))
            {
                throw new Exception("Some thing went wrong when update post");
            }

            return true;
        }

        public async Task<PaginationRespone<PostDto>> GetSearchedPostsAsync(Pagination pagination, PostSearchDto postSearchDto)
        {
            var posts = await _postRepository.GetSearchedPosts(pagination, postSearchDto);

            var postTotal = await _postRepository.GetTotalCountSearchedPostAsync(postSearchDto);
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

        public async Task<bool> CheckIsUserCanPost(int userId)
        {
            int postOfUserPost = await _detailPurchaseRepository.CountPostUserBuy(userId);
            int posted = await _postRepository.CountPostByUserIdAsync(userId);
            return postOfUserPost > posted ;
        }

        public async Task<PaginationRespone<PostDto>> GetUnapprovedPostsAsync(Pagination pagination)
        {
            var posts = await _postRepository.GetUnapprovedPostsAsync(pagination);

            var postTotal = await _postRepository.GetCountUnapprovedPostsAsync();
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

        public async Task<PaginationRespone<PostDto>> GetALLPostsAsync(Pagination pagination)
        {
            var posts = await _postRepository.GetAllPostsAsync(pagination);

            var postTotal = await _postRepository.GetAllPostCountAsync();
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

        public async Task<PaginationRespone<PostDto>> GetRejectedPostsAsync(Pagination pagination)
        {
            var posts = await _postRepository.GetAllRejectedPostsAsync(pagination);

            var postTotal = await _postRepository.GetAllRejectedCountPostsAsync();
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
    }
}
 