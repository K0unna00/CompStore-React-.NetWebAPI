using System.ComponentModel.DataAnnotations.Schema;

namespace CompStore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Summary { get; set; }
        public int ProductTypeId { get; set; }
        public string? imgPath { get; set; }
        public ProductType ProductType { get; set; }
        public List<Review> Reviews { get; set; } = new List<Review>();

    }
}
