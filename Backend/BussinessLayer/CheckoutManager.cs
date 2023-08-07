using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public class CheckoutManager:ICheckoutManager
    {
        ICheckoutRepository _userrepo;

        public CheckoutManager(ICheckoutRepository checkoutRepository)
        { 
            _userrepo = checkoutRepository;
        }

        public async Task AddUser(Users user)
        {
            try
            {
                await _userrepo.AddUser(user);
            }
            catch
            {
                throw;
            }
        }
        public async Task<int> Login(Login login)
        {
            try
            {
                var result = await _userrepo.GetPass(login);
                return result;
            }
            catch 
            {
                throw;
            }
            
        }

        public async Task<List<Users>> GetUserDetailsById(int userId)
        {
            try
            {
                var result = await _userrepo.GetUserDetailsById(userId);
                return result;
            }
            catch
            {

                throw;
            }
        }

        //public List<Id> AddOrderDetails(Order order)
        public async Task AddOrderDetails(Order order)
        {
            await _userrepo.AddOrderDetails(order);
        }

        public async Task<string> AddOrderProducts(Id id)
        {
            var result=await _userrepo.GetOrderProducts(id);
            return await _userrepo.AddOrderProducts(result, id);
        }

        public async Task DeleteFromUserCart(UserId uid)
        {
            await _userrepo.DeleteFromCart(uid);
        }
    }
}
