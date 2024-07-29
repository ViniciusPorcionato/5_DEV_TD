﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace minimalAPIMongoDB.Domains
{
    public class User
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("email")]
        public string? Email { get; set; }

        [BsonElement("senha")]
        public string? Senha { get; set; }

        public Dictionary<string, string> AdditionalAttributes { get; set; }

        public User()
        {
            AdditionalAttributes = new Dictionary<string, string>();
        }

    }
}
