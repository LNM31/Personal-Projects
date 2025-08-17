function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() 
    {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    },

    saveToStorage() 
    {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId,value) 
    {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      if(matchingItem) {
        matchingItem.quantity += value;
      }else{
        this.cartItems.push({
          productId: productId,
          quantity: value,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) 
    {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItemscart = newCart;

      this.saveToStorage();
    },

    calculateCartQuantity() 
    {
      let quantity = 0;

      this.cartItems.forEach((cartItem) => {
        quantity += cartItem.quantity;
      }); 

      return quantity;
    },

    updateQuantity(productId,newQuantity) 
    {
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId){
          cartItem.quantity = newQuantity;
        }
      });

      saveToStorage();
    },

    updateDeliveryOption(productId,deliveryOptionId) 
    {
      let matchingItem;
      let ok = false;

      this.cartItems.forEach((cartItem) => 
      {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
          ok = true;
        }
      });

      if(ok === false) return;

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();




businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);
