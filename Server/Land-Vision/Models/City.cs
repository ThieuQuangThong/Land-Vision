﻿namespace Land_Vision.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<District> Districts { get; set; }

    }
}
