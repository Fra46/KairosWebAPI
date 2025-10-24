namespace KairosWebAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public int Documento { get; set; }
        public ICollection<Turno> Turnos { get; set; } = new List<Turno>();
    }
}
