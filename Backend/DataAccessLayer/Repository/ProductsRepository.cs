using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataAccessLayer.DBContext;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repository
{
    public class ProductsRepository:IProductsRepository
    {
        IDBConnection _connection;
        public ProductsRepository(IDBConnection connection)
        {
            _connection = connection;
        }

        public async Task<List<Products>> GetProducts()
        {
            string sqlQuery = "SELECT * FROM Products";
            var customers = await _connection.RunQuery<Products>(sqlQuery,null);
            return customers.ToList();
        }

        public async Task<List<Products>> GetProductsById(int id)
        {
                string sqlQuery = $"SELECT * FROM PRODUCTS WHERE PRODUCTID=@id";
                var customers = await _connection.RunQuery<Products>(sqlQuery, new { id });
                if(customers.ToList().Count== 0)
                {
                    throw new Exception("Invalid Product");
                }
                return customers.ToList();   
        }
    }
}
