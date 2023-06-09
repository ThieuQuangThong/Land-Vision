﻿using Land_Vision.DTO;
using Land_Vision.DTO.PostDtos;
using Land_Vision.Dto.PostDtos;

namespace Land_Vision.Interface.IServices
{
    public interface IPostService
    {
        Task<bool> CheckIsUserCanPost(int userId);
        Task<PaginationRespone<PostDto>> GetUnapprovedPostsAsync(Pagination pagination);
        Task<PaginationRespone<PostDto>> GetApprovedPostsAsync(Pagination pagination);
        Task<PaginationRespone<PostDto>> GetRejectedPostsAsync(Pagination pagination);
        Task<PaginationRespone<PostDto>> GetALLPostsAsync(Pagination pagination);
        Task<PaginationRespone<PostDto>> GetSearchedPostsAsync(Pagination pagination, PostSearchDto postSearchDto);
        Task<PaginationRespone<PostDto>> GetPostsByTimeAsync(Pagination pagination, DateTime startDate, DateTime endDate);
        Task<bool> AddPostPropertyAsync(int userId, CreatePostPropertyDto createPostPropertyDto);
        Task<bool> UpdatePostPropertyAsync(int postId, CreatePostPropertyDto createPostPropertyDto);
    }
}
