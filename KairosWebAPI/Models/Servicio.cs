namespace KairosWebAPI.Models
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public ICollection<Turno> Turnos { get; set; } = new List<Turno>();
    }
}
