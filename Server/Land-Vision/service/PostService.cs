using AutoMapper;
using Land_Vision.Dto.PostDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.PositionDtos;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Land_Vision.service
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IPropertyRepository _propertyRepository;
        private readonly IStreetRepository _streetRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IPositionRepository _positionRepository;

        private readonly IMapper _mapper;
        public PostService(IMapper mapper, IPostRepository postRepository, IPropertyRepository propertyRepository, ICategoryRepository categoryRepository, IStreetRepository streetRepository, IPositionRepository positionRepository)
        {
            _mapper = mapper;
            _postRepository = postRepository;
            _propertyRepository = propertyRepository;
            _postRepository = postRepository;
            _categoryRepository = categoryRepository;
            _streetRepository = streetRepository;
            _positionRepository = positionRepository;
        }

        public async Task<bool> AddPostPropertyAsync(int userId, CreatePostPropertyDto createPostPropertyDto)
        {
            var property = _mapper.Map<Property>(createPostPropertyDto.propertyDto);
            var street = await _streetRepository.GetStreetByIdAsync(createPostPropertyDto.propertyDto.StreetId);
            var category = await _categoryRepository.GetCategoryAsync(createPostPropertyDto.propertyDto.CategoryId);

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
            if (
             !await _propertyRepository.AddPropertyAsync(property))
            {
                throw new Exception("Some thing went wrong when add property");
            }

            foreach (PositionDto p in createPostPropertyDto.propertyDto.PositionDtos)
            {
                var pMap = _mapper.Map<Position>(p);
                pMap.Property = property;
                await _positionRepository.AddPositionAsync(pMap);
            }

            var post = _mapper.Map<Post>(createPostPropertyDto.postDto);
            post.Property = property;
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

        public async Task<bool> UpdatePostPropertyAsync(CreatePostPropertyDto createPostPropertyDto)
        {
            var property = _mapper.Map<Property>(createPostPropertyDto.propertyDto);
            property.Street = await _streetRepository.GetStreetByIdAsync(createPostPropertyDto.propertyDto.StreetId);
            property.Category = await _categoryRepository.GetCategoryAsync(createPostPropertyDto.propertyDto.CategoryId);


            if (!await _propertyRepository.UpdatePropertyAsync(property))
            {
                throw new Exception("Some thing went wrong when add property");
            }
            var post = _mapper.Map<Post>(createPostPropertyDto.postDto);
            post.Property = property;
            await _postRepository.UpdatePostAsync(post);
            return true;
        }
    }
}
