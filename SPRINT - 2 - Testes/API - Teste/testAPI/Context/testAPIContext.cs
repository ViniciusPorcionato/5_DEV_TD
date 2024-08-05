using Microsoft.EntityFrameworkCore;
using testAPI.Domain;

namespace testAPI.Context
{
    public class testAPIContext : DbContext
    {
        public DbSet<Product> Product { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server= NOTE13-SALA19; Database= testAPI_tarde; User Id = sa; Pwd= Senai@134; TrustServerCertificate=True;");
            base.OnConfiguring(optionsBuilder);
        }

    }
}
