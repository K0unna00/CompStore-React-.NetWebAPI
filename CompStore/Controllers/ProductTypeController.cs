using CompStore.Data;
using CompStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompStore.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductTypeController : ControllerBase
    {
        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DbContextOptions<ApplicationDbContext> identityDbContextOptions, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        //{

        //};
        private readonly ApplicationDbContext _context;
        public ProductTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ICollection<ProductType> Get()
        {
            var data = _context.productTypes.ToList();
            return data;
        }
    }
}