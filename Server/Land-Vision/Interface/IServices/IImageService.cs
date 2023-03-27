using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Land_Vision.Interface.IServices
{
    public interface IImageService
    {
        Task<string> ConvertFileToUrl(IFormFile file);
        Task<byte[]> ConvertFormFileToByteArray(IFormFile file);
     }
}