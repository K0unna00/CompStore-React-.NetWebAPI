using Microsoft.AspNetCore.Identity;

namespace CompStore.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Review> Reviews { get; set; } = new List<Review>();
    }
}