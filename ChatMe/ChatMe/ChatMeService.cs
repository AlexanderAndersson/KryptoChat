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

        public IList<MessageData> GetLatestMessage()
        {
            IList<MessageData> list = new List<MessageData>();


            var latestMessageList = from m in context.Messages
                                    orderby m.Timestamp
                                    select m.Message;

            var latestUserList = from m in context.Messages
                                    orderby m.Timestamp
                                    select m.Username;

            var latestTimestampList = from m in context.Messages
                                 orderby m.Timestamp
                                 select m.Timestamp;

            string latestMsg = latestMessageList.ToList().LastOrDefault().ToString();
            string latestUser = latestUserList.ToList().LastOrDefault().ToString();
            DateTime latestTimestamp = latestTimestampList.ToList().LastOrDefault();

            MessageData latestMessage = new MessageData(latestUser, latestMsg, latestTimestamp);

            list.Add(latestMessage);

            return list;
        }

        public bool SaveMessage(string Username, string Messages)
        {
            MessageData newMessage = new MessageData(Username, Messages, DateTime.Now);

            context.Messages.Add(newMessage);
            context.SaveChanges();

            return true;
        }
    }
}
