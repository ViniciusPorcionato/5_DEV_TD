﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using minimalAPIMongoDB.Domains;
using minimalAPIMongoDB.Services;
using minimalAPIMongoDB.ViewModels;
using MongoDB.Driver;

namespace minimalAPIMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class OrderController : ControllerBase
    {
        private readonly IMongoCollection<Order> _order;
        private readonly IMongoCollection<Client> _client;
        private readonly IMongoCollection<Product> _product;

        public OrderController(MongoDbService mongoDbService)
        {
            _order = mongoDbService.GetDatabase.GetCollection<Order>("order");
            _client = mongoDbService.GetDatabase.GetCollection<Client>("client");
            _product = mongoDbService.GetDatabase.GetCollection<Product>("product");
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> Get()
        {
            try
            {
                var orders = await _order.Find(FilterDefinition<Order>.Empty).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(OrderViewModel orderViewModel)
        {
            try
            {
                Order order = new Order();
                order.Id = orderViewModel.Id;
                order.Status = orderViewModel.Status;
                order.Date = orderViewModel.Date;
                order.ProductId = orderViewModel.ProductId;
                order.ClientId = orderViewModel.ClientId;

                var client = await _client.Find(x => x.Id == order.ClientId).FirstOrDefaultAsync();

                if (client == null)
                {
                    return NotFound("Cliente não existe !");
                }

                order.Client = client;
                
                await _order.InsertOneAsync(order);

                return StatusCode(201, order);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                var filter = Builders<Order>.Filter.Eq(x => x.Id, id);

                if (filter == null)
                {
                    return NotFound();
                }

                await _order.DeleteOneAsync(filter);
                return Ok(filter);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId/{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            try
            {
                var order = await _order.Find(c => c.Id == id).FirstOrDefaultAsync();
                return order == null ? NotFound() : Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Atualizar")]
        public async Task<ActionResult> Update(Order o)
        {
            try
            {
                var filter = Builders<Order>.Filter.Eq(x => x.Id, o.Id);

                if (filter == null)
                {
                    return NotFound();
                }

                await _order.ReplaceOneAsync(filter, o);
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
