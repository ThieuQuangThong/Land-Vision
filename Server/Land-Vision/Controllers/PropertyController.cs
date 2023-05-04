using Land_Vision.Common;
using Land_Vision.Interface.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepository;
        public PropertyController(IPropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        // DELETE Property
        /// <summary>
        /// Delete Property
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{propertyId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletePropertyById(int propertyId)
        {
            var property= await _propertyRepository.GetPropertyAsync(propertyId);
            if (property == null)
            {
                ModelState.AddModelError("", "Property is not exists");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _propertyRepository.DeletePropertyAsync(property))
            {
                ModelState.AddModelError("", "Something went wrong while deleting");
                return StatusCode(500, ModelState);
            }
            return Ok();
        }

        // Get Directions
        /// <summary>
        /// Get Directions
        /// </summary>
        [HttpGet("getDirections")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<string>>> GetDirections()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<string> directions = Enum.GetNames(typeof(Directions)).ToList();
            return Ok(directions);
        }
    }
}