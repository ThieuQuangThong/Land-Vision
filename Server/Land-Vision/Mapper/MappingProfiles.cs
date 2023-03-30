using AutoMapper;
using Land_Vision.DTO.CityDtos;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.DTO.RoleDtos;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.DTO.UserDtos;
using Land_Vision.Models;

namespace Land_Vision.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //User
            CreateMap<RegisterUserDto, User>();
            CreateMap<User, UserDto>()
            .ForMember(x => x.roleName, y => y.MapFrom(src => src.Role.Name));

            //Role
            CreateMap<RoleDto, Role>();

            //City
            CreateMap<CityDto, City>();
            CreateMap<City, CityDto>();

            //District
            CreateMap<DistrictDto, District>();

            //Street
            CreateMap<StreetDto, Street>();
            CreateMap<Street, StreetDto>();

        }
    }
}