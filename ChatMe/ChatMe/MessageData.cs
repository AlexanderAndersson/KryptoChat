using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatMe
{
    [DataContract, Table("Messages")]
    public class MessageData
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Username { get; set; }

        [DataMember]
        public string Message { get; set; }

        [DataMember]
        public DateTime Timestamp { get; set; }

        public MessageData(string username, string message, DateTime timestamp)
        {
            Username = username;
            Message = message;
            Timestamp = timestamp;
        }

        public MessageData()
        {

        }

    }
}
