namespace KairosWebAPI.Models
{
    public class Turno
    {
        public int Id { get; set; }
        public int NumeroTurno { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public bool Atendido { get; set; }

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public int ServicioId { get; set; }
        public Servicio Servicio { get; set; }
    }
}
