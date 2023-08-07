using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface ICartRepository
    {
        Task<string> AddToCart(UserProductIds userProductIds);
        Task<string> AddToCartProducts(UserProductIds userProductIds);
        Task<List<CartProducts>> GetProductsFromCart(int UserId);
        Task<string> UpdateCart(UpdateToCart updateToCart);
        Task<string> DeleteFromCart(UserProductIds userProductIds);
    }
}
