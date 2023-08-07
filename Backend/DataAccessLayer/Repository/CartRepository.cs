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
    public class CartRepository:ICartRepository
    {
        IDBConnection _connection;
        public CartRepository(IDBConnection connection)
        {
            _connection = connection;
        }

        public async Task<string> AddToCart(UserProductIds userProductIds)
        {
            string sqlQuery = "EXEC FILLCART @UserId=@UserId";
            try
            {
                await _connection.RunQueryNoReturn(sqlQuery, userProductIds);
                return "Item added in cart ";
                
            }
            catch (Exception ex)
            {
                ex = new Exception("Query not executed");
                return "Error";
            }
            
            
        }
        public async Task<string> AddToCartProducts(UserProductIds userProductIds)
        {
            string sqlQuery = $"EXEC FILLCARTPRODUCTS @productid=@ProductId,@userid=@UserId;";
            try
            {
                await _connection.RunQueryNoReturn(sqlQuery, userProductIds);
                return "Item added in CartProducts";

            }
            catch (Exception ex)
            {
                ex = new Exception("Query not executed");
                return "Error";
            }
        }


        public async Task<List<CartProducts>> GetProductsFromCart(int UserId)
        {

            string sqlQuery = $"SELECT * FROM CARTPRODUCTS WHERE CARTID = ( SELECT CARTID FROM CART WHERE USERID=@UserId);";
            try
            {
                var result = await _connection.RunQuery<CartProducts>(sqlQuery, new { UserId });
                return result.ToList();
            }
            catch(Exception ex)
            {
                ex = new Exception("Query not executed");
                return null;
            }
            
        }

        public async Task<string> UpdateCart(UpdateToCart updateToCart)
        {
            string sqlQuery = $"EXEC UPDATECART @UserId = @UserId,@ProductId =@ProductId,@Quantity = @Quantity,@TotalAmount = @TotalAmount";
            try
            {
                await _connection.RunQueryNoReturn(sqlQuery, updateToCart);
                return "Item is updated";
            }
            catch(Exception ex)
            {
                ex = new Exception("Query not executed");
                return "Error";
            }
            
        }

        public async Task<string> DeleteFromCart(UserProductIds userProductIds)
        {
            string sqlQuery = $"EXEC DELETEFROMCART @UserId =@UserId,@ProductId=@ProductId";
            try
            {
                await _connection.RunQueryNoReturn(sqlQuery, userProductIds);
                return "Item is deleted from cart";
            }
            catch(Exception ex)
            {
                ex = new Exception("Query not executed");
                return "Error";
            }
            
        }
    }
}
