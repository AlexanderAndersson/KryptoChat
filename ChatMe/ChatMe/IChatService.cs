using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ChatMe
{
    [ServiceContract]
    public interface IChatService
    {
        [OperationContract]
        List<MessageData> GetLatestMessage();

        [OperationContract]
        bool SaveMessage(string Username, string Messages);

        // TODO: Add your service operations here
    }
}
