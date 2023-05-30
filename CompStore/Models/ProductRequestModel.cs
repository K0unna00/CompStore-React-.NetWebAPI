using System.ComponentModel.DataAnnotations.Schema;

namespace CompStore.Models
{
    public class ProductRequestModel
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Summary { get; set; }
        public int ProductTypeId { get; set; }

    }
}
