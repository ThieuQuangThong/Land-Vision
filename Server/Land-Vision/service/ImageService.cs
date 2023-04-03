using AutoMapper;
using Firebase.Storage;
using Land_Vision.DTO.ImageDtos;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Interface.IServices;
using Land_Vision.Models;

namespace Land_Vision.service
{
    public class ImageService : IImageService
    {
        private readonly IMapper _mapper;
        private readonly IImageRepository _imageRepository;
        private readonly IPostRepository _postRepository;
        private readonly FirebaseStorage _firebaseStorage;

        public ImageService(IImageRepository imageRepository ,IPostRepository postRepository, IMapper mapper)
        {
            _firebaseStorage = new FirebaseStorage("test-ec310.appspot.com");
            _postRepository = postRepository;
            _mapper = mapper;
            _imageRepository = imageRepository;
        }

        public async Task<bool> AddImageListToPostAsync(int postId, List<ImageDto> imageDtos)
        {
            var post = await _postRepository.GetPostAsync(postId);

            var images = _mapper.Map<List<Image>>(imageDtos);
            images.ForEach(x => x.Post = post);
            return await _imageRepository.AddImageListAsync(images);
        }

        public async Task<string> ConvertFileToUrl(IFormFile file)
        {
            using var stream = new MemoryStream(await ConvertFormFileToByteArray(file));
            var imageName = Guid.NewGuid().ToString();
            await _firebaseStorage.Child("images").Child(imageName).PutAsync(stream);
            var downloadUrl = await _firebaseStorage.Child("images").Child(imageName).GetDownloadUrlAsync();
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