using Microsoft.EntityFrameworkCore;
using webapi.testeAPI.Domains;

namespace webapi.testeAPI.Context
{
    public class testeAPIContext : DbContext
    {
        public DbSet<Product> Product { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server= NOTE13-SALA19; Database= testeAPI_tarde; User Id = sa; Pwd= Senai@134; TrustServerCertificate=True;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
