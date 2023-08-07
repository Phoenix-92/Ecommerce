using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public class CartManager:ICartManager
    {
        ICartRepository _cartrepo;
        public CartManager(ICartRepository cartRepository)
        {
            _cartrepo= cartRepository;
        }

        public async Task<string> AddToCart(UserProductIds userProductIds)
        {
            try
            {
                var Cartstatus = await _cartrepo.AddToCart(userProductIds);
                string CartProductStatus = await _cartrepo.AddToCartProducts(userProductIds);
                return CartProductStatus;
            }
            catch (Exception ex)
            {
                return "Add to cart is not called in cart manager";
            }
        }

        public async Task<List<CartProducts>> GetProductsFromCart(int UserId)
        {
            return await _cartrepo.GetProductsFromCart(UserId);
        }

        public async Task<string> UpdateCart(UpdateToCart updateToCart) 
        {
            try
            {
                var result = await _cartrepo.UpdateCart(updateToCart);
                return result;
            }
            catch (Exception ex)
            {
                return "No Update call in cart manager";
            }
        }

        public async Task<string> DeleteFromCart(UserProductIds userProductIds) 
        {          
            try
            {
                return await _cartrepo.DeleteFromCart(userProductIds);
            }
            catch (Exception ex)
            {
                return "delete from cart not called in cart manager";
            }
        }
    }
}
