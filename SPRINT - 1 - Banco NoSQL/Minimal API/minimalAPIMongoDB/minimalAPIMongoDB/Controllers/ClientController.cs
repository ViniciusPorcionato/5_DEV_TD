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
    public class ClientController : ControllerBase
    {
        private readonly IMongoCollection<Client> _client;

        public ClientController(MongoDbService mongoDbService)
        {
            _client = mongoDbService.GetDatabase.GetCollection<Client>("client");
        }

        [HttpGet]
        public async Task<ActionResult<List<Client>>> Get()
        {
            try
            {
                var clients = await _client.Find(FilterDefinition<Client>.Empty).ToListAsync();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post (Client newClient)
        {
            try
            {
                await _client.InsertOneAsync(newClient);
                return Ok(newClient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Delete (string id)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(x => x.Id, id);

                if (filter ==  null)
                {
                    return NotFound();
                }

                await _client.DeleteOneAsync(filter);
                return Ok(filter);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            try
            {
                var client = await _client.Find(c => c.Id == id).FirstOrDefaultAsync();
                return client == null ? NotFound() : Ok(client);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Atualizar")]
        public async Task<ActionResult> Update (Client c)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(x => x.Id, c.Id);

                if (filter == null)
                {
                    return NotFound();
                }

                await _client.ReplaceOneAsync(filter, c);
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }

}
