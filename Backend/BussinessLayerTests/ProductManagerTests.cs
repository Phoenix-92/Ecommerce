using Microsoft.VisualStudio.TestTools.UnitTesting;
using BussinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using Moq;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;

namespace BussinessLayer.Tests
{
    [TestClass()]
    public class ProductManagerTests
    {
        private Mock<IProductsRepository> _productsRepo;
        private ProductManager _productManager;

        [TestInitialize]
        public void setup()
        {
            _productsRepo= new Mock<IProductsRepository>();
            _productManager = new ProductManager(_productsRepo.Object);
        }

        [TestMethod()]
        public async Task GetProductsTest()
        {
            //ARRANGE
            var products = new List<Products>
            {
                new Products
                {
                    Description="",Category="d",Image="d",Price=100,ProductID=10,Rating=1,Title="d"
                },
                new Products
                {
                    Description="d2",Category="d",Image="d",Price=100,ProductID=10,Rating=1,Title="d"
                }
            };
            _productsRepo.Setup(repo=>repo.GetProducts()).ReturnsAsync(products);
            //ACT
            var result = _productManager.GetProducts();
            //ASSERT
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Result.Count());
        }

        [TestMethod()]
        public async Task GetProductsByIdTest_ReturnsData()
        {
            //Arrange
            int id = 1;
            var product = new List<Products>
            {
                new Products
                {
                    Description="",Category="d",Image="d",Price=100,ProductID=10,Rating=1,Title="d"
                }
            };
            _productsRepo.Setup(repo=>repo.GetProductsById(id)).ReturnsAsync(product);

            //Act
            var result = _productManager.GetProductsById(id);

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Result.Count());
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public async Task GetProductsById_ThrowsException()
        {
            // Arrange
            int id = 1;
            _productsRepo.Setup(repo => repo.GetProductsById(id))
                           .ThrowsAsync(new Exception("An error occurred"));

            // Act & Assert
            await _productManager.GetProductsById(id);
        }
    }
}