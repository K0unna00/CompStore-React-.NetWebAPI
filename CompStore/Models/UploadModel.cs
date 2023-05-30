namespace CompStore.Models
{
    public class UploadModel
    {
        public string FileName { get; set; }
        public string ProductId { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
