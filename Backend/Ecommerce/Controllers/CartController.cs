using BussinessLayer;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        ICartManager _cartManager;
        public CartController(ICartManager cartManager)
        {
            _cartManager = cartManager;
        }

        [HttpPost("add-to-cart")]
        public async Task<ActionResult<string>> AddToCart(UserProductIds userProductIds)
        {
            try
            {
                string response = await _cartManager.AddToCart(userProductIds);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest("Not Added");
            }
        }

        [HttpGet("get-all-products-from-cart")]
        public async Task<ActionResult<IList<CartProducts>>> GetAllProductsFromCart(int UserId)
        {
            var Result = await _cartManager.GetProductsFromCart(UserId);
            return Ok(Result);
        }

        [HttpPut("edit-in-cart")]
        public async Task<ActionResult<string>> UpdateCart(UpdateToCart updateToCart)
        {
            string result = await _cartManager.UpdateCart(updateToCart);
            return Ok(result);
        }

        [HttpDelete("delete-from-cart")]

        public async Task<ActionResult<string>> DeleteFromCart(UserProductIds userProductIds)
        {
            string result = await _cartManager.DeleteFromCart(userProductIds);
            return Ok(result);
        }


    }
}
