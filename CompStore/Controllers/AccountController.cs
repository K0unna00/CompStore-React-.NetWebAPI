using CompStore.Data;
using CompStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CompStore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(ILogger<ProductController> logger, ApplicationDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _logger = logger;
            _context = context;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        [HttpPost("giverole/{id}")]
        public OkResult giveRole(string id)
        {
            var user = _userManager.FindByIdAsync(id).Result;
            var resultV2 = _userManager.AddToRoleAsync(user, "user").Result;
            return Ok();
        }
        [HttpGet("getrole/{id}")]
        public ICollection<string> getrole(string id)
        {
            var user = _userManager.FindByIdAsync(id).Result;
            var role = _userManager.GetRolesAsync(user).Result;
            return role;
        }
        [HttpPost("register")]
        public Boolean register([FromBody] RegisterModel user)
        {
            var newUser = new ApplicationUser
            {
                UserName = user.UserName,
                Email = user.Email,
                EmailConfirmed = true
            };
            var result = _userManager.CreateAsync(newUser, user.Password).Result;

            var resultV2 = _userManager.AddToRoleAsync(newUser, "user").Result;



            return result.Succeeded;
        }
        [HttpPost("login")]
        public Object login([FromBody] LoginModel user)
        {
            var result = _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, false).Result;
            if (result.Succeeded)
            {
                var currentUser = _context.Users.FirstOrDefault(x => x.UserName == user.UserName);
                var role = _userManager.GetRolesAsync(currentUser).Result;
                LoginResponseModel LRM = new LoginResponseModel()
                {
                    User = currentUser,
                    Role = role[0]
                };
                return LRM;
            }

            LoginResponseModel ss = new LoginResponseModel()
            {
                User = null,
                Role = null
            };

            return ss;
        }
        [HttpGet("logout/{id}")]
        public string logout(string id)
        {
            var result = _signInManager.SignOutAsync();

            return id;
        }
        [HttpGet("getUser/{userId}")]
        public Object getUserById(string userId)
        {
            var user = _context.Users.FirstOrDefault(x=> x.Id == userId);

            if(user != null)
            {
                return user;
            }

            return null;
        }
        [HttpPost("editProfile")]
        public bool EditProfile([FromBody] EditModel EM)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == EM.UserId);

            
            if(EM.Password.Length >= 6)
            {
                var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
                var result = _userManager.ResetPasswordAsync(user, token, EM.Password).Result;
                if (!result.Succeeded)
                {
                    return false;
                }
            }
            if (EM.Email.Length >= 0)
            {
                user.Email = EM.Email;
                _context.SaveChanges();
            }
            return true;
        }

        //[HttpPost("test")]
        //public Boolean test()
        //{
        //    var currentUser = User.Identity.IsAuthenticated
        //    if(currentUser != null)
        //    {
        //        return true;
        //    }

        //    return false;
        //}






        //[HttpGet("createrole")]
        //public async Task<IActionResult> CreateRole()
        //{
        //    await _roleManager.CreateAsync(new IdentityRole("user"));
        //    return Ok();
        //}

        //[HttpGet("createadmin")]
        //public async Task<IActionResult> CreateAdmin()
        //{
        //    ApplicationUser admin = new ApplicationUser()
        //    {
        //        UserName = "Admin",
        //        Email = "admin@gmail.com",
        //        EmailConfirmed = true
        //    };
        //    var result = await _userManager.CreateAsync(admin, "Admin1!");
        //    if (!result.Succeeded)
        //    {
        //        return Ok(result.Errors);
        //    }
        //    var resultV2 = await _userManager.AddToRoleAsync(admin, "administrator");
        //    if (resultV2.Succeeded)
        //    {
        //        return Ok(result.Errors);
        //    }
        //    return Ok();
        //}
    }
}
