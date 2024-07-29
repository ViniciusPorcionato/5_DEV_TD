using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using minimalAPIMongoDB.Domains;
using minimalAPIMongoDB.Services;
using MongoDB.Driver;

namespace minimalAPIMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly IMongoCollection<Product> _product;

        public ProductController(MongoDbService mongoDbService)
        {
            _product = mongoDbService.GetDatabase.GetCollection<Product>("product");
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            try
            {
                var products = await _product.Find(FilterDefinition<Product>.Empty).ToListAsync();
                return Ok(products);    
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Product newProduct)
        {
            try
            {

                await _product.InsertOneAsync(newProduct);

                return Ok(newProduct);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                var filter = Builders<Product>.Filter.Eq(x => x.Id, id);

                if (filter == null)
                {
                    return NotFound();
                }

                await _product.DeleteOneAsync(filter);
                return Ok(filter);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            try
            {
                var product = await _product.Find(p => p.Id == id).FirstOrDefaultAsync();
                return product == null ? NotFound() : Ok(product);

                //var filter = Builders<Product>.Filter.Eq(x => x.Id, id);
                //return Ok(filter);                //return Ok(filter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorNome")]
        public async Task<ActionResult> GetByName(string name)
        {
            try
            {
                var product = await _product.Find(p => p.Name!.ToLower() == name.ToLower()).ToListAsync();
                return product != null ? Ok(product) : NotFound();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("Atualizar/{id}")]
        public async Task<ActionResult> Update(Product p)
        {
            try
            {
                //buscar por id (filtro)
                var filter = Builders<Product>.Filter.Eq(x => x.Id, p.Id);

                if (filter == null)
                {
                    return NotFound();
                }

                //substituindo o objeto pelo novo objeto
                await _product.ReplaceOneAsync(filter, p);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                throw;
            }
        }

    }
}
