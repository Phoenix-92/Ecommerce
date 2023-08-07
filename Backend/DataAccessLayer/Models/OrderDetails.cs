using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class OrderDetails: Order
    {
        public int OrderID { get; set; }
        public int CartID { get; set; }

    }
}
