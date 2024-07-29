using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

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
        [BsonElement("productId"), BsonRepresentation(BsonType.ObjectId)]
        public ObjectId? productId { get; set; }
        public Product? Product { get; set; }

        //referenciar ao cliente que fez o pedido
        [BsonElement("clientId"), BsonRepresentation(BsonType.ObjectId)]
        public ObjectId? clientId { get; set; }
        public Client? Client { get; set; }
    }
}
