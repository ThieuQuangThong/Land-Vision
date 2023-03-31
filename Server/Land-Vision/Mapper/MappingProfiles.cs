using AutoMapper;
using Land_Vision.DTO.CategoryDtos;
using Land_Vision.DTO.CityDtos;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.DTO.PositionDtos;
using Land_Vision.DTO.PostDtos;
using Land_Vision.DTO.PropertyDtos;
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

            //Category
            CreateMap<CategoryDto, Category>();

            //Post
            CreateMap<PostDto, Post>();
            CreateMap<Post, PostDto>();


            //Property
            CreateMap<PropertyDto, Property>();
            CreateMap<Property, PropertyDto>();

            //Position
            CreateMap<PositionDto, Position>();
            CreateMap<Position, PositionDto>();
        }
    }
}