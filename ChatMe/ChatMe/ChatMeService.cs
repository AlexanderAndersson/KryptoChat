using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ChatMe
{
    public class ChatMeService : IChatService
    {
        ChatMeContext context = new ChatMeContext();

        public List<MessageData> GetLatestMessage()
        {
            List<MessageData> latestMessageList2 = (from m in context.Messages
                                                   orderby m.Timestamp
                                                   select m).ToList();

            latestMessageList2.Reverse();

            List<MessageData> fucku = latestMessageList2.Take(5).ToList();

            fucku.Reverse();

            return fucku;
        }

        public bool SaveMessage(string Username, string Messages, string key)
        {
            MessageData newMessage = new MessageData(Username, Messages, DateTime.Now, key);

            context.Messages.Add(newMessage);
            context.SaveChanges();

            return true;
        }
    }
}
