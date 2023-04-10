using System.Net;
using AutoMapper;
using Land_Vision.Common;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;
        private readonly IUserService _userSevice;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper; 
        public AccountController(IUserService userSevice, IMapper mapper, IUserRepository userRepository, IEmailService emailService,IAccountService accountService)
        {
            _userSevice = userSevice;
            _mapper = mapper;
            _accountService = accountService;
            _emailService = emailService;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Get all user.
        /// </summary>
        [HttpGet("{skipCount}&{maxResultCount}")]
        [ProducesResponseType(200, Type = typeof(PaginationRespone<UserDto>))]
        public async Task<ActionResult<PaginationRespone<UserDto>>> GetUsers(int skipCount = 0, int maxResultCount =0)
        {
            if(skipCount < 0 || maxResultCount < 0){
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            return Ok(await _userSevice.GetUsersAsync(
                new Pagination{
                    SkipCount = skipCount,
                    MaxResultCount = maxResultCount
                    }));
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
            
            if(await _userRepository.CheckIsExistIdentificationCardAsync(registerUserDto.IdentityNumber)){
                ModelState.AddModelError("error", "Id card is already exist!");
                return StatusCode(400, ModelState);
            }
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!await _accountService.RegisterAccountAsync(registerUserDto)){
                throw new Exception("Some thing went wrong when add user!");
            }
            return Ok();
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
            
            if(user == null){
                return NotFound();
            }

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if(!await _accountService.ForgotPasswordAsync(user)){
                ModelState.AddModelError("", "Something went wrong"); 
            };

            var validatePassToken = await _accountService.UpdateValidateForgotPasswordTokenAsync(email);
            HttpContext.Response.Cookies.Append(TextField.COOKIE_NAME_OF_VALIDATE_PASS_TOKEN, validatePassToken,
                new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(NumberFiled.VALIDATE_PASS_TOKEN_EXPIRE_TIME),
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
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if(!await _accountService.CheckIsExistVerifyCode(valadateCodeDto)){
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
            string? validatePassToken = _accountService.GetValueFromCookieByName(validatePassTokenObject,TextField.COOKIE_NAME_OF_VALIDATE_PASS_TOKEN);
            
            if(validatePassToken == null || !await _userRepository.CheckIsExistValidatePasswordToken(resetPasswordDto.Email, validatePassToken)){
                ModelState.AddModelError("error", "Nè nè reset password ở máy mô thì dùng ở máy đó nha, đừng đùa với thầy chùa");
                return StatusCode(401, ModelState);            
            }

            if(!await _accountService.CheckIsExistVerifyCode(new ValidateCodeDto{
                Code = resetPasswordDto.Code,
                Email = resetPasswordDto.Email
            }))
            {
                return NotFound();
            }

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if(!await _accountService.ResetPassword(resetPasswordDto)){
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
            try{
                if(!await _userRepository.CheckIsExistUserByEmailAsync(loginDto.Email)){
                    ModelState.AddModelError("error", "Email is not exist");
                    return StatusCode(404, ModelState);
                }    
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var TokenRespone =  await _accountService.LoginAsync(loginDto);

                HttpContext.Response.Cookies.Append(TextField.COOKIE_NAME_OF_REFRESH_TOKEN,TokenRespone.FreshToken,
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
            catch(CustomException ex){

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
        [HttpPost("refresh")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<ActionResult<TokenDto>> Refresh()
        {
            var cookieTokenObject = Request.Headers[TextField.COOKIE_NAME].ToString();
            string? freshToken = _accountService.GetValueFromCookieByName(cookieTokenObject, TextField.COOKIE_NAME_OF_REFRESH_TOKEN);
            
            if(freshToken == null || !await _userRepository.CheckFreshTokenIsValidAsync(freshToken)){
                ModelState.AddModelError("error", "Please login again");
                return StatusCode(401, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var TokenRespone =  await _accountService.RefreshTokenAsync(freshToken);

            HttpContext.Response.Cookies.Append(TextField.COOKIE_NAME_OF_REFRESH_TOKEN,TokenRespone.FreshToken,
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

        /// <summary>
        /// Delete account
        /// </summary>
        [HttpDelete("{accountId}")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<ActionResult<TokenDto>> DeleteAccount(int accountId)
        {
            try{

                if(!await _userRepository.CheckIsExistByIdAsync(accountId)){
                    ModelState.AddModelError("error", "User is not exist");
                    return StatusCode(404, ModelState);
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if(!await _userRepository.DeleteUserByIdAsync(accountId)){
                    ModelState.AddModelError("error", "Some thing went wrong when delete account");
                    return StatusCode(500, ModelState);
                }
                return Ok();
            }
            catch(CustomException ex){

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
    }
}