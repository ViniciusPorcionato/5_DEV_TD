using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testAPI.Domain
{
    public class Product
    {
        [Key]
        public Guid IdProduct { get; set; } = Guid.NewGuid();

        [Column(TypeName ="VARCHAR(100)")]
        [Required(ErrorMessage ="Nome do produto obrigatório !")]
        public string? Name { get; set; }

        [Column(TypeName = "DECIMAL(12,2)")]
        [Required(ErrorMessage = "Preço do produto obrigatório !")]
        public decimal? Price { get; set; }
    }
}
