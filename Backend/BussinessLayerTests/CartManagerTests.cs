using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using BussinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using DataAccessLayer.Interfaces;

namespace BussinessLayer.Tests
{
    [TestClass()]
    public class CartManagerTests
    {
        private Mock<ICartRepository> _mockCartRepository;
        private ICartManager _cartManager;

        [TestInitialize()]
        public void Initialize()
        {
            _mockCartRepository= new Mock<ICartRepository>();
            _cartManager = new CartManager(_mockCartRepository.Object);
        }

        [TestMethod]
        public async Task DeleteFromCart_ShouldCallCartRepositoryDeleteFromCart()
        {
            // Arrange
            var mockCartRepository = new Mock<ICartRepository>();
            var cartManager = new CartManager(mockCartRepository.Object);
            var userProductIds = new UserProductIds { UserId = 1, ProductId = 2 };

            // Act
            var result = await cartManager.DeleteFromCart(userProductIds);

            // Assert
            mockCartRepository.Verify(repo => repo.DeleteFromCart(userProductIds), Times.Once);
        }

        [TestMethod]
        public async Task DeleteFromCart_ShouldReturnCartRepositoryResult()
        {
            var expected = "Item is deleted from cart";
            var obj = new UserProductIds
            {
                ProductId = 1,
                UserId = 1,
            };
            _mockCartRepository.Setup(repo => repo.DeleteFromCart(obj)).ReturnsAsync(expected);

            var result = await _cartManager.DeleteFromCart(obj);

            Assert.AreEqual(expected,result);
        }

        [TestMethod]
        public async Task DeleteFromCart_ShouldReturnErrorMessage_WhenCartRepositoryThrowsException()
        {
            // Arrange
            var obj = new UserProductIds 
            { 
                UserId = 1, ProductId = 1
            };
            var expectedErrorMessage = "delete from cart not called in cart manager";
            _mockCartRepository.Setup(repo => repo.DeleteFromCart(obj)).ThrowsAsync(new Exception());

            // Act
            var result = await _cartManager.DeleteFromCart(obj);

            // Assert
            Assert.AreEqual(expectedErrorMessage, result);
        }

        [TestMethod]
        public async Task UpdateCart_ShouldCallUpdateCartInCartRepository()
        {
            // Arrange
            var expectedResult = "expected result";
            var obj = new UpdateToCart
            {
                ProductID = 1,
                UserID = 1,
                Quantity = 1,
                TotalAmount = 1
            };
            _mockCartRepository.Setup(x => x.UpdateCart(obj)).ReturnsAsync(expectedResult);

            // Act
            var result = await _cartManager.UpdateCart(obj);

            // Assert
            _mockCartRepository.Verify(x => x.UpdateCart(obj), Times.Once);
            Assert.AreEqual(expectedResult, result);
        }

        [TestMethod]
        public async Task UpdateCart_ShouldReturnErrorMessage_WhenUpdateCartInCartRepositoryThrowsException()
        {
            // Arrange
            var obj = new UpdateToCart
            {
                ProductID = 1,
                UserID = 1,
                Quantity = 1,
                TotalAmount = 1
            };
            _mockCartRepository.Setup(x => x.UpdateCart(obj)).ThrowsAsync(new Exception());

            // Act
            var result = await _cartManager.UpdateCart(obj);

            // Assert
            Assert.AreEqual("No Update call in cart manager", result);
        }
    }
}