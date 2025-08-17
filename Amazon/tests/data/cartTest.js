import { addToCart,cart,loadFromStorage,removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => 
{
  beforeEach(() => 
  {
    spyOn(localStorage, 'setItem');
  });

  it('adds existing product to the cart', () => 
  {
    spyOn(localStorage, 'getItem').and.callFake(() => 
    {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => 
  {
    spyOn(localStorage, 'getItem').and.callFake(() => 
    {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});
describe('test suite: removeFromCart', () => 
{
  beforeEach(() => 
  {
    spyOn(localStorage,'setItem');
  });

  it('remove a productId that is in the cart', () => 
  {
    spyOn(localStorage,'getItem').and.callFake(() => 
    {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 3,
        deliveryOptionId: '2'
      },{
        productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();

    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });
  
  it('remove a productId that is not in the cart', () => 
  {
    spyOn(localStorage,'getItem').and.callFake(() => 
    {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 3,
        deliveryOptionId: '2'
      },{
        productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();

    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85873d');
    expect(cart.length).toEqual(cart.length);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3,
      deliveryOptionId: '2'
    },{
      productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });
});

describe('test suite: updateDeliveryOption',() => 
{
  beforeEach(() => 
  {
    spyOn(localStorage,'setItem');
  });
  
  it('update the delivery option for a product in the cart', () => 
  {
    spyOn(localStorage,'getItem').and.callFake(() => 
    {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 3,
        deliveryOptionId: '2'
      },{
        productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();

    updateDeliveryOption('8c9c52b5-5a19-4bcb-a5d1-158a74287c53','1');
    expect(cart[2].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3,
      deliveryOptionId: '2'
    },{
      productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });

  it('update a productId that is not in the cart', () => 
  {
    spyOn(localStorage,'getItem').and.callFake(() => 
    {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    updateDeliveryOption('8c9c52b5-5a19-4bcb-a5d1-158a74927c53','2');
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});