using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Products
    {
        public int ProductID { get; set; }
        public string Title { get; set; }

        public string Image { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public float Rating { get; set; }
    }
}
