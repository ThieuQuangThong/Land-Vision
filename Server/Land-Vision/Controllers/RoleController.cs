using AutoMapper;
using Land_Vision.DTO.RoleDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRoleRepository _roleRepository;
        public RoleController(IMapper mapper, IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Add role.
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<IActionResult> AddRole(RoleDto roleDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var currentRole = await _roleRepository.GetRoleByNameAsync(roleDto.Name);
            if(currentRole != null){
                throw new Exception("Role name already exist!");
            }

            var role = _mapper.Map<Role>(roleDto);
            if(! await _roleRepository.AddRoleAsync(role))
            {
                throw new Exception("Some thing went wrong when add role");
            }

            return Ok();
        }
    }
}