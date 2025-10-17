using KairosWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace KairosWebAPI.Data
{
    public class ConnectionContext : DbContext
    {
        public ConnectionContext(DbContextOptions<ConnectionContext> options) : base(options) { }
        public DbSet<Turno> Turnos { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
