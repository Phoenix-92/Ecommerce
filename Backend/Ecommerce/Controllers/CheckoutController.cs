using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        ICheckoutManager _checkoutManager;
        
        public CheckoutController(ICheckoutManager checkoutManager)
        {
            _checkoutManager = checkoutManager;
        }

        [HttpPost("add-user-details")]
        public async Task<ActionResult> AddUserDetails(Users user)
        {
            try
            {
                await _checkoutManager.AddUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<int>> Login(Login login)
        {
            try
            {
                var result = await _checkoutManager.Login(login);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user-details")]
        public async Task<ActionResult<IList<Users>>> GetUserDetailsById(int userId)
        {
            try
            {
                var result = await _checkoutManager.GetUserDetailsById(userId);
                return Ok(result[0]);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPost("add-order-details")]
        //public async ActionResult<List<Id>> AddOrderDetails(Order order)
        public async Task<ActionResult> AddOrderDetails(Order order)
        {
            var result = _checkoutManager.AddOrderDetails(order);
            return Ok(result);
        }

        [HttpPost("Add-order-products")]
        public async Task<ActionResult<string>> AddOrderProducts(Id id)
        {
            string result =  await _checkoutManager.AddOrderProducts(id);
            return Ok(result);
        }

        [HttpDelete("delete-user-cart")]
        public async Task<ActionResult> DeleteFromUserCart(UserId uid)
        {
            await _checkoutManager.DeleteFromUserCart(uid);
            return Ok();
        }

    }
}
