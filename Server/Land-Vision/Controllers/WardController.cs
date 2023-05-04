using AutoMapper;
using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.DTO.Ward;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WardController : ControllerBase
    {
        private readonly IWardRepository _wardRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IWardService _wardService;
        private readonly IMapper _mapper;
        private readonly DataContext _dbContext;
        public WardController(IDistrictRepository districtRepository, IWardService wardService, IWardRepository wardRepository, IMapper mapper, DataContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _wardRepository = wardRepository;
            _wardService = wardService;
            _districtRepository = districtRepository;
        }

        /// <summary>
        /// Get wards
        /// </summary>
        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<WardDto>>> GetWards()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wards = await _wardRepository.GetWardsAsync();
            return Ok(_mapper.Map<List<WardDto>>(wards));
        }

        /// <summary>
        /// Get wards by district id
        /// </summary>
        [HttpGet("{districtId}/district")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<WardDto>>> GetWardsByDistrictId(int districtId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!await _districtRepository.CheckIsDistrictExistByIdAsync(districtId)){
                return NotFound("district not found");
            }

            var wards = await _wardRepository.GetWardsByDistrictIdAsync(districtId);
            return Ok(_mapper.Map<List<WardDto>>(wards));
        }

        /// <summary>
        /// Add wards
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> AddWards(List<WardDto> wardDtos)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try{
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                 await _wardService.AddWardList(wardDtos);
                await transaction.CommitAsync();
                return Ok();
            }
            catch(CustomException ex){
                await transaction.RollbackAsync();
                return StatusCode(500, ex.Message);      
            }
        }
    }
}