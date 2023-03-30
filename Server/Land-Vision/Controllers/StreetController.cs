using AutoMapper;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StreetController : ControllerBase
    {
        private readonly IStreetRepository _streetRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IMapper _mapper;
        public StreetController(IStreetRepository streetRepository, IDistrictRepository districtRepository, IMapper mapper)
        {
            _streetRepository = streetRepository;
            _districtRepository = districtRepository;
            _mapper = mapper;
        }

        // GET Streets
        /// <summary>
        /// Get all streets
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<StreetDto>))]
        public async Task<IActionResult> GetStreets()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var streets = await _streetRepository.GetStreetsAsync();
            return Ok(streets);
        }

        // GET Street by Id
        /// <summary>
        /// Get street by Id
        /// </summary>
        [HttpGet("{streetId}")]
        [ProducesResponseType(200, Type = typeof(StreetDto))]
        public async Task<IActionResult> GetStreet(int streetId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var street = await _streetRepository.GetStreetAsync(streetId);
            return Ok(street);
        }

        // POST Street
        /// <summary>
        /// Add street
        /// </summary>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddStreet([FromQuery] int districtId, [FromBody] StreetDto streetDto)
        {
            if (streetDto == null)
                return BadRequest(ModelState);


            var street = await _districtRepository.GetStreetOfDistrictAsync(districtId);

            if (street.Any(s => s.Name == streetDto.Name))
            {
                ModelState.AddModelError("", "Street alredy exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var streetCreate = _mapper.Map<Street>(streetDto);

            if (!await _streetRepository.AddStreetAsync(districtId, streetCreate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(streetCreate);
        }

        // UPDATE street
        /// <summary>
        /// Update street
        /// </summary>
        [HttpPut("{streetId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateDistrict(int streetId, [FromBody] StreetDto streetDto)
        {
            if (streetDto == null)
            {
                return BadRequest(ModelState);
            }

            var street = await _streetRepository.GetStreetAsync(streetId);
            if (street == null)
            {
                ModelState.AddModelError("", "Street not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var streetUpdate = _mapper.Map<Street>(streetDto);
            if (!await _streetRepository.UpdateStreetAsync(streetUpdate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(streetUpdate);
        }


        // DELETE street
        /// <summary>
        /// Delete street
        /// </summary>
        [HttpDelete("{streetId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteStreet(int streetId)
        {
            var street = await _streetRepository.GetStreetAsync(streetId);
            if (street == null)
            {
                ModelState.AddModelError("", "Street not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var streetDelete = street;
            if (!await _streetRepository.DeleteStreetAsync(streetDelete))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(streetDelete);
        }
    }
}
