using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Land_Vision.DTO
{
    public class Pagination<T>
    {
        public List<T> ListItem {get; set;}
        public int TotalCount { get; set;}
        public int SkipCount { get; set;}
        public int MaxResultCount { get; set;}              
    }
}