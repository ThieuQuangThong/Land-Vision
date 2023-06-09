using AutoMapper;
using Land_Vision.Common;
using Land_Vision.Data;
using Land_Vision.Dto.DateTimeDtos;
using Land_Vision.Dto.PostDtos;
using Land_Vision.Dto.TypeDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Authorization;
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

        // GET approved Posts
        /// <summary>
        /// Get approved Posts
        /// </summary>
        [HttpGet("getAllApprovedPost/{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetPosts(int skipCount, int maxResultCount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagingPosts = await _postService.GetApprovedPostsAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount
            });
            return Ok(pagingPosts);
        }

        // GET rejected Posts
        /// <summary>
        /// Get rejected Posts
        /// </summary>
        [HttpGet("getAllRejectedPost/{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetRejectedPosts(int skipCount, int maxResultCount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagingPosts = await _postService.GetRejectedPostsAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount
            });
            return Ok(pagingPosts);
        }

        // GET all posts
        /// <summary>
        /// Get all posts
        /// </summary>
        [HttpGet("{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetAllPosts(int skipCount, int maxResultCount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagingPosts = await _postService.GetALLPostsAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount
            });
            return Ok(pagingPosts);
        }

        // GET Posts by userId
        /// <summary>
        /// Get posts by userId
        /// </summary>
        [Authorize(Roles = "Admin,User")]
        [HttpGet("getPost/{userId}/User")]
        [ProducesResponseType(200, Type = typeof(List<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetPostsByUserId(int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _userRepository.CheckIsExistByIdAsync(userId))
            {
                return NotFound("User is not exist");
            }

            var PostDtos = _mapper.Map<List<PostDto>>(await _postRepository.GetPostsByUserIdAsync(userId));
            return Ok(PostDtos);
        }

        // GET posts count
        /// <summary>
        /// Get posts count
        /// </summary>
        [HttpGet("getPostCount")]
        [ProducesResponseType(200, Type = typeof(int))]
        public async Task<ActionResult<int>> GetPosts()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var PostsCount = await _postRepository.GetApprovedPostCountAsync();
            return Ok(PostsCount);
        }

        // GET all posts by search
        /// <summary>
        /// Get all posts by search
        /// </summary>
        [HttpPost("getSearchedPost/{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetPostsBySearchCondition(int skipCount, int maxResultCount, [FromBody] PostSearchDto postSearchDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Paginposts = await _postService.GetSearchedPostsAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount
            },
            postSearchDto);
            return Ok(Paginposts);
        }

        /// <summary>
        /// Count post by date time
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("countPostByDateTime")]
        [ProducesResponseType(200, Type = typeof(DateTimeDto))]
        public async Task<ActionResult<DateTimeDto>> CountPostByDateTime()
        {
            var dateTimeDto = await _postRepository.CountPostByDateTimeAsync();
            if (dateTimeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(dateTimeDto);
        }

        /// <summary>
        /// Count post by type
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("countPostByType")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<PostTypeDto>))]
        public async Task<ActionResult<TypeDto>> CountPostByType()
        {
            var typeDto = await _postRepository.CountPostByType();
            if (typeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(typeDto);
        }

        // GET Posts By Time
        /// <summary>
        /// Get all posts by time
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("PostByTime/{skipCount}&{maxResultCount}&{startDate}&{endDate}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<PostDto>))]
        public async Task<ActionResult<PaginationRespone<PostDto>>> GetPostsByTime(int skipCount, int maxResultCount, string startDate, string endDate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DateTime starDateParsed = DateTime.Parse(startDate.Replace('-', ' '));
            DateTime endDateParsed = DateTime.Parse(endDate.Replace('-', ' '));

            var Paginposts = await _postService.GetPostsByTimeAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount,
            }, starDateParsed, endDateParsed);
            return Ok(Paginposts);
        }

        // GET Post by Id
        /// <summary>
        /// Get post by Id
        /// </summary>
        [HttpGet("getPostDetail/{postId}&{sawNotification}")]
        [ProducesResponseType(200, Type = typeof(PostDto))]
        public async Task<IActionResult> GetPostAsync(int postId, bool sawNotification = false)
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

            if(sawNotification){
                post.IsChangingStatus = false;
                await _postRepository.UpdatePostAsync(post);
            }
            return Ok(_mapper.Map<PostDto>(post));
        }

        // GET unapproved post 
        /// <summary>
        /// GET unapproved post
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("getUnapprovedPost/{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PostDto))]
        public async Task<IActionResult> GetUnapprovedPostAsync(int skipCount, int maxResultCount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Paginposts = await _postService.GetUnapprovedPostsAsync(new Pagination
            {
                SkipCount = skipCount,
                MaxResultCount = maxResultCount
            });
            return Ok(Paginposts);
        }

        // get post is unapproved by id
        /// <summary>
        /// get post is unapproved by id
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("getPostIsUnApproved/{postId}")]
        [ProducesResponseType(200, Type = typeof(PostDto))]
        public async Task<IActionResult> GetPostIsUnApproved(int postId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = await _postRepository.GetPostAsync(postId);
            if (post == null)
            {
                return NotFound();
            }

            if(post.ApproveStatus != NumberFiled.PENDING){
                throw new Exception(); 
            }

            return Ok(_mapper.Map<PostDto>(post));
        }

        //POST reject post by id
        /// <summary>
        /// reject post by id
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost("rejectPost/{postId}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> RejectPostById(int postId,[FromBody] RejectReasonDto rejectReasonDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = await _postRepository.GetPostAsync(postId);
            if(post == null){
                return NotFound(); 
            }

            post.ApproveStatus = NumberFiled.REJECTED;
            post.RejectReason = rejectReasonDto.RejectReason;
            post.IsChangingStatus = true;

            await _postRepository.UpdatePostAsync(post);

            return Ok();
        }

        // Get get approved post by user id
        /// <summary>
        /// get approved post by user id
        /// </summary>
        [HttpGet("getPostIsApproved/{userId}")]
        [ProducesResponseType(200, Type = typeof(List<PostDto>))]
        public async Task<IActionResult> GetPostIsApproved(int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _userRepository.CheckIsExistByIdAsync(userId))
            {
                return NotFound("User is Not found");
            }

            var posts = await _postRepository.GetApprovedPostByUserIdAsync(userId);

            return Ok(_mapper.Map<List<PostDto>>(posts));
        }

        // GET Post by title
        /// <summary>
        /// Get post by title
        /// </summary>
        [HttpGet("getByTitle/{postTitle}")]
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

        // GET all infor position's Post
        /// <summary>
        /// GET all infor position's Post
        /// </summary>
        [HttpGet("getAllPositionPost/{postId}")]
        [ProducesResponseType(200, Type = typeof(List<PostsPositionDto>))]
        public async Task<ActionResult<List<PostsPositionDto>>> GetAllPositionPost(int postId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var postsPositionDto = _mapper.Map<List<PostsPositionDto>>(await _postRepository.GetAllInforPositionOfPostAsync());

            if (!await _postRepository.CheckIsPostExistByIdAsync(postId))
            {
                return Ok(postsPositionDto);
            }

            var swaggItem = postsPositionDto.Where(x => x.Id == postId).FirstOrDefault();
            postsPositionDto.Remove(swaggItem);

            postsPositionDto.Insert(0, swaggItem);

            return Ok(postsPositionDto);
        }

        // POST Post
        /// <summary>
        /// Add post
        /// </summary>
        [Authorize(Roles = "User, Admin")]
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

                if (!await _userRepository.CheckIsExistByIdAsync(userId))
                {
                    return NotFound("User is not found");
                }

                if (!await _postService.CheckIsUserCanPost(userId))
                {
                    ModelState.AddModelError("", "you post as many times as you have");
                    return StatusCode(402, ModelState);
                }

                if (!await _postService.AddPostPropertyAsync(userId, postPropertyDto))
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }

                await transaction.CommitAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, ex.Message);
            }
        }

        // POST Appove Post
        /// <summary>
        /// Appove Post
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost("appovePost/{postId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ApprovePost(int postId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var post = await _postRepository.GetPostAsync(postId);
                if (post == null)
                {
                    return NotFound("Post is not found");
                }

                post.ApproveStatus = NumberFiled.APPROVED;
                post.IsChangingStatus = true;

                await _postRepository.UpdatePostAsync(post);

                await transaction.CommitAsync();
                return Ok();
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
        [Authorize(Roles = "User, Admin")]
        [HttpPut("{postId}&{userId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdatePost(int userId, int postId, [FromBody] CreatePostPropertyDto postPropertyDto)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            if (postPropertyDto == null)
            {
                return BadRequest(ModelState);
            }

            var post = await _postRepository.GetPostAsync(postId);

            if (post == null)
            {
                ModelState.AddModelError("", "City not exists");
                return StatusCode(404, ModelState);
            }

            if (post.User.Id != userId)
            {
                ModelState.AddModelError("", "Something went wrong");
                return StatusCode(500, ModelState);
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

        // DELETE post
        /// <summary>
        /// Delete post
        /// </summary>
        [Authorize(Roles = "User,Admin")]
        [HttpDelete("{postId}&{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletePostById(int postId, int userId)
        {
            var post = await _postRepository.GetPostAsync(postId);
            if (post == null)
            {
                ModelState.AddModelError("", "Post is not exists");
                return StatusCode(404, ModelState);
            }

            if (post.User.Id != userId)
            {
                ModelState.AddModelError("", "Something went wrong");
                return StatusCode(500, ModelState);
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

        // Hide/Unhide Post
        /// <summary>
        /// Hide/Unhide post
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPut("hideUnhide/{postId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> HideUnhidePost(int postId)
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

            if (!await _postRepository.HidePostAsync(postId))
            {
                ModelState.AddModelError("", "Something went wrong while Hiding");
                return StatusCode(500, ModelState);
            }
            return Ok();
        }

        /// <summary>
        /// check is available to post 
        /// </summary>
        [Authorize(Roles = "User,Admin")]
        [HttpGet("availablePost/{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        public async Task<ActionResult<bool>> CheckIsAvailablePost(int userId)
        {
            if (!await _userRepository.CheckIsExistByIdAsync(userId))
            {
                ModelState.AddModelError("", "User is not exists");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _postService.CheckIsUserCanPost(userId));
        }

    }
}