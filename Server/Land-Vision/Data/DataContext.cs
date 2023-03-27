using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<City> Citys { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
