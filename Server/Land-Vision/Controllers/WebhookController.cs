using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Dialogflow.V2;
using Google.Protobuf;
using System.IO;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebhookApi.Controllers
{
    [Route("webhook")]
    public class WebhookController : Controller
    {
        private static readonly JsonParser jsonParser = new JsonParser(JsonParser.Settings.Default.WithIgnoreUnknownFields(true));

        [HttpPost]
        public async Task<JsonResult> GetWebhookResponse()
        {
            WebhookRequest request;
            using (var reader = new StreamReader(Request.Body))
            {
                request = jsonParser.Parse<WebhookRequest>(reader);
            }

            var pas = request.QueryResult.Parameters;
            var askingName = pas.Fields.ContainsKey("location") && pas.Fields["location"].ToString().Replace('\"', ' ').Trim().Length > 0;
            var askingAddress = pas.Fields.ContainsKey("num1") && pas.Fields["num1"].ToString().Replace('\"', ' ').Trim().Length > 0 && pas.Fields.ContainsKey("num2") && pas.Fields["num2"].ToString().Replace('\"', ' ').Trim().Length > 0;

            var askingBusinessHour = pas.Fields.ContainsKey("business-hours") && pas.Fields["business-hours"].ToString().Replace('\"', ' ').Trim().Length > 0;
            var response = new WebhookResponse();

            string name = "Jeffson Library", address = "1234 Brentwood Lane, Dallas, TX 12345", businessHour = "8:00 am to 8:00 pm";

            StringBuilder sb = new StringBuilder();

            if (askingName)
            {
                sb.Append("The name of library is: " + name + "; ");
            }

            if (askingAddress)
            {
                int num1 = Convert.ToInt32(pas.Fields["num1"].ToString());
                int num2 = Convert.ToInt32(pas.Fields["num2"].ToString());
                int sum = num1 + num2;
                sb.Append($"Sum of {num1} and {num2} = {sum}");
            }

            if (askingBusinessHour)
            {
                sb.Append("The Business Hour of library is: " + businessHour + "; ");
            }

            if (sb.Length == 0)
            {
                sb.Append("Greetings from our Webhook API!");
            }

            response.FulfillmentText = sb.ToString();

            return Json(response);
        }
    }
}