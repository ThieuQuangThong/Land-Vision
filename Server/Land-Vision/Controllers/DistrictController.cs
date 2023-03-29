﻿using AutoMapper;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Route("api/[controller]")]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictRepository _districtRepository;
        private readonly IMapper _mapper;
        public DistrictController(IDistrictRepository districtRepository, IMapper mapper)
        {
            _districtRepository = districtRepository;
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
        public async Task<IActionResult> GetDistrict(int districtId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var district = await _districtRepository.GetDistrictAsync(districtId);
            return Ok(district);
        }

        // POST District
        /// <summary>
        /// Add district
        /// </summary>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddDistrict([FromQuery] int cityId, [FromBody] DistrictDto districtDto)
        {
            if (districtDto == null)
                return BadRequest(ModelState);

            var district = await _districtRepository.GetDistrictByNameAsync(districtDto.Name);

            if (district != null)
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

        // UPDATE district
        /// <summary>
        /// Update district
        /// </summary>
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

            var districtUpdate = _mapper.Map<District>(districtDto);
            if (!await _districtRepository.UpdateDistrictAsync(districtUpdate))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(districtUpdate);
        }


        // DELETE district
        /// <summary>
        /// Delete district
        /// </summary>
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
            if (!await _districtRepository.UpdateDistrictAsync(district))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(district);
        }

    }
}