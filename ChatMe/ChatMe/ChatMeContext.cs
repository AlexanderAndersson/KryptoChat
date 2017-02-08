using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ChatMe
{
    public class ChatMeContext : DbContext
    {
        public ChatMeContext() : base ("name=ChatMeDb")
        { }

        public DbSet<MessageData> Messages { get; set; }
    }
}
