using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KairosWebAPI.Data;
using KairosWebAPI.Models;
using KairosWebAPI.Services;
using KairosWebAPI.DTOs;

namespace KairosWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurnosController : ControllerBase
    {
        private readonly ConnectionContext _context;
        private readonly TurnoService _turnoService;

        public TurnosController(ConnectionContext context, TurnoService turnoService)
        {
            _context = context;
            _turnoService = turnoService;
        }

        // GET: api/Turnos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Turno>>> GetTurnos()
        {
            return await _context.Turnos.ToListAsync();
        }

        // GET: api/Turnos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Turno>> GetTurno(int id)
        {
            var turno = await _context.Turnos.FindAsync(id);

            if (turno == null)
            {
                return NotFound();
            }

            return turno;
        }

        // GET: api/Turnos/pendientes
        [HttpGet("pendientes")]
        public async Task<ActionResult<IEnumerable<TurnoDTO>>> GetTurnosPendientes()
        {
            var pendientes = await _turnoService.ObtenerPendientesAsync();
            return Ok(pendientes);
        }

        // GET: api/Turnos/actual
        [HttpGet("actual")]
        public async Task<ActionResult<TurnoDTO>> GetTurnoActual()
        {
            var turno = await _turnoService.ObtenerTurnoActualAsync();
            if (turno == null)
                return NotFound("No hay turnos pendientes.");
            return Ok(turno);
        }

        // POST: api/Turnos/siguiente
        [HttpPost("siguiente")]
        public async Task<ActionResult<TurnoDTO>> GetSiguienteTurno()
        {
            var turno = await _turnoService.AvanzarTurnoAsync();
            if (turno == null)
                return NotFound("No hay turnos pendientes.");
            return Ok(turno);
        }

        // GET: api/Turnos/actuales-por-servicio
        [HttpGet("actuales-por-servicio")]
        public async Task<ActionResult<IEnumerable<TurnoDTO>>> GetTurnosActualesPorServicio()
        {
            var turnos = await _turnoService.ObtenerTurnosActualesPorServicioAsync();
            return Ok(turnos);
        }

        // POST: api/Turnos/siguiente/{servicioId}
        [HttpPost("siguiente/{servicioId}")]
        public async Task<ActionResult<TurnoDTO>> AvanzarTurnoPorServicio(int servicioId)
        {
            var turno = await _turnoService.AvanzarTurnoPorServicioAsync(servicioId);
            if (turno == null)
                return NotFound($"No hay turnos pendientes para el servicio {servicioId}.");
            return Ok(turno);
        }

        // GET: api/Turnos/pendientes/{servicioId}
        [HttpGet("pendientes/{servicioId}")]
        public async Task<ActionResult<IEnumerable<TurnoDTO>>> GetPendientesPorServicio(int servicioId)
        {
            var turnos = await _turnoService.ObtenerPendientesPorServicioAsync(servicioId);
            return Ok(turnos);
        }

        // PUT: api/Turnos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTurno(int id, Turno turno)
        {
            if (id != turno.Id)
            {
                return BadRequest();
            }

            _context.Entry(turno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TurnoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Turnos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> SolicitarTurno([FromBody] TurnoRequest request)
        {
            var turno = await _turnoService.CrearTurnoAsync(request.UsuarioId, request.ServicioId);
            return Ok(turno);
        }

        // DELETE: api/Turnos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTurno(int id)
        {
            var turno = await _context.Turnos.FindAsync(id);
            if (turno == null)
            {
                return NotFound();
            }

            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TurnoExists(int id)
        {
            return _context.Turnos.Any(e => e.Id == id);
        }
    }
}
