using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public interface IProductManager
    {
        Task<List<Products>> GetProducts();
        Task<List<Products>> GetProductsById(int id);
    }
}
