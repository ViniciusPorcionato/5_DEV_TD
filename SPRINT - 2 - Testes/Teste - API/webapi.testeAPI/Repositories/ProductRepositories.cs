using webapi.testeAPI.Context;
using webapi.testeAPI.Domains;
using webapi.testeAPI.Interface;

namespace webapi.testeAPI.Repositories
{
    public class ProductRepositories : IProduct
    {

        private readonly testeAPIContext testeAPIContext;

        public ProductRepositories()
        {
            testeAPIContext = new testeAPIContext();
        }

        public void Atualizar(Guid id, Product product)
        {
            Product productFind = testeAPIContext.Product.Find(id)!;

            if (productFind != null)
            {
                productFind.Name = product.Name;
                productFind.Price = product.Price;
            }

            testeAPIContext.Update(productFind!);
            testeAPIContext.SaveChanges();
        }

        public Product BuscarPorId(Guid id)
        {
            try
            {
                return testeAPIContext.Product.Find(id)!;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(Product newProduct)
        {
            try
            {
                testeAPIContext.Product.Add(newProduct);
                testeAPIContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Product produtcFind = testeAPIContext.Product.Find(id)!;

                if (produtcFind != null)
                {
                    testeAPIContext.Product.Remove(produtcFind);
                }

                testeAPIContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Product> ListarTodos()
        {
            try
            {
                return testeAPIContext.Product.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
