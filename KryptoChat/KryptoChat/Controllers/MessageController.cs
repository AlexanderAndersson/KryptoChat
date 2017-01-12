using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KryptoChat.ChatServiceReference;
using KryptoChat.VillainServiceReference;
using System.ServiceModel;
using System.Diagnostics;

namespace KryptoChat.Controllers
{
    public class MessageController : Controller
    {
        ChatServiceClient chatClient = new ChatServiceClient();
        VillainServiceClient villainClient = new VillainServiceClient();

        public ActionResult KryptoChat()
        {
            return View();
        }

        public ActionResult SendMessage(string pUsername, string pMessage, string pKey)
        {
            Session["username"] = pUsername;
            var myMsg = chatClient.SaveMessage(pUsername, pMessage, pKey);
            return Json( new { Result = true });
        }

        public ActionResult GetMessage(string pKey)
        {
            //var message = client.GetLatestMessage().LastOrDefault().Message;
            var latestMsg = chatClient.GetLatestMessage();

            foreach (var message in latestMsg)
            {
                if (pKey != message.Key)
                {
                    message.Message = Shuffle(message.Message);
                }
            }

            return Json(new { Result = latestMsg });
        }

        public string Shuffle(string message)
        {
            Random rnd = new Random();

            char[] array = message.ToCharArray();
            int n = array.Length;

            while (n > 1)
            {
                n--;
                int k = rnd.Next(n + 1);
                var value = array[k];
                array[k] = array[n];
                array[n] = value;
            }

            return new string(array);
        }

        public ActionResult GetVillain()
        {
            string villainName = villainClient.GetVillainName();
            return Json(new { Result = villainName });
        }
    }
}