namespace KairosWebAPI.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; } // "Practicante", "Egresado", "Pregrado", etc.
        public int Documento { get; set; } // CC, TI, etc.
    }
}
