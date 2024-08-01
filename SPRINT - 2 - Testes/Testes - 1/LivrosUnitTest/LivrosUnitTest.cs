using Livros;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LivrosUnitTest
{
    public class LivrosUnitTest
    {
        [Fact]
        public void AdicionarLivro()
        {
            List<Livro> biblioteca = new List<Livro>();

            var livro = new Livro("A Biblioteca da Meia-Noite", "Matt Haig", "27 setembro 2021");

            biblioteca.Add(livro);

            Assert.Contains(livro, biblioteca);
        }
    }
}
