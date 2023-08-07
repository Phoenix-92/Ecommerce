using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Order
    {
        public int UserID { get; set; }
        public string PaymentType { get; set; }
        public int TotalPayment { get; set; }
        public string PaymentDetails { get; set; }
    }
}
