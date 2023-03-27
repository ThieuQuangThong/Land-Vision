using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostControllers : ControllerBase
    {
        private readonly IImageService _imageService;
        public PostControllers(IImageService imageService)
        {
            _imageService = imageService;
        }

        /// <summary>
        /// Convert file image to url.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(IEnumerable<string>))]
        public async Task<IActionResult> CovertFileToUrl(IFormFile file)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var url = await _imageService.ConvertFileToUrl(file);
            return Ok(url);
        }


    }
}