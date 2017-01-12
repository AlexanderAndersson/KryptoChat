using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace VillainName
{
    [ServiceContract]
    public interface IVillainService
    {
        [OperationContract]
        string GetVillainName();
    }
}