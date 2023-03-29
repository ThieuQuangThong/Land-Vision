using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Land_Vision.Common;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Microsoft.IdentityModel.Tokens;

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

        public async Task<bool> CheckIsExistVerifyCode(ValidateCodeDto validateCodeDto)
        {
            return await _userRepository.CheckCodeIsExistWithEmail(validateCodeDto);
        }

        public bool CompareHashPassword(byte[] currentPassword, byte[] password)
        {
            return CryptographicOperations.FixedTimeEquals(currentPassword, password);
        }

        

        public async Task<bool> ForgotPasswordAsync(User user)
        {
            user.Code = await GenerateVerifyCodeAsync();
            user.CodeExpires = DateTime.Now.AddMinutes(15);

            var content = $"<p>Hello {user.Name},"
            + "</p><p><b>This is your verify code:</b></p><p>"
            + $"{user.Code}</p>";
            var message = new Message
            (
                new string[] {user.Email},
                TextField.VERIFY_CODE,
                content
            );
            _emailService.SendMail(message);

            return await _userRepository.UpdateUserAsync(user);
        }

        public string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.Name),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["JWT:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> GenerateVerifyCodeAsync()
        {
            Random random = new Random();
            string randomNumber = random.Next(100000, 999999).ToString();

            if(await _userRepository.CodeIsExistAsync(randomNumber)){
                return await GenerateVerifyCodeAsync();
            }

            return randomNumber;
        }

        public PasswordAndHashDto HashPassword(string password)
        {
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            using var hmac = new HMACSHA512();

            var passwordObject = new PasswordAndHashDto {
                hashedPassword = hmac.ComputeHash(passwordBytes),
                PasswordSalt = hmac.Key,
            };
            
            return passwordObject;
        }

        public PasswordAndHashDto HashPasswordWithSalt(string password, byte[] passwordSalt)
        {
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            using var hmac = new HMACSHA512(passwordSalt);

            var passwordObject = new PasswordAndHashDto {
                hashedPassword = hmac.ComputeHash(passwordBytes),
                PasswordSalt = hmac.Key,
            };
            
            return passwordObject;
        }

        public async Task<string> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

            if(user == null){
                throw new Exception("Not found!");
            }
            
            if(!user.EmailConfirmed){
                 throw new Exception("Please, confirm your email!");               
            }
            
            var  hashedInputpassword = HashPasswordWithSalt(loginDto.Password, user.PasswordSalt).hashedPassword;
            if(!CompareHashPassword(user.PasswordHash,hashedInputpassword)){
                throw new Exception("Wrong password!");
            }
            
            return GenerateToken(user); 
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
            var confirmationLinkUrl = _config["Url"] + "api/Account/confirmEmail/" + confirmEmailToken.ToString();
            var content = $"<p>Hello {user.Name},"
            + "</p><p><b>Please click the link below to confirm your email address:</b></p><p>"
            + $"<a href='{confirmationLinkUrl}'>{confirmationLinkUrl}</a></p>";
            var message = new Message
            (
                new string[] {user.Email},
                TextField.CONFIRM_EMAIL_SUBJECT,
                content
            );
            _emailService.SendMail(message);

            return true;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(resetPasswordDto.Email);
            if(user == null){
                throw new Exception("Not found");                
            }

            if(user.CodeExpires < DateTime.Now){
                throw new Exception("Code expried");   
            }

            var newPassword = HashPassword(resetPasswordDto.Password);
            user.PasswordHash = newPassword.hashedPassword;
            user.PasswordSalt = newPassword.PasswordSalt;
            user.Code = "";
            user.CodeExpires = DateTime.MaxValue;

            return await _userRepository.UpdateUserAsync(user);
        }
    }
}