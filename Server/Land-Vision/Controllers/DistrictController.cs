using AutoMapper;
using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictRepository _districtRepository;
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _dbContext;
        public DistrictController(DataContext dbContext, IDistrictRepository districtRepository, ICityRepository cityRepository, IMapper mapper)
        {
            _dbContext = dbContext;
            _districtRepository = districtRepository;
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        // GET Districts
        /// <summary>
        /// Get all districts
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<DistrictDto>))]
        public async Task<IActionResult> GetDistricts()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var districts = await _districtRepository.GetDistrictsAsync();
            return Ok(districts);
        }

        // GET District by Id
        /// <summary>
        /// Get district by Id
        /// </summary>
        [HttpGet("{districtId}")]
        [ProducesResponseType(200, Type = typeof(DistrictDto))]
        public async Task<IActionResult> GetDistrictAsync(int districtId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var district = await _districtRepository.GetDistrictAsync(districtId);
            return Ok(district);
        }

        // GET Street of District
        /// <summary>
        /// Get street of district
        /// </summary>
        [HttpGet("{districtId}/street")]
        [ProducesResponseType(200, Type = typeof(StreetDto))]
        public async Task<IActionResult> GetStreetOfDistrict(int districtId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var streets = await _districtRepository.GetStreetOfDistrictAsync(districtId);
            return Ok(streets);
        }

        // POST District
        /// <summary>
        /// Add district
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddDistrict([FromQuery] int cityId, [FromBody] DistrictDto districtDto)
        {
            if (districtDto == null)
                return BadRequest(ModelState);

            var district = await _cityRepository.GetDistrictOfCityAsync(cityId);

            if (district.Any(d => d.Name == districtDto.Name))
            {
                ModelState.AddModelError("", "District alredy exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var districtCreate = _mapper.Map<District>(districtDto);

            if (!await _districtRepository.AddDistrictAsync(cityId, districtCreate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(districtCreate);
        }

        // POST District
        /// <summary>
        /// Add district list
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost("addDistrictList/{cityId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddDistrictList(int cityId, [FromBody] List<DistrictDto> districtDtos)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                if (districtDtos == null)
                    return BadRequest(ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var city = await _cityRepository.GetCityAsync(cityId);
                if(city == null){
                    ModelState.AddModelError("", "City not found");
                    return StatusCode(500, ModelState);
                }

                var newDistricts = _mapper.Map<List<District>>(districtDtos);

                if (!await _districtRepository.AddDistrictListAsync(city, newDistricts))
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }

                await transaction.CommitAsync();
                return Ok(newDistricts);
            }
            catch(CustomException ex){
                await transaction.RollbackAsync();
                return StatusCode(500, ex.Message);
            }
        }

        // UPDATE district
        /// <summary>
        /// Update district
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPut("{districtId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateDistrict(int districtId, [FromBody] DistrictDto districtDto)
        {
            if (districtDto == null)
            {
                return BadRequest(ModelState);
            }

            var district = await _districtRepository.GetDistrictAsync(districtId);
            if (district == null)
            {
                ModelState.AddModelError("", "District not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            district.Name = districtDto.Name;
            if (!await _districtRepository.UpdateDistrictAsync(district))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(district);
        }


        // DELETE district
        /// <summary>
        /// Delete district
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{districtId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteDistrict(int districtId)
        {
            var district = await _districtRepository.GetDistrictAsync(districtId);
            if (district == null)
            {
                ModelState.AddModelError("", "District not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var districtDelete = _mapper.Map<District>(district);
            if (!await _districtRepository.DeleteDistrictAsync(district))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(district);
        }

    }
}
