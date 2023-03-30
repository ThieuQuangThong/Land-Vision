using AutoMapper;
using Land_Vision.DTO.CityDtos;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;
        public CityController(ICityRepository cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        // GET Cities
        /// <summary>
        /// Get all cities.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CityDto>))]
        public async Task<IActionResult> GetCities()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cities = await _cityRepository.GetCitiesAsync();
            return Ok(cities);
        }

        // GET City by id
        /// <summary>
        /// Get city by id.
        /// </summary>
        [HttpGet("{cityId}")]
        [ProducesResponseType(200, Type = typeof(CityDto))]
        public async Task<IActionResult> GetCity(int cityId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var city = await _cityRepository.GetCityAsync(cityId);
            if (city == null)
            {
                ModelState.AddModelError("", "City not exist");
                return StatusCode(422, ModelState);
            }
            return Ok(city);
        }

        // GET District of city
        /// <summary>
        /// Get district of city
        /// </summary>
        [HttpGet("{cityId}/district")]
        [ProducesResponseType(200, Type = typeof(DistrictDto))]
        public async Task<IActionResult> GetDistrictOfCity(int cityId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var districts = await _cityRepository.GetDistrictOfCityAsync(cityId);

            return Ok(districts);
        }

        // POST City
        /// <summary>
        /// Add city.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddCity([FromBody] CityDto cityDto)
        {
            if (cityDto == null)
                return BadRequest(ModelState);

            var city = await _cityRepository.GetCityByNameAsync(cityDto.Name);
            if (city != null)
            {
                ModelState.AddModelError("", "City already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var cityCreate = _mapper.Map<City>(cityDto);
            if (!await _cityRepository.AddCityAsync(cityCreate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(cityCreate);
        }

        // UPDATE City
        /// <summary>
        /// Update city by id.
        /// </summary>
        [HttpPut("{cityId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateCity(int cityId, [FromBody] CityDto cityDto)
        {
            if (cityDto == null)
                return BadRequest(ModelState);

            var city = await _cityRepository.GetCityAsync(cityId);
            if (city == null)
            {
                ModelState.AddModelError("", "City not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var cityUpdate = _mapper.Map<City>(cityDto);
            if (!await _cityRepository.UpdateCityAsync(cityUpdate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(cityUpdate);
        }

        // Delete City
        /// <summary>
        /// Delete city by id.
        /// </summary>
        [HttpDelete("{cityId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteCity(int cityId)
        {
            if (cityId == null)
                return BadRequest(ModelState);

            var city = await _cityRepository.GetCityAsync(cityId);
            if (city == null)
            {
                ModelState.AddModelError("", "City not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var cityDelete = _mapper.Map<City>(city);
            try
            {
                await _cityRepository.DeleteCityAsync(cityDelete);
                return Ok(cityDelete);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
        }
    }
}
