using webapi.testeAPI.Domains;

namespace webapi.testeAPI.Interface
{
    public interface IProduct
    {
        void Cadastrar(Product newProduct);
        List<Product> ListarTodos();
        Product BuscarPorId(Guid id);
        void Atualizar(Guid id, Product product);
        void Deletar(Guid id);
    }
}
