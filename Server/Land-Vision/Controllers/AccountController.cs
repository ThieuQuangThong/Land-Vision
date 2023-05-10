using AutoMapper;
using Land_Vision.Common;
using Land_Vision.Data;
using Land_Vision.Dto.DateTimeDtos;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;
        private readonly IUserService _userSevice;
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;
        private readonly IDetailPurchaseRepository _detailPurchaseRepository;
        private readonly IMapper _mapper;

        public AccountController(
        DataContext dbContext,
        IPostRepository postRepository,
        IUserService userSevice,
        IMapper mapper,
        IUserRepository userRepository,
        IEmailService emailService,
        IAccountService accountService,
        IDetailPurchaseRepository detailPurchaseRepository
        )
        {
            _dbContext = dbContext;
            _userSevice = userSevice;
            _mapper = mapper;
            _accountService = accountService;
            _emailService = emailService;
            _userRepository = userRepository;
            _postRepository = postRepository;
            _detailPurchaseRepository = detailPurchaseRepository;
        }

        /// <summary>
        /// Get all user.
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<UserDto>))]
        public async Task<ActionResult<PaginationRespone<UserDto>>> GetUsers(int skipCount = 0, int maxResultCount = 0)
        {
            if (skipCount < 0 || maxResultCount < 0)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _userSevice.GetUsersAsync(
                new Pagination
                {
                    SkipCount = skipCount,
                    MaxResultCount = maxResultCount
                }));
        }

        /// <summary>
        /// Get user by id.
        /// </summary>
        [HttpGet("getUserById/{userId}")]
        [ProducesResponseType(200, Type = typeof(UserDto))]
        public async Task<ActionResult<UserDto>> GetUserById(int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User is not found");
            }

            var userDto = _mapper.Map<UserDto>(user);
            userDto.NumberOfUserCanPost = await _detailPurchaseRepository.CountPostUserBuy(userId);
            userDto.Posted = await _postRepository.CountPostByUserIdAsync(user.Id);
            return Ok(userDto);
        }

        /// <summary>
        /// Count account by date time
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("countUserByDateTime")]
        [ProducesResponseType(200, Type = typeof(DateTimeDto))]
        public async Task<ActionResult<DateTimeDto>> CountAccountByDateTime()
        {
            var dateTimeDto = await _userRepository.CountUserByDateTimeAsync();
            if (dateTimeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(dateTimeDto);
        }


        /// <summary>
        /// Confirm Email
        /// </summary>
        [HttpGet("confirmEmail/{emailToken}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<string>))]
        public async Task<IActionResult> ConfirmEmail(string emailToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _emailService.ConfirmEmailAsync(emailToken);

            return Ok();
        }

        /// <summary>
        /// Create new account.
        /// </summary>
        [HttpPost("RegisterAccount")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> RegisterAccount(RegisterUserDto registerUserDto)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                if (await _userRepository.CheckIsExistIdentificationCardAsync(registerUserDto.IdentityNumber))
                {
                    ModelState.AddModelError("error", "Id card is already exist!");
                    return StatusCode(400, ModelState);
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!await _accountService.RegisterAccountAsync(registerUserDto))
                {
                    throw new Exception("Some thing went wrong when add user!");
                }
                await transaction.CommitAsync();
                return Ok();
            }
            catch (System.Exception ex)
            {
                await transaction.RollbackAsync();

                throw ex;
            }
        }

        /// <summary>
        /// Get verify code by email to reset password.
        /// </summary>
        [HttpPost("forgotPassword/{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _accountService.ForgotPasswordAsync(user))
            {
                ModelState.AddModelError("", "Something went wrong");
            };

            var validatePassToken = await _accountService.UpdateValidateForgotPasswordTokenAsync(email);
            HttpContext.Response.Cookies.Append(TextField.COOKIE_NAME_OF_VALIDATE_PASS_TOKEN, validatePassToken,
                new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(NumberFiled.VALIDATE_PASSWORD_TOKEN_EXPIRE_TIME),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                });
            return Ok();
        }

        /// <summary>
        /// Checking code is verified or not.
        /// </summary>  
        [HttpPost("validateCode")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        public async Task<ActionResult> ValidateCode(ValidateCodeDto valadateCodeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _accountService.CheckIsExistVerifyCode(valadateCodeDto))
            {
                return NotFound();
            }

            return Ok();
        }

        /// <summary>
        /// Get verify code to reset password.
        /// </summary>
        [HttpPost("resetPassword")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var validatePassTokenObject = Request.Headers[TextField.COOKIE_NAME].ToString();
            string? validatePassToken = _accountService.GetValueFromCookieByName(validatePassTokenObject, TextField.COOKIE_NAME_OF_VALIDATE_PASS_TOKEN);

            if (validatePassToken == null || !await _userRepository.CheckIsExistValidatePasswordToken(resetPasswordDto.Email, validatePassToken))
            {
                ModelState.AddModelError("error", "Nè nè reset password ở máy mô thì dùng ở máy đó nha, đừng đùa với thầy chùa");
                return StatusCode(401, ModelState);
            }

            if (!await _accountService.CheckIsExistVerifyCode(new ValidateCodeDto
            {
                Code = resetPasswordDto.Code,
                Email = resetPasswordDto.Email
            }))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _accountService.ResetPassword(resetPasswordDto))
            {
                ModelState.AddModelError("", "Something went wrong");
            };

            return Ok();
        }

        /// <summary>
        /// Login
        /// </summary>
        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<ActionResult<TokenDto>> Login(LoginDto loginDto)
        {
            try
            {
                if (!await _userRepository.CheckIsExistUserByEmailAsync(loginDto.Email))
                {
                    ModelState.AddModelError("error", "Email is not exist");
                    return StatusCode(404, ModelState);
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var TokenRespone = await _accountService.LoginAsync(loginDto);

                HttpContext.Response.Cookies.Append(TextField.COOKIE_NAME_OF_REFRESH_TOKEN, TokenRespone.FreshToken,
                    new CookieOptions
                    {
                        Expires = DateTime.Now.AddDays(NumberFiled.REFRESH_TOKEN_EXPIRE_TIME),
                        HttpOnly = true,
                        Secure = true,
                        IsEssential = true,
                        SameSite = SameSiteMode.None
                    }
                );
                return Ok(TokenRespone.AccessToken);
            }
            catch (CustomException ex)
            {

                var problemDetails = new ProblemDetails
                {
                    Status = ex.StatusCode,
                    Detail = ex.Message
                };

                return new ObjectResult(problemDetails)
                {
                    StatusCode = problemDetails.Status
                };
            }
        }

        /// <summary>
        /// Refresh
        /// </summary>
        [HttpGet("refresh")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> Refresh()
        {
            var cookieTokenObject = Request.Headers[TextField.COOKIE_NAME].ToString();
            string? freshToken = _accountService.GetValueFromCookieByName(cookieTokenObject, TextField.COOKIE_NAME_OF_REFRESH_TOKEN);

            if (freshToken == null || !await _userRepository.CheckFreshTokenIsValidAsync(freshToken))
            {
                ModelState.AddModelError("error", "Please login again");
                return StatusCode(401, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var TokenRespone = await _accountService.RefreshTokenAsync(freshToken);

            HttpContext.Response.Cookies.Append(TextField.COOKIE_NAME_OF_REFRESH_TOKEN, TokenRespone.FreshToken,
                new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(7),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                }
            );
            return Ok(TokenRespone.AccessToken);
        }

        // GET users count
        /// <summary>
        /// Get users count
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("getUserCount")]
        [ProducesResponseType(200, Type = typeof(int))]
        public async Task<ActionResult<int>> GetUsers()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var UsersCount = await _userRepository.GetUserTotalAsync(); ;
            return Ok(UsersCount);
        }

        // UPDATE user vip
        /// <summary>
        /// Update user vip
        /// </summary>
        [Authorize(Roles = "User")]
        [HttpPut("{userId}&{vipId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<int>> UpdateUserVip(int userId, int vipId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var UserUpdateVip = await _userRepository.UpdateVipUserAsync(userId, vipId);
            return Ok(UserUpdateVip);
        }

        /// <summary>
        /// Delete account
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{accountId}")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<ActionResult<TokenDto>> DeleteAccount(int accountId)
        {
            try
            {

                if (!await _userRepository.CheckIsExistByIdAsync(accountId))
                {
                    ModelState.AddModelError("error", "User is not exist");
                    return StatusCode(404, ModelState);
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!await _userRepository.DeleteUserByIdAsync(accountId))
                {
                    ModelState.AddModelError("error", "Some thing went wrong when delete account");
                    return StatusCode(500, ModelState);
                }
                return Ok();
            }
            catch (CustomException ex)
            {

                var problemDetails = new ProblemDetails
                {
                    Status = ex.StatusCode,
                    Detail = ex.Message
                };

                return new ObjectResult(problemDetails)
                {
                    StatusCode = problemDetails.Status
                };
            }
        }
        
        [Authorize(Roles = "Admin,User")]
        [HttpPatch("updateFlexible/{userId}")]
        public async Task<IActionResult> UpdateUserFlexible(int userId, [FromBody] JsonPatchDocument<UpdateUserDto> patchDoc)
        {
            if(patchDoc == null)
            {
                return BadRequest("patchDoc object is null");
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User is not found!");
            }

            var userToPactch = _mapper.Map<UpdateUserDto>(user);
            patchDoc.ApplyTo(userToPactch);
            _mapper.Map(userToPactch, user);
            await _userRepository.SaveChangesAsync();
            return NoContent();
        }
    }
}