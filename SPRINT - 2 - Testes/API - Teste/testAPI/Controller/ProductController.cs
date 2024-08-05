using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using testAPI.Domain;
using testAPI.Interface;
using testAPI.Repositories;

namespace testAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private IProduct productRepository;

        public ProductController()
        {
            productRepository = new ProductRepositories();
        }

        [HttpGet("ListarTodos")]
        public IActionResult Get()
        {
            try
            {
                return Ok(productRepository.ListarTodos());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorId/{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(productRepository.BuscarPorId(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public IActionResult Post(Product product)
        {
            try
            {
                productRepository.Cadastrar(product);

                return Ok(product);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("Deletar/{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                productRepository.Deletar(id);

                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpPut("Atualizar/{id}")]
        public IActionResult Put(Guid id, Product product)
        {
            try
            {
                productRepository.Atualizar(id, product);
                return Ok(product); 
            }
            catch (Exception e )
            {
                return BadRequest(e.Message);
            }
        }


    }
}
