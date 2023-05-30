namespace CompStore.Models
{
    public class ProductReviewModel
    {
        public Product Product { get; set; }
        public List<Review> Review { get; set; } = new List<Review>();
    }
}
