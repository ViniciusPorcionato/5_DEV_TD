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
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _user;

        public UserController(MongoDbService mongoDbService)
        {
            _user = mongoDbService.GetDatabase.GetCollection<User>("user");
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            try
            {
                var users = await _user.Find(FilterDefinition<User>.Empty).ToListAsync();
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post (User newUser)
        {
            try
            {
                await _user.InsertOneAsync(newUser);
                return Ok(newUser);
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
                var filter = Builders<User>.Filter.Eq(x => x.Id, id);

                if (filter == null)
                {
                    return NotFound();
                }

                await _user.DeleteOneAsync(filter);
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
                var user = await _user.Find(u => u.Id == id).FirstOrDefaultAsync();
                return user == null ? NotFound() : Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }
        }

        [HttpPut("Atualizar")]
        public async Task<ActionResult> Update (User u)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, u.Id);

                if (filter == null)
                {
                    return NotFound();
                }

                await _user.ReplaceOneAsync(filter, u);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
                throw;
            }
        }

    }
}
