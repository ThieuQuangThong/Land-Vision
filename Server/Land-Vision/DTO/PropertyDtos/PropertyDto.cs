﻿using Land_Vision.DTO.CategoryDtos;
using Land_Vision.DTO.CityDtos;
using Land_Vision.DTO.DistrictDtos;
using Land_Vision.DTO.PositionDtos;
using Land_Vision.DTO.StreetDtos;
using Land_Vision.DTO.Ward;
using System.ComponentModel.DataAnnotations;

namespace Land_Vision.DTO.PropertyDtos
{
    public class PropertyDto
    {
        [Required]
        public double Area { get; set; }
        public double FrontangeArea { get; set; }
        [Required]
        public double Price { get; set; }
        public int Juridical { get; set; }
        public int Interior { get; set; }
        public int Direction { get; set; }
        public string AddressNumber { get; set; }
        public double WayIn { get; set; }
        public int NumberOfFloor { get; set; }
        public int NumberOfBed { get; set; }
        public int NumberOfBath { get; set; }
        [Required]
        public List<PositionDto> positions { get; set; }
        public CategoryDto Category { get; set; }
        public StreetDto Street { get; set; }
        public WardDto Ward { get; set; }
        public DistrictDto District { get; set; }
        public CityDto City { get; set; }
    }
}
