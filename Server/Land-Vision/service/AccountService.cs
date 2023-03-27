using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Land_Vision.Common;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;

namespace Land_Vision.service
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IRoleRepository _roleRepository;
        private readonly IConfiguration _config;
        public AccountService
        (
        IRoleRepository roleRepository,
        IUserRepository userRepository,
        IMapper mapper,
        IEmailService emailService,
        IConfiguration configuration
        )
        {
            _roleRepository = roleRepository;
            _config = configuration;
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public PasswordAndHashDto HashPassword(string password)
        {
            using var hmac = new HMACSHA512();
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            var passwordObject = new PasswordAndHashDto {
                hashedPassword = hmac.ComputeHash(passwordBytes),
                PasswordSalt = hmac.Key,
            };
            
            return passwordObject;
        }

        public async Task<bool> RegisterAccountAsync(RegisterUserDto registerUserDto)
        {
            if(await _userRepository.GetUserByEmailAsync(registerUserDto.Email) != null){
                throw new Exception("Email is already taken!");
            }
            var role = await _roleRepository.GetRoleByNameAsync(RoleField.USER);
            var user = _mapper.Map<User>(registerUserDto);
            var newPasswordObject = HashPassword(registerUserDto.password);
            user.PasswordHash = newPasswordObject.hashedPassword;
            user.PasswordSalt = newPasswordObject.PasswordSalt;
            user.EmailExpiresTime = DateTime.Now.AddMinutes(5);
            user.Role = role;

            if(!await _userRepository.CreateUserAsync(user)){
                return false; 
            };

            var confirmEmailToken = _emailService.GenerateEmailConfirmToken(user);
            var confirmationLinkUrl = _config["Url"] + "api/Account/confirmEmail" + confirmEmailToken.ToString();
            var Content = $"<p>Hello {user.Name},"
            + "</p><p><b>Please click the link below to confirm your email address:</b></p><p>"
            + $"<a href='{confirmationLinkUrl}'>{confirmationLinkUrl}</a></p>";
            var message = new Message
            (
                new string[] {user.Email},
                TextField.CONFIRM_EMAIL_SUBJECT,
                Content
            );
            _emailService.SendMail(message);

            return true;
        }
    }
}