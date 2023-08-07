using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public interface ICartManager
    {
        public Task<string> AddToCart(UserProductIds userProductIds);
        public Task<List<CartProducts>> GetProductsFromCart(int UserId);
        public Task<string> UpdateCart(UpdateToCart updateToCart);
        public Task<string> DeleteFromCart(UserProductIds userProductIds);
    }
}
