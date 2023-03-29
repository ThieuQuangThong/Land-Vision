namespace Land_Vision.DTO
{
    public class PaginationRespone<T>
    {
        public PaginationRespone(List<T> t)
        {
            ListItem = t;
        }

        public List<T> ListItem {get; set;}
        public Pagination pagination {get; set;}
        public int TotalCount { get; set;}           
    }
}