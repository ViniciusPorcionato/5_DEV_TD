using Moq;
using webapi.testeAPI.Domains;
using webapi.testeAPI.Interface;
using webapi.testeAPI.Repositories;

namespace testApiUnit.Test
{
    public class ProductsTest
    {
        /// <summary>
        /// Teste para a funcionalidade de listar todos os produtos
        /// </summary>
        [Fact]
        public void Get()
        {
            //Arrange

            //Lista de produtos
            List<Product> productList = new List<Product>
            {
                new Product { IdProduct = Guid.NewGuid(), Name = "Test1" , Price = 80},
                new Product { IdProduct = Guid.NewGuid(), Name = "Test2" , Price = 150},
                new Product { IdProduct = Guid.NewGuid(), Name = "Test3" , Price = 20}
            };

            //Cria um objeto de simulação do tipo ProductRepositories
            var mockRepositories = new Mock<IProduct>();

            //Configura o método "ListarTodos" para que quando for acionado retorne a lista "mockada"
            mockRepositories.Setup(x => x.ListarTodos()).Returns(productList);

            //Act

            //Executando o método "ListarTodos" e atribuie a resposta em result
            var result = mockRepositories.Object.ListarTodos();

            //Assert

            Assert.Equal(3, result.Count);
        }

        [Fact]
        public void Post()
        {
            Product newProduct = new Product
            {
                IdProduct = Guid.NewGuid(),
                Name = "test1",
                Price = 20
            };

            List<Product> listProduct = new List<Product>();

            var mockRepositories = new Mock<IProduct>();

            mockRepositories.Setup(x => x.Cadastrar(newProduct)).Callback(new Action<Product>(x =>
            {
                listProduct.Add(newProduct);
            })).Verifiable();

            mockRepositories.Object.Cadastrar(newProduct);

            mockRepositories.Verify(x => x.Cadastrar(newProduct), Times.Once());

            Assert.True(listProduct.Count != 0);

        }

        [Fact]
        public void GetById()
        {

            var productId = Guid.NewGuid();

            //Lista de produtos
            List<Product> productList = new List<Product>
            {
                new Product { IdProduct = productId, Name = "Test1" , Price = 80},
                new Product { IdProduct = productId, Name = "Test2" , Price = 150},
                new Product { IdProduct = productId, Name = "Test3" , Price = 20}
            };

            var mockRepositories = new Mock<IProduct>();

            mockRepositories.Setup(x => x.BuscarPorId(productId)).Returns(productList.FirstOrDefault(x => x.IdProduct == productId)!);

            var result = mockRepositories.Object.BuscarPorId(productId);

            Assert.True(result != null);
        }

        [Fact]
        public void Delete()
        {

            var productId = Guid.NewGuid();

            //Lista de produtos
            List<Product> productList = new List<Product>
            {
                new Product { IdProduct = productId, Name = "Test1" , Price = 80}
            };

            var product = productList.FirstOrDefault(x => x.IdProduct == productId);

            var mockRepositories = new Mock<IProduct>();

            mockRepositories.Setup(x => x.Deletar(productId)).Callback<Guid>(x =>
            {
                productList.Remove(product!);
            }).Verifiable();

            mockRepositories.Object.Deletar(productId);

            mockRepositories.Verify(x => x.Deletar(productId), Times.Once());

            Assert.True(productList.Count == 0);

        }

        [Fact]
        public void Put()
        {

            var productId = Guid.NewGuid();

            Product product = new Product { IdProduct = productId, Name = "Tenis", Price = 42 };

            List<Product> productList = new List<Product>();

            var mockRepository = new Mock<IProduct>();

            mockRepository.Setup(x => x.Atualizar(productId, product)).Callback<Guid, Product>((id, p)
               =>
            {
                var item = productList.FirstOrDefault(x => x.IdProduct == id);

                if (item != null)
                {
                    p.Name = "Tenis";
                    p.Price = 42;
                    productList.Add(product);
                }
            }
               );



            mockRepository.Object.Atualizar(productId, product);

            Assert.Equal(product.Name, "Tenis");

        }




    }
}