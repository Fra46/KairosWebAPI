using Microsoft.EntityFrameworkCore;
using KairosWebAPI.Data;
using KairosWebAPI.DTOs;
using KairosWebAPI.Models;

namespace KairosWebAPI.Services
{
    public class TurnoService
    {
        private readonly ConnectionContext _context;

        public TurnoService(ConnectionContext context)
        {
            _context = context;
        }

        public async Task<TurnoDTO> CrearTurnoAsync(int usuarioId, int servicioId)
        {
            var usuario = await _context.Usuarios.FindAsync(usuarioId);
            var servicio = await _context.Servicios.FindAsync(servicioId);

            if (usuario == null || servicio == null)
                throw new Exception("Usuario o servicio no encontrado.");

            var ultimo = await _context.Turnos
                .Where(t => t.FechaSolicitud.Date == DateTime.Today && t.ServicioId == servicioId)
                .OrderByDescending(t => t.NumeroTurno)
                .FirstOrDefaultAsync();

            var nuevoTurno = new Turno
            {
                UsuarioId = usuarioId,
                ServicioId = servicioId,
                FechaSolicitud = DateTime.Now,
                NumeroTurno = (ultimo?.NumeroTurno ?? 0) + 1,
                Atendido = false
            };

            _context.Turnos.Add(nuevoTurno);
            await _context.SaveChangesAsync();

            return new TurnoDTO
            {
                Id = nuevoTurno.Id,
                NumeroTurno = nuevoTurno.NumeroTurno,
                FechaSolicitud = nuevoTurno.FechaSolicitud,
                Atendido = false,
                UsuarioNombre = usuario.Nombre,
                UsuarioTipo = usuario.Tipo,
                ServicioNombre = servicio.Nombre
            };
        }

        public async Task<List<TurnoDTO>> ObtenerPendientesAsync()
        {
            var turnos = await _context.Turnos
                .Include(t => t.Usuario)
                .Include(t => t.Servicio)
                .Where(t => !t.Atendido)
                .OrderBy(t => t.NumeroTurno)
                .ToListAsync();

            return turnos.Select(t => new TurnoDTO
            {
                Id = t.Id,
                NumeroTurno = t.NumeroTurno,
                FechaSolicitud = t.FechaSolicitud,
                Atendido = t.Atendido,
                UsuarioNombre = t.Usuario.Nombre,
                UsuarioTipo = t.Usuario.Tipo,
                ServicioNombre = t.Servicio.Nombre
            }).ToList();
        }

        public async Task<TurnoDTO?> ObtenerTurnoActualAsync()
        {
            var turno = await _context.Turnos
                .Include(t => t.Usuario)
                .Include(t => t.Servicio)
                .Where(t => !t.Atendido)
                .OrderBy(t => t.NumeroTurno)
                .FirstOrDefaultAsync();

            if (turno == null) return null;

            return new TurnoDTO
            {
                Id = turno.Id,
                NumeroTurno = turno.NumeroTurno,
                FechaSolicitud = turno.FechaSolicitud,
                Atendido = turno.Atendido,
                UsuarioNombre = turno.Usuario.Nombre,
                UsuarioTipo = turno.Usuario.Tipo,
                ServicioNombre = turno.Servicio.Nombre
            };
        }

        public async Task<TurnoDTO?> AvanzarTurnoAsync()
        {
            var turno = await _context.Turnos
                .Include(t => t.Usuario)
                .Include(t => t.Servicio)
                .Where(t => !t.Atendido)
                .OrderBy(t => t.NumeroTurno)
                .FirstOrDefaultAsync();

            if (turno == null) return null;

            turno.Atendido = true;
            await _context.SaveChangesAsync();

            return new TurnoDTO
            {
                Id = turno.Id,
                NumeroTurno = turno.NumeroTurno,
                FechaSolicitud = turno.FechaSolicitud,
                Atendido = true,
                UsuarioNombre = turno.Usuario.Nombre,
                UsuarioTipo = turno.Usuario.Tipo,
                ServicioNombre = turno.Servicio.Nombre
            };
        }
    }
}
