using AutoMapper;
using Land_Vision.DTO.Ward;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;

namespace Land_Vision.service
{
    public class WardService : IWardService
    {
        private readonly IWardRepository _wardRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IMapper _mapper;
        public WardService(IWardRepository wardRepository, IDistrictRepository districtRepository, IMapper mapper)
        {
            _wardRepository = wardRepository;
            _districtRepository = districtRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddWardList(List<WardDto> wardDtos)
        {
            var districts = await _districtRepository.GetDistrictsAsync();

            foreach (var wardDto in wardDtos)
            {
                var ward = _mapper.Map<Ward>(wardDto);
                var district = districts.Where(x => x.Id == wardDto.districtId).FirstOrDefault();
                if(district == null){
                    throw new Exception("Not found ");
                }
                ward.District = district;
                if(!await _wardRepository.AddWardAsync(ward)){
                    throw new Exception("Some thing went wrong when add street");
                }
            }
            return true;
        }
    }
}