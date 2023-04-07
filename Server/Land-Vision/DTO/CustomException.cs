namespace Land_Vision.DTO
{
    public class CustomException : Exception
    {
        public int StatusCode { get; set; }

        public CustomException(string message, int statusCode) : base(message)
        {
            StatusCode = statusCode;
        }        
    }
}