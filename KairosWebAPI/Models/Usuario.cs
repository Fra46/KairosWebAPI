namespace KairosWebAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; } // "Practicante", "Egresado", "Pregrado", etc.
        public string Documento { get; set; } // CC, TI, etc.
        public ICollection<Turno> Turnos { get; set; } = new List<Turno>();
    }
}
