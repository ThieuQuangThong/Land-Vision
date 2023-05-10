using AutoMapper;
using Land_Vision.Dto.DetailPurchaseDtos;
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
using Land_Vision.DTO.vipDtos;
using Land_Vision.DTO.Ward;
using Land_Vision.Models;

namespace Land_Vision.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //User
            CreateMap<RegisterUserDto, User>();
            CreateMap<User, UpdateUserDto>();
            CreateMap<UpdateUserDto, User>();
            CreateMap<User, UserDto>()
            .ForMember(x => x.Role, y => y.MapFrom(src => src.Role.Name))
            .ForMember(x => x.NumberOfUserCanPost, y => y.MapFrom(src => src.Vip.PostLimit));

            //Role
            CreateMap<RoleDto, Role>();

            //City
            CreateMap<CityDto, City>();
            CreateMap<City, CityDto>();

            //District
            CreateMap<DistrictDto, District>();
            CreateMap<District, DistrictDto>();

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
            CreateMap<Post, PostsPositionDto>()
            .ForMember(x => x.Name, y => y.MapFrom(src => src.User.Name))
            .ForMember(x => x.AvatarLink, y => y.MapFrom(src => src.User.AvatarLink))
            .ForMember(x => x.Price, y => y.MapFrom(src => src.Property.Price))
            .ForMember(x => x.AddressNumber, y => y.MapFrom(src => src.Property.AddressNumber))
            .ForMember(x => x.positions, y => y.MapFrom(src => src.Property.Positions))
            .ForMember(x => x.UserId, y => y.MapFrom(src => src.User.Id))
            .ForMember(x => x.Area, y => y.MapFrom(src => src.Property.Area));        

            //Property
            CreateMap<PropertyDto, Property>();
            CreateMap<Property, PropertyDto>()
            .ForMember(x => x.District, y => y.MapFrom(src => src.Street.District))
            .ForMember(p => p.City, l => l.MapFrom(src => src.Street.District.City));

            CreateMap<Property, PropertyRequestDto>();
            CreateMap<PropertyRequestDto, Property>();

            //Position
            CreateMap<PositionDto, Position>();
            CreateMap<Position, PositionDto>();

            //Image
            CreateMap<Image, ImageDto>();
            CreateMap<ImageDto, Image>();

            //Vip
            CreateMap<Vip, VipDto>();
            CreateMap<VipDto, Vip>();

            //Ward
            CreateMap<WardDto, Ward>();
            CreateMap<Ward, WardDto>();

            //Detail purchase
            CreateMap<DetailPurchaseDto, DetailPurchase>();
            CreateMap<DetailPurchase, DetailPurchaseDto>();
        }
    }
}