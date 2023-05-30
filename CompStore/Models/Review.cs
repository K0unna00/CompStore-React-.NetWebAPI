namespace CompStore.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public string? ReviewMessage { get; set; }
        public int? Point { get; set; }
        public ApplicationUser User { get; set; }
        public Product Product { get; set; }
    }
}
