using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;

namespace Land_Vision.Interface.IServices
{
    public interface IUserService
    {
        Task<PaginationRespone<UserDto>> GetUsersAsync(Pagination pagination); 
    }
}