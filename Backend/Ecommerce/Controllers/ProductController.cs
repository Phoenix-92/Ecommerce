using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductManager _prodManager;
        public ProductController(IProductManager productManager)
        {
            _prodManager = productManager;
        }

        [HttpGet("get-all-products")]
        public async Task<ActionResult<IList<Products>>> GetAllProducts()
        {
            try
            {

                var Result = await _prodManager.GetProducts();
                return Ok(Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("get-product-by-id")]
        public async Task<ActionResult<IList<Products>>> GetProductById(int id)
        {
            try
            {
                var Result = await _prodManager.GetProductsById(id);
                return Ok(Result[0]);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }


    }
}
