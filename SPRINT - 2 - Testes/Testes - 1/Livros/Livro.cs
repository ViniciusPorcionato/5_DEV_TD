using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Livros
{
    public class Livro
    {
        //      Exercício 1: Teste de Gerenciamento de Livros
        //Crie um teste unitário para o método AdicionarLivro que verifica se um livro é adicionado corretamente a uma lista de livros.
        public string? Titulo { get; set; }
        public string? Autor { get; set; }
        public string? AnoPublicacao { get; set; }

        public Livro(string titulo, string autor , string anoPublicacao)
        {
            Titulo = titulo;
            Autor = autor;  
            AnoPublicacao = anoPublicacao;
        }


    }
}
