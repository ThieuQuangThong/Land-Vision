using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Firebase.Storage;
using Land_Vision.Interface.IServices;

namespace Land_Vision.service
{
    public class ImageService : IImageService
    {
        private readonly FirebaseStorage firebaseStorage;

        public ImageService()
        {
            firebaseStorage = new FirebaseStorage("test-ec310.appspot.com");
        }
        public async Task<string> ConvertFileToUrl(IFormFile file)
        {
            using var stream = new MemoryStream(await ConvertFormFileToByteArray(file));
            var imageName = Guid.NewGuid().ToString();
            await firebaseStorage.Child("images").Child(imageName).PutAsync(stream);
            var downloadUrl = await firebaseStorage.Child("images").Child(imageName).GetDownloadUrlAsync();
            return downloadUrl;
        }

        public async Task<byte[]> ConvertFormFileToByteArray(IFormFile formFile)
        {
            using var memoryStream = new MemoryStream();
            await formFile.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}