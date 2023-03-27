using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Land_Vision.DTO.UserDtos;

namespace Land_Vision.Interface.IServices
{
    public interface IAccountService
    {
        PasswordAndHashDto HashPassword(string password);
        Task<bool> RegisterAccountAsync(RegisterUserDto registerUserDto);       
    }
}