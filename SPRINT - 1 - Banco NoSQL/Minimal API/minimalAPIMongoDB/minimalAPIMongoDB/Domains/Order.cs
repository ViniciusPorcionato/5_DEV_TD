﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace minimalAPIMongoDB.Domains
{
    public class Order
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("date")]
        public DateTime? Date { get; set; }

        [BsonElement("status")]
        public string? Status { get; set; }

        //referencia aos produtos do pedido
        [BsonElement("productId")]
        public List<string>? ProductId { get; set; }
        public List<Product>? Products { get; set; }

        //referenciar ao cliente que fez o pedido
        [BsonElement("clientId")]
        public string? ClientId { get; set; }
        public Client? Client { get; set; } 
    }
}
