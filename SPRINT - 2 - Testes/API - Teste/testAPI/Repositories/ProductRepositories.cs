using testAPI.Context;
using testAPI.Domain;
using testAPI.Interface;

namespace testAPI.Repositories
{
    public class ProductRepositories : IProduct
    {
        private readonly testAPIContext testAPIContext;

        public ProductRepositories()
        {
            testAPIContext = new testAPIContext();      
        }
        public void Atualizar(Guid id, Product product)
        {
            Product productFind = testAPIContext.Product.Find(id)!;

            if (productFind != null)
            {
                productFind.Name = product.Name;
                productFind.Price = product.Price;  
            }

            testAPIContext.Update(productFind!);
            testAPIContext.SaveChanges();

        }

        public Product BuscarPorId(Guid id)
        {
            try
            {
                return testAPIContext.Product.Find(id)!;
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
                testAPIContext.Product.Add(newProduct);
                testAPIContext.SaveChanges();
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
                Product produtcFind = testAPIContext.Product.Find(id)!;

                if (produtcFind != null)
                {
                    testAPIContext.Product.Remove(produtcFind);
                }

                testAPIContext.SaveChanges();
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
                return testAPIContext.Product.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
