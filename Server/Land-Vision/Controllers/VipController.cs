using AutoMapper;
using Land_Vision.Data;
using Land_Vision.Interface.IRepositories;
using Land_Vision.DTO.vipDtos;
using Microsoft.AspNetCore.Mvc;
using Land_Vision.Models;
using Land_Vision.service;
using Microsoft.AspNetCore.Authorization;

namespace Land_Vision.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VipController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dbContext;
        private readonly IVipRepository _vipRepository;
        public VipController(DataContext dbContext, IMapper mapper, IVipRepository vipRepository)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _vipRepository = vipRepository;
        }

        /// <summary>
        /// Get Vips
        /// </summary>
        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<VipDto>>> GetVips()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vips = await _vipRepository.GetVipsAsync();
            return Ok(_mapper.Map<List<VipDto>>(vips));
        }

        /// <summary>
        /// Get Vip By Id
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("{vipId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<VipDto>> GetVipById(int vipId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vip = await _vipRepository.GetVipByIdAsync(vipId);
            return Ok(_mapper.Map<VipDto>(vip));
        }

        /// <summary>
        /// Add vip
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Vip>> AddVip(VipDto vipDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return await _vipRepository.AddVipAsync(_mapper.Map<Vip>(vipDto)); 
        }

        /// <summary>
        /// Update vip
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPut()]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Vip>> UpdateVip(VipDto vipDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vip = await _vipRepository.GetVipByIdAsync(vipDto.Id);
            if(vip == null){
                return NotFound();
            }

            PostService.UpdateEntityFromDto(vip,vipDto);
            if( !await _vipRepository.UpdateVipAsync(vip)){
                throw new Exception("Some thing went wrong");
            }
            
            return vip; 
        }

        /// <summary>
        /// Delete vip
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{vipId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteVip(int vipId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(!await _vipRepository.CheckVipIsExistByIdAsync(vipId)){
                return NotFound();
            }
            if( !await _vipRepository.DeleteVipByIdAsync(vipId)){
                throw new Exception("Some thing went wrong");
            }
            
            return Ok(); 
        }
    }
}