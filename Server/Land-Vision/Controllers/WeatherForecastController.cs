using Land_Vision.DTO;
using Land_Vision.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Land_Vision.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private static readonly string[] Summaries = new[]
        {
        "Lanh VLz", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "DaumA"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IEmailService emailService)
        {
            _logger = logger;
            _emailService = emailService;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public  IActionResult Get()
        {
            var message = new Message(new string[] { "minhuy123344@gmail.com" }, "Test email", "This is the content from our email.");
            _emailService.SendMail(message);
            return Ok();
        }
    }
}