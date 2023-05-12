namespace Land_Vision.Dto.TypeDtos
{
    public class TypeDto
    {
        public Dictionary<int, int> NumOfType { get; set; }
    }
    public class VipTypeDto
    {
        public string name { get; set; }
        public int num { get; set; }
    }
    public class PostTypeDto
    {
        public int key { get; set; }
        public int value { get; set; }
    }
}
