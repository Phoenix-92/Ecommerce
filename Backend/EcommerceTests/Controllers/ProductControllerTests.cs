using Microsoft.VisualStudio.TestTools.UnitTesting;
using BussinessLayer.Interfaces;
using Moq;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers.Tests
{
    [TestClass()]
    public class ProductControllerTests
    {
        private Mock<IProductManager>? _productManagerMock;
        private ProductController? _productController;

        [TestInitialize]
        public void Setup()
        {
            _productManagerMock = new Mock<IProductManager>();
            _productController = new ProductController(_productManagerMock.Object);
        }

        [TestMethod()]
        public async Task GetAllProducts_ReturnsOkResult()
        {
            // Arrange
            var expectedProducts = new List<Products>
            {
                new Products
                {
                    Description="d1",Category="d",Image="d",Price=100,ProductID=10,Rating=1,Title="d"
                },
                new Products
                {
                    Description="d2",Category="d",Image="d",Price=100,ProductID=10,Rating=1,Title="d"
                }
            };
            _productManagerMock?.Setup(p => p.GetProducts()).ReturnsAsync(expectedProducts);


            // Act
            var result = await _productController.GetAllProducts();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreNotEqual(expectedProducts, result);

        }

        [TestMethod()]
        public async Task GetAllProducts_ReturnsBadRequest_WhenExceptionOccurs()
        {
            // Arrange
            var expectedErrorMessage = "An error occured";
            _productManagerMock?.Setup(p => p.GetProducts()).ThrowsAsync(new Exception(expectedErrorMessage));

            // Act
            var result = await _productController.GetAllProducts(); 
            
            // Assert
            Assert.IsInstanceOfType(result, typeof(Exception));
        }


    }
}