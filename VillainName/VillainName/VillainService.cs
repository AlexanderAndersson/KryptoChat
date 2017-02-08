using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace VillainName
{
    public class VillainService : IVillainService
    {
        public string GetVillainName()
        {
            List<string> VillianList = new List<string>()
            {
                "Joker","Ultron","Bane","Thanos","Red Skull",
                "Loki","General Zod","Magneto","The Penguin",
                "Lex Luthor","Ra’s Al Ghul","Gorilla Grodd",
                "The Riddler","Two-Face","Venom","Zoom",
                "Killer Croc","Jigsaw","Darth Vader",
                "Boba Fett","Bullseye","Mr BadGuy","Dr Mugg",
            };
            Random rnd = new Random();

            return VillianList.ElementAt(rnd.Next(VillianList.Count));
        }
    }
}
