﻿namespace Land_Vision.DTO.PostDtos
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfView { get; set; }

        public bool isVerified { get; set; }
    }
}