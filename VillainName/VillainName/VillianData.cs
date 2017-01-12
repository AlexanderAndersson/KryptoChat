using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VillainName
{
    [DataContract]
    public class VillianData
    {      
        [DataMember]
        public string VillianName { get; set; }

        public VillianData()
        {

        }
    }
}
