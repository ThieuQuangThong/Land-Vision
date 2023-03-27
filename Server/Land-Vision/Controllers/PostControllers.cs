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
    }
}