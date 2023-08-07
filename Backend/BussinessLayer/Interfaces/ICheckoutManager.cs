using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public interface ICheckoutManager
    {
        Task AddUser(Users user);
        Task<int> Login(Login login);
        Task<List<Users>> GetUserDetailsById(int userId);
        Task AddOrderDetails(Order order);
        Task<string> AddOrderProducts(Id id);
        Task DeleteFromUserCart(UserId uid);
    }
}
