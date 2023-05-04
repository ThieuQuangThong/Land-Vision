using AutoMapper;
using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StreetController : ControllerBase
    {
        private readonly IStreetRepository _streetRepository;
        private readonly IStreetService _streetService;
        private readonly IDistrictRepository _districtRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _dbContext;
        public StreetController(IStreetService streetService, DataContext dbContext, IStreetRepository streetRepository, IDistrictRepository districtRepository, IMapper mapper)
        {
            _streetRepository = streetRepository;
            _districtRepository = districtRepository;
            _mapper = mapper;
            _dbContext = dbContext;
            _streetService = streetService;
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
            var street = await _streetRepository.GetStreetByIdAsync(streetId);
            return Ok(street);
        }

        // GET Street by District id
        /// <summary>
        /// GET Street by District id
        /// </summary>
        [HttpGet("{districtId}/district")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetStreetByDistrictId(int districtId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!await _districtRepository.CheckIsDistrictExistByIdAsync(districtId)){
                return NotFound();
            }

            var street = await _streetRepository.GetStreetsByDistrictIdAsync(districtId);
            return Ok(street);
        }

        // POST Street
        /// <summary>
        /// Add street
        /// </summary>
        [Authorize(Roles = "Admin")]
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
                ModelState.AddModelError("error", "Street alredy exists");
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

        // POST street list
        /// <summary>
        /// Add street list
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost("addStreetList")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddStreetList([FromBody] List<StreetDto> streetDtos)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try{

                if (streetDtos == null)
                    return BadRequest(ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!await _streetService.AddStreetListAsync(streetDtos))
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }

                await transaction.CommitAsync();
                return Ok();
            }
            catch(CustomException ex){
                await transaction.RollbackAsync();
                return StatusCode(500, ex.Message);
            }
        }

        // UPDATE street
        /// <summary>
        /// Update street
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPut("{streetId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateDistrict(int streetId, [FromBody] StreetDto streetDto)
        {
            if (streetDto == null)
            {
                return BadRequest(ModelState);
            }

            var street = await _streetRepository.GetStreetByIdAsync(streetId);
            if (street == null)
            {
                ModelState.AddModelError("", "Street not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            street.Name = streetDto.Name;
            if (!await _streetRepository.UpdateStreetAsync(street))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(street);
        }

        // DELETE street
        /// <summary>
        /// Delete street
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{streetId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteStreet(int streetId)
        {
            var street = await _streetRepository.GetStreetByIdAsync(streetId);
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
