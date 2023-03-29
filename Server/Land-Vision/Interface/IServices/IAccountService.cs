using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Models;

namespace Land_Vision.Interface.IServices
{
    public interface IAccountService
    {
        Task<bool> ResetPassword(ResetPasswordDto validateCodeDto);
        Task<bool> CheckIsExistVerifyCode(ValidateCodeDto validateCodeDto);
        Task<string> GenerateVerifyCodeAsync();
        Task<bool> ForgotPasswordAsync(User user);
        string GenerateToken(User user);
        PasswordAndHashDto HashPassword(string password);
        PasswordAndHashDto HashPasswordWithSalt(string password, byte[]  passwordSalt );
        Task<bool> RegisterAccountAsync(RegisterUserDto registerUserDto);
        Task<string> LoginAsync(LoginDto loginDto);
        bool CompareHashPassword(byte[] currentPassword, byte[] password);   
    }
}