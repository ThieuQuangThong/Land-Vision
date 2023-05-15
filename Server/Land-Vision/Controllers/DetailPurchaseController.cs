using AutoMapper;
using Land_Vision.Dto.DetailPurchaseDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Land_Vision.Dto.DateTimeDtos;
using Land_Vision.Repositories;
using Land_Vision.Dto.TypeDtos;
using Land_Vision.DTO.DetailPurchaseDtos;

namespace Land_Vision.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DetailPurchaseController : ControllerBase
    {
        private readonly IDetailPurchaseRepository _detailPurchaseRepository;
        private readonly IMapper _mapper;
        private readonly IVipRepository _vipRepository;
        private readonly IUserRepository _userRepository;
        public DetailPurchaseController(IDetailPurchaseRepository detailPurchaseRepository, IMapper mapper, IVipRepository vipRepository, IUserRepository userRepository)
        {
            _vipRepository = vipRepository;
            _userRepository = userRepository;
            _detailPurchaseRepository = detailPurchaseRepository;
            _mapper = mapper;
        }

        // GET All Detail Purchases
        /// <summary>
        /// Get all detail purchase
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<DetailListDto>))]
        public async Task<IActionResult> GetDetailPurchases()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var detailPurchases = await _detailPurchaseRepository.GetAllDetailPurchase();
            return Ok(_mapper.Map<IEnumerable<DetailListDto>>(detailPurchases));
        }

        // GET Revenue
        /// <summary>
        /// Get Revenue
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("revenue")]
        [ProducesResponseType(200, Type = typeof(double))]
        public async Task<IActionResult> GetRevenue()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var revenue = await _detailPurchaseRepository.GetRevenue();
            return Ok(revenue);
        }

        /// <summary>
        /// Count revenue by date time
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("countRevenueByDateTime")]
        [ProducesResponseType(200, Type = typeof(DateTimeRevenueDto))]
        public async Task<ActionResult<DateTimeRevenueDto>> SumRevenueByDateTime()
        {
            var dateTimeDto = await _detailPurchaseRepository.SumRevenueByDateTimeAsync();
            if (dateTimeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(dateTimeDto);
        }

        /// <summary>
        /// Count detail purchase by vip type
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("countRevenueByVipType")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<VipTypeDto>))]
        public async Task<ActionResult<VipTypeDto>> CountDetailByVipType()
        {
            var dateTimeDto = await _detailPurchaseRepository.CountRevenueByTypeOfVip();
            if (dateTimeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(dateTimeDto);
        }

        // POST DetailPurchase
        /// <summary>
        /// Add DetailPurchase
        /// </summary>
        [Authorize(Roles = "User,Admin")]
        [HttpPost("{userId}&{vipId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddDetailPurchase(DetailPurchaseDto detailPurchaseDto, int userId, int vipId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var detailPurchase = _mapper.Map<DetailPurchase>(detailPurchaseDto);
            detailPurchase.Vip = await _vipRepository.GetVipByIdAsync(vipId);
            detailPurchase.User = await _userRepository.GetUserByIdAsync(userId);

            if (!await _detailPurchaseRepository.AddDetailPurchaseAsync(detailPurchase))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(detailPurchase);
        }
    }
}
