using AutoMapper;
using Land_Vision.DTO;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;

namespace Land_Vision.service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<PaginationRespone<UserDto>> GetUsersAsync(Pagination pagination)
        {
           var users = await _userRepository.GetUsersAsync(pagination);
           var userTotal = await _userRepository.GetUserTotalAsync();

           var userDtos = _mapper.Map<List<UserDto>>(users);
           var pagingResult = new PaginationRespone<UserDto>(userDtos){
                pagination = new Pagination{
                    SkipCount = pagination.SkipCount,
                    MaxResultCount = pagination.MaxResultCount,
                },
                TotalCount = userTotal
           };

           return pagingResult;
        }
    }
}