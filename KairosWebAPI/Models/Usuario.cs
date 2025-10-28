using System.ComponentModel.DataAnnotations;

namespace KairosWebAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(30)]
        public string Tipo { get; set; }

        [Required]
        [RegularExpression(@"^\d{7,10}$", ErrorMessage = "El número de documento debe tener entre 7 y 10 dígitos numéricos.")]
        [StringLength(10, MinimumLength = 7)]
        public string Documento { get; set; }
        public ICollection<Turno> Turnos { get; set; } = new List<Turno>();
    }
}
