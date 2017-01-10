using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KryptoChat.ChatServiceReference;
using System.ServiceModel;

namespace KryptoChat.Controllers
{
    public class MessageController : Controller
    {
        ChatServiceClient client = new ChatServiceClient();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SendMessage(string pUsername, string pMessage)
        {
            Session["username"] = pUsername;
            ViewBag.Username = Session["username"];
            var myMsg = client.SaveMessage(pUsername, pMessage);
            return Json( new { Result = true });
        }

        public ActionResult GetMessage()
        {
            //var message = client.GetLatestMessage().LastOrDefault().Message;
            var latestMsg = client.GetLatestMessage();
            return Json(new { Result = latestMsg });
        }
    }
}