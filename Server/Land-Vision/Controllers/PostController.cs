using AutoMapper;
using Land_Vision.Dto.PostDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.DTO.PropertyDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Land_Vision.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PostController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;
        private readonly IPostService _postService;
        private readonly IUserRepository _userRepository;
        private readonly IPositionRepository _positionRepository;
        public PostController(IPostService postService, IImageService imageService, IMapper mapper, IPostRepository postRepository, IUserRepository userRepository, IPositionRepository positionRepository)
        {
            _postService = postService;
            _imageService = imageService;
            _mapper = mapper;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _positionRepository = positionRepository;
        }

        // GET Posts
        /// <summary>
        /// Get all posts
        /// </summary>
        [HttpGet("{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetPosts(int skipCount, int maxResultCount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Paginposts = await _postService.GetPostsAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount
            });
            return Ok(Paginposts);
        }

        // GET Post by Id
        /// <summary>
        /// Get post by Id
        /// </summary>
        [HttpGet("{postId}")]
        [ProducesResponseType(200, Type = typeof(PostDto))]
        public async Task<IActionResult> GetPostAsync(int postId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = await _postRepository.GetPostAsync(postId);
            if (post == null)
            {
                ModelState.AddModelError("", "Post not exist");
                return BadRequest(ModelState);
            }
            return Ok(post);
        }

        // GET Post by title
        /// <summary>
        /// Get post by title
        /// </summary>
        [HttpGet("{postTitle}")]
        [ProducesResponseType(200, Type = typeof(PostDto))]
        public async Task<IActionResult> GetPostByTitleAsync(string postTitle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var post = await _postRepository.GetPostByTitleAsync(postTitle);
            return Ok(post);
        }

        // POST Post
        /// <summary>
        /// Add post
        /// </summary>
        [HttpPost("{userId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddPost(int userId, [FromBody] CreatePostPropertyDto postPropertyDto)
        {
            if (postPropertyDto == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _postService.AddPostPropertyAsync(userId, postPropertyDto))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(postPropertyDto);
        }

        // UPDATE Post
        /// <summary>
        /// Update post
        /// </summary>
        [HttpPut]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdatePost([FromQuery] int postId, [FromBody] CreatePostPropertyDto postPropertyDto)
        {
            if (postPropertyDto == null)
                return BadRequest(ModelState);
            var post = await _postRepository.GetPostAsync(postId);
            if (post == null)
            {
                ModelState.AddModelError("", "City not exists");
                return StatusCode(422, ModelState);
            }
            if (ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            postPropertyDto.postDto.Id = postId;
            var postUpdate = _mapper.Map<CreatePostPropertyDto>(postPropertyDto);
            if (!await _postService.UpdatePostPropertyAsync(postUpdate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(postUpdate);
        }

    }
}