using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;
        private readonly IUserRepository _userRepository; 
        public AccountController(IUserRepository userRepository, IEmailService emailService,IAccountService accountService)
        {
            _accountService = accountService;
            _emailService = emailService;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Get all user.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<User>))]
        public async Task<ActionResult<ICollection<User>>> GetUsers()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            return Ok(await _userRepository.GetUsersAsync());
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
        /// Login
        /// </summary>
        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<string>))]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {     
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            return Ok(await _accountService.LoginAsync(loginDto));
        } 
    }
}