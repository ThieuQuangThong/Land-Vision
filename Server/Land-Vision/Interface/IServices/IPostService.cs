﻿using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Dto.PostDtos;

namespace Land_Vision.Interface.IServices
{
    public interface IPostService
    {
        Task<PaginationRespone<PostDto>> GetPostsAsync(Pagination pagination);

        Task<bool> AddPostPropertyAsync(int userId, CreatePostPropertyDto createPostPropertyDto);
        Task<bool> UpdatePostPropertyAsync(int postId, CreatePostPropertyDto createPostPropertyDto);
    }
}