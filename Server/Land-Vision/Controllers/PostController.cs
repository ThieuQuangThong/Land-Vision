using AutoMapper;
using Land_Vision.Data;
using Land_Vision.Dto.PostDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PostController : ControllerBase
    {
        private readonly DataContext _dbContext;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;
        private readonly IPostService _postService;
        private readonly IUserRepository _userRepository;
        private readonly IPositionRepository _positionRepository;
        public PostController(DataContext dbContext, IPostService postService, IImageService imageService, IMapper mapper, IPostRepository postRepository, IUserRepository userRepository, IPositionRepository positionRepository)
        {
            _postService = postService;
            _imageService = imageService;
            _mapper = mapper;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _positionRepository = positionRepository;
            _dbContext = dbContext;
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
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
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

                await transaction.CommitAsync();
                return Ok(postPropertyDto);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, ex.Message);
            }
            
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
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

                if (postPropertyDto == null){
                    return BadRequest(ModelState);
                }

                var post = await _postRepository.GetPostAsync(postId);
                if (post == null)
                {
                    ModelState.AddModelError("", "City not exists");
                    return StatusCode(404, ModelState);
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!await _postService.UpdatePostPropertyAsync(postId, postPropertyDto))
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }
                await transaction.CommitAsync();
                return Ok(postPropertyDto);
        }

        // DELETE street
        /// <summary>
        /// Delete street
        /// </summary>
        [HttpDelete("{postId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletePostById(int postId)
        {
            var post = await _postRepository.GetPostAsync(postId);
            if (post == null)
            {
                ModelState.AddModelError("", "Post is not exists");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _postRepository.DeletePostAsync(post))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok();
        }

        // INCREASE View
        /// <summary>
        ///Increase View
        /// </summary>
        [HttpPost("increaseView/{postId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> IncreaseView(int postId)
        {
            if (!await _postRepository.CheckIsPostExistByIdAsync(postId))
            {
                ModelState.AddModelError("", "Post is not exists");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _postRepository.IncreaseViewByPostIdAsync(postId))
            {
                ModelState.AddModelError("", "Something went wrong while increasing");
                return StatusCode(500, ModelState);
            }
            return Ok();
        }

        /// Verify post
        /// <summary>
        /// Verify post
        /// </summary>
        [HttpPost("verifyPost/{postId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> VerifyPost(int postId)
        {
            if (!await _postRepository.CheckIsPostExistByIdAsync(postId))
            {
                ModelState.AddModelError("", "Post is not exists");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _postRepository.VerifyPostAsync(postId))
            {
                ModelState.AddModelError("", "Something went wrong while Verifying");
                return StatusCode(500, ModelState);
            }
            return Ok();
        }

    }
}