using AutoMapper;
using Land_Vision.DTO.CityDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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
        [Authorize]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CityDto>))]
        public async Task<IActionResult> GetCity(int cityId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var city = await _cityRepository.GetCityAsync(cityId);
            return Ok(city);
        }
    }
}
