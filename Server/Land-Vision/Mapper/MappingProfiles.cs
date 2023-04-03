using AutoMapper;
using Land_Vision.DTO.CategoryDtos;
using Land_Vision.DTO.CityDtos;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.DTO.ImageDtos;
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
            .ForMember(x => x.Role, y => y.MapFrom(src => src.Role.Name));

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
            CreateMap<Category, CategoryDto>();

            //Post
            CreateMap<PostDto, Post>();
            CreateMap<Post, PostDto>();
            CreateMap<PostRequestDto, Post>();
            CreateMap<Post, PostRequestDto>();

            //Property
            CreateMap<PropertyDto, Property>();
            CreateMap<Property, PropertyDto>();
            CreateMap<Property, PropertyRequestDto>();
            CreateMap<PropertyRequestDto, Property>();

            //Position
            CreateMap<PositionDto, Position>();
            CreateMap<Position, PositionDto>();

            //Image
            CreateMap<Image, ImageDto>();
            CreateMap<ImageDto, Image>();
        }
    }
}