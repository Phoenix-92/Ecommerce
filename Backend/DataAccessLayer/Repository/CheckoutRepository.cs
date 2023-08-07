using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.XPath;
using Dapper;
using DataAccessLayer.DBContext;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repository
{
    public class CheckoutRepository:ICheckoutRepository
    {
        IDBConnection _connection;
        public CheckoutRepository(IDBConnection connection)
        {
            _connection = connection;
        }

        public async Task AddUser(Users user)
        {
            
            try
            {
                string sqlQuery = "Insert into Users values (@UserName,@Password,@FirstName,@LastName,@Mobile, @Email , @Address, @State,@Country,@Pincode)";
                await _connection.RunQueryNoReturn(sqlQuery, user);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2627) 
                {
                    throw new Exception("User already existed");
                }
                else
                {
                }
            }
        } 
        public async Task<int> GetPass(Login login)
        {
            string sqlQuery = "exec GetPassword @Username=@Username,@Password=@Password";
            var result=await _connection.RunQuery<int>(sqlQuery,login);
            if (result.FirstOrDefault() == 0)
            {
                throw new Exception("Invalid Username or Password");
            }
            return result.FirstOrDefault();
        }

        public async Task<List<Users>> GetUserDetailsById(int userId)
        {
            string sqlQuery = $"SELECT * FROM USERS WHERE USERID=@UserId";
            var result = await _connection.RunQuery<Users>(sqlQuery, new { userId });
            if (result.ToList().Count == 0)
            {
                throw new Exception("Invalid User");
            }
            return result.ToList();
        }

        public async Task AddOrderDetails(Order order)
        {
            string sqlQuery = $"exec FillOrderDetails @userId=@UserID,@paymentType=@PaymentType,@totalPayment=@TotalPayment,@paymentDetails=@PaymentDetails;";
            var result=_connection.RunQueryNoReturn(sqlQuery,order);  
        }

        public async Task<List<ProductId>> GetOrderProducts(Id id)
        {
            string sqlQuery = $"exec GetCartProducts @userid=@userid";
            var result = await _connection.RunQuery<ProductId>(sqlQuery,id);
            return result.ToList();
        }

        public async Task<string> AddOrderProducts(List<ProductId> result ,Id id)
        {
            foreach (var prod in result)
            {
                string sqlQuery = $"Insert into OrderProducts values (@ProductID,@orderId)";
                await _connection.RunQueryNoReturn(sqlQuery,new { prod.ProductID, id.orderId });
            }
            return "Order Placed";
        }

        public async Task DeleteFromCart(UserId uid)
        {
            string sqlQuery = $"Delete from CartProducts where CartID= (Select CartID from Cart where UserID =@userId";
            await _connection.RunQueryNoReturn(sqlQuery, uid);
        }
    }
}
