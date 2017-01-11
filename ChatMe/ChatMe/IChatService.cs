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
        List<MessageData> GetLatestMessage(string pMessagesToRetrieve);

        [OperationContract]
        bool SaveMessage(string Username, string Messages, string key);

        // TODO: Add your service operations here
    }
}
