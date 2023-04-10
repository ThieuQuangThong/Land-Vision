using AutoMapper;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Land_Vision.Repositories;

namespace Land_Vision.service
{
    public class StreetService : IStreetService
    {
        private readonly IStreetRepository _streetRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IMapper _mapper;
        public StreetService(IDistrictRepository districtRepository, IMapper mapper, IStreetRepository streetRepository)
        {
            _mapper = mapper;
            _districtRepository = districtRepository;
            _streetRepository = streetRepository;
        }
        public async Task<bool> AddStreetListAsync(List<StreetDto> streetDtos)
        {
            var districts = await _districtRepository.GetDistrictsAsync();

            foreach (var streetDto in streetDtos)
            {
                var street = _mapper.Map<Street>(streetDto);
                if(!await _streetRepository.AddStreetAsync(streetDto.districtId, street)){
                    throw new Exception("Some thing went wrong when add street");
                }
            }
            return true;

        }
    }
}