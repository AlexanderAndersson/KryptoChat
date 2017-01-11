using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KryptoChat.ChatServiceReference;
using System.ServiceModel;
using System.Diagnostics;

namespace KryptoChat.Controllers
{
    public class MessageController : Controller
    {
        ChatServiceClient client = new ChatServiceClient();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SendMessage(string pUsername, string pMessage, string pKey)
        {
            Session["username"] = pUsername;
            pKey = "burrito";
            var myMsg = client.SaveMessage(pUsername, pMessage, pKey);
            return Json( new { Result = true });
        }

        public ActionResult GetMessage(string pKey, string pMessagesToGet)
        {
            //var message = client.GetLatestMessage().LastOrDefault().Message;
            if (string.IsNullOrWhiteSpace(pMessagesToGet))
                pMessagesToGet = "5";

            var latestMsg = client.GetLatestMessage(pMessagesToGet);


            foreach (var message in latestMsg)
            {
                if (pKey.ToLower() != message.Key.ToLower())
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
    }
}