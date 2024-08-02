using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TesteControle;

namespace TesteControleUnitTest
{
    public class ProdutoUnitTest
    {
        [Fact]
        public void ProdutoTest()
        {
            Produto produto = new Produto();
            produto.Nome = "Tênis";
            produto.Quantidade = 1;

            var listaProdutos = new List<Produto>();
            var res = Produto.AdicionarProduto(produto, listaProdutos);
            var verificacao1 = listaProdutos.FirstOrDefault(x => x.Nome == "Tênis");

            Assert.NotNull(verificacao1);

            Produto prod1 = new Produto();
            prod1.Nome = "Tênis";

            res = Produto.AdicionarProduto(prod1, listaProdutos);
            var verificacao2 = listaProdutos.FirstOrDefault(x => x.Nome == "Tênis");

            Assert.Equal(2, verificacao2!.Quantidade);

            var ver3 = listaProdutos.FirstOrDefault(x => x.Nome == "Tênis");

            Assert.NotNull(ver3);
        } 
    }
}
