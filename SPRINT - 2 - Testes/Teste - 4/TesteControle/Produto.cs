using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace TesteControle
{
    //Exercício 4: Teste de Controle de Inventário
    //Crie um teste unitário para o método AdicionarProduto que verifica se um produto(nome e quantidade) é adicionado corretamente ao inventário(se já houver um produto incrementar a quantidade, senão adicione).
    //Teste também um método para obter a quantidade de um produto buscando pelo nome.
    public class Produto
    {
        public string? Nome { get; set; }
        public int? Quantidade { get; set; }

        public static List<Produto> AdicionarProduto(Produto produto, List<Produto> produtos)
        {
            var busca = produtos.FirstOrDefault(x => x.Nome == produto.Nome);

            if (busca == null)
            {
                produtos.Add(produto);
            }
            else
            {
                busca.Quantidade += 1;
            }

            return produtos;
        }


    }
}
