using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        // POST Image
        /// <summary>
        /// Convert file image to Url
        /// </summary>
        [HttpPost("convertFileImageToUrl")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<IActionResult> ConvertFileToUrl(IFormFile formFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var url = await _imageService.ConvertFileToUrl(formFile);
            return Ok(url);
        }

        // POST Image
        /// <summary>
        /// Convert image base64 to Url
        /// </summary>
        [HttpPost("convertBase64ToUrl")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<IActionResult> ConvertBase64ToUrl([FromBody] string base64)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(await _imageService.ConvertBase64ToUrlAsync(base64));
        }  
    }
}