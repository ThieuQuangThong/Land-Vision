using AutoMapper;
using Land_Vision.Dto.DetailPurchaseDtos;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.DTO;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Land_Vision.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Controllers
{
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
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<DetailPurchase>))]
        public async Task<IActionResult> GetDetailPurchases()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var detailPurchases = await _detailPurchaseRepository.GetAllDetailPurchase();
            return Ok(detailPurchases);
        }


        // POST DetailPurchase
        /// <summary>
        /// Add DetailPurchase
        /// </summary>
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
