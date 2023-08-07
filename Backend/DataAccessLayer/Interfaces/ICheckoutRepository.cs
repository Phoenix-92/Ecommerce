using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface ICheckoutRepository
    {
        Task AddUser(Users user);
        Task<int> GetPass(Login login);
        Task<List<Users>> GetUserDetailsById(int userId);
        Task AddOrderDetails(Order order);
        Task<List<ProductId>> GetOrderProducts(Id id);
        Task<string> AddOrderProducts(List<ProductId> result, Id id);
        Task DeleteFromCart(UserId uid);
    }
}
