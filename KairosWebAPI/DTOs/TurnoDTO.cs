namespace KairosWebAPI.DTOs
{
    public class TurnoDTO
    {
        public int Id { get; set; }
        public int NumeroTurno { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public bool Atendido { get; set; }

        //Relaciones con otras tablas
        public string UsuarioNombre { get; set; }
        public string UsuarioTipo { get; set; }

        public string ServicioNombre { get; set; }
    }
}
