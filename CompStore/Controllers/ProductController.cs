using CompStore.Data;
using CompStore.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using CompStore.Helpers;

namespace CompStore.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {

        private readonly ILogger<ProductController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;
        

        public ProductController(ILogger<ProductController> logger , ApplicationDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager , IWebHostEnvironment environment)
        {
            _userManager = userManager;
            _logger = logger;
            _context = context;
            _roleManager = roleManager;
            _environment = environment;
        }

        [HttpGet]
        public async Task<ICollection<Product>> Get()
        {
            var products = await _context.products.Include(x => x.Reviews).ToListAsync();
            return products;
        }
        [HttpGet("getTypes")]
        public async Task<List<ProductType>> getTypes()
        {
            //var data = await _context.products.ToListAsync();
            return await _context.productTypes.ToListAsync();
        }
        [HttpGet("{Id:int}") ]
        public Object getProductById(int Id)
        {
            var data = _context.products.Include(x => x.Reviews).ThenInclude(x => x.User).FirstOrDefault(x => x.Id == Id);

            return data;
        }

        [HttpPost("create")]
        public int Create([FromBody] ProductRequestModel prod)
        {
            var types = _context.productTypes.ToList();

            Product prd = new Product()
            {
                Name = prod.Name,
                Price = prod.Price,
                Summary = prod.Summary,
                ProductTypeId = prod.ProductTypeId
            };

            var res = _context.products.Add(prd);
            var result = _context.SaveChanges();

            var id = _context.products.FirstOrDefault(x => x == prd).Id;

            return id;
        }
        [HttpPost("delete")]
        public Boolean delete([FromBody] int id)
        {
            var data = _context.products.FirstOrDefault(x => x.Id == id);
            if (data != null)
            {

                FileManager.Delete(_environment.WebRootPath, "/../ClientApp/public/Images/", data.imgPath);

                _context.products.Remove(data);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        [HttpPost("uploadFile")]
        public Boolean uploadFile([FromForm] UploadModel file )
        {
            var id = int.Parse(file.ProductId);
            if(file != null)
            {
                var name = FileManager.Save(_environment.WebRootPath, "/../ClientApp/public/Images/", file.FormFile, file.FileName);
                var product = _context.products.FirstOrDefault(x => x.Id == id);
                product.imgPath = name;
                _context.SaveChanges();
            }

            return true;
        }
        [HttpPost("filter")]
        public Object Filter([FromBody] FilterModel FM)
        {
            var productData = _context.products.Include(x => x.Reviews).ToList();
            var finalProductData = new List<Product>();
            var finalData = new List<Product>();

            finalData = productData;

            if (FM.TypeIds.Length > 0)
            {
                finalData = new List<Product>();
                foreach (var i in FM.TypeIds)
                {
                    finalProductData = productData.Where(x => x.ProductTypeId == i).ToList();
                    finalData.AddRange(finalProductData);
                };
                
            }
            if (FM.LowToHigh == true)
            {
                finalData = finalData.OrderBy(x => x.Price).ToList();
            }
            else
            {
                finalData = finalData.OrderByDescending(x => x.Price).ToList();
            }

            return finalData;
        }
        [HttpGet("review/{Id}/{UserId}")]
        public Object Review(int Id, string UserId)
        {
            var data = _context.reviews.FirstOrDefault(x => x.ProductId == Id && x.UserId == UserId);
            if(data == null)
            {
                Review review = new Review()
                {
                    UserId = UserId,
                    ProductId = Id
                };
                _context.reviews.Add(review);
                _context.SaveChanges();
            }
            return true;
        }
        [HttpGet("boughtItems/{UserId}")]
        public List<Review> BoughtItems(string UserId)
        {
            var data = _context.reviews.Where(x => x.UserId == UserId).ToList();
            return data;
        }
        [HttpPost("reviewProd")]
        public bool ReviewProduct([FromBody] RevProd RP)
        {
            var review = _context.reviews.FirstOrDefault(x => x.Id == RP.ReviewId);
            if (review != null)
            {
                if(RP.Point == 0 || RP.Message == "")
                {
                    return false;
                }

                review.ReviewMessage = RP.Message;
                review.Point = RP.Point;
                _context.SaveChanges();
                return true;
            }

            return false;
        }
    

    }
}