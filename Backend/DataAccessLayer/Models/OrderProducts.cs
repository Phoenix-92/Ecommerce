using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class OrderProducts
    {
        public int OrderProductID { get; set; }
        public int ProductID { get; set; }
        public int OrderID { get; set; }
        public int TotalPayment { get; set; }
    }
}
