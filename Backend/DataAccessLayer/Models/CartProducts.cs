using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class CartProducts
    {
        public int CartProductID { get; set; }
        public int CartID { get; set; }
        public int ProductID { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int TotalAmount { get; set; }
    }
}
