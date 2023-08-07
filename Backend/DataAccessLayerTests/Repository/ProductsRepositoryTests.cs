using Microsoft.VisualStudio.TestTools.UnitTesting;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.DBContext;
using Moq;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repository.Tests
{
    [TestClass()]
    public class ProductsRepositoryTests
    {
        private Mock<IDBConnection> _connection;
        private ProductsRepository _repository;

        [TestInitialize]
        public void setup() 
        { 
            _connection = new Mock<IDBConnection>();
            _repository = new ProductsRepository(_connection.Object);
        }

        [TestMethod()]
        public async Task GetProductsTest()
        {
            //ARRANGE
            var products = new List<Products>
            {
                new Products
                {
                    ProductID=1,Description="",Category="d",Image="d",Price=100,Rating=1,Title="d"
                },
                new Products
                {
                    ProductID=2,Description="d2",Category="d",Image="d",Price=100,Rating=1,Title="d"
                }
            };

            _connection.Setup(c => c.RunQuery<Products>(It.IsAny<string>(), null)).ReturnsAsync(products);

            //ACT
            var result = await _repository.GetProducts();
            //ASSERT
            Assert.IsNotNull(result);
            Assert.AreEqual(products.Count, result.Count);
            Assert.AreEqual(products[0].ProductID, result[0].ProductID);
        }

        [TestMethod()]
        public async Task GetProductsById()
        {
            var products = new List<Products>
            {
                new Products
                {
                    ProductID=1,Description="",Category="d",Image="d",Price=100,Rating=1,Title="d"
                }
            };
        }
    }
}