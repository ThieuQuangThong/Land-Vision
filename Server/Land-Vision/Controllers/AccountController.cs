using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService; 
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
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
        /// Confirm Email
        /// </summary>
        [HttpPost("confirmEmail/{emailToken}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<string>))]
        public async Task<IActionResult> ConfirmEmail(string emailToken)
        {        
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            return Ok();
        } 
    }

    
}