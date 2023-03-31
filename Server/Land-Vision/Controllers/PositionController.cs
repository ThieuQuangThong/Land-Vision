using AutoMapper;
using Land_Vision.DTO.CityDtos;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.DTO.PositionDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Land_Vision.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IMapper _mapper;
        public PositionController(IPositionRepository positionRepository, IMapper mapper)
        {
            _positionRepository = positionRepository;
            _mapper = mapper;
        }

        // GET Positions
        /// <summary>
        /// Get all positions.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<PositionDto>))]
        public async Task<IActionResult> GetPositions()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var positions = await _positionRepository.GetPositionsAsync();
            return Ok(positions);
        }

        // GET Position by id
        /// <summary>
        /// Get position by id.
        /// </summary>
        [HttpGet("{positionId}")]
        [ProducesResponseType(200, Type = typeof(PositionDto))]
        public async Task<IActionResult> GetCity(int positionId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var position = await _positionRepository.GetPositionByIdAsync(positionId);
            if (position == null)
            {
                ModelState.AddModelError("", "City not exist");
                return StatusCode(422, ModelState);
            }
            return Ok(position);
        }


        // POST Position
        /// <summary>
        /// Add position.
        /// </summary>
        [HttpPost("{propertyId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddPosition(int propertyId, [FromBody] PositionDto positionDto)
        {
            if (positionDto == null)
                return BadRequest(ModelState);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var positionCreate = _mapper.Map<Position>(positionDto);
            positionCreate.Id = propertyId;
            if (!await _positionRepository.AddPositionAsync(positionCreate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(positionCreate);
        }

        // UPDATE Position
        /// <summary>
        /// Update position by id.
        /// </summary>
        [HttpPut("{positionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdatePosition(int positionId, [FromBody] PositionDto positionDto)
        {
            if (positionDto == null)
                return BadRequest(ModelState);

            var position = await _positionRepository.GetPositionByIdAsync(positionId);
            if (position == null)
            {
                ModelState.AddModelError("", "Position not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            positionDto.Id = positionId;
            var positionUpdate = _mapper.Map<Position>(positionDto);
            if (!await _positionRepository.UpdatePositionAsync(positionUpdate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(positionUpdate);
        }

        // Delete Position
        /// <summary>
        /// Delete position by id.
        /// </summary>
        [HttpDelete("{positionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletePosition(int positionId)
        {
            if (positionId == null)
                return BadRequest(ModelState);

            var position = await _positionRepository.GetPositionByIdAsync(positionId);
            if (position == null)
            {
                ModelState.AddModelError("", "Position not exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var cityDelete = _mapper.Map<Position>(position);
            try
            {
                await _positionRepository.DeletePositionAsync(cityDelete);
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
