using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public class ProductManager:IProductManager
    {
        IProductsRepository _productrepo;
        public ProductManager(IProductsRepository productsRepository)
        {
            _productrepo= productsRepository;
        }

        public async Task<List<Products>> GetProducts()
        {
            return await _productrepo.GetProducts();
        }

        public async Task<List<Products>> GetProductsById(int id)
        {
            try
            {
                return await _productrepo.GetProductsById(id);
            }
            catch 
            {
                throw;
            }
        }
    }
}
