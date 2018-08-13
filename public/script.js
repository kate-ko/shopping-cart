var ShoppingCart = function () {

  // an array with all of our cart items
  var cartData = {cart : [{item: "peach", price: 3}, {item: "apricot", price: 5}]}

  var sumOfCart = function() {
    let sum = 0;
    for (let el of cartData.cart) {
      sum += el.price;
    }
    return sum;
  }

  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    var source = $('#cart-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(cartData);

    // append our new html to the page
    $('.cart-list').html(newHTML);
    $('.total').html(sumOfCart());
  }


  var addItem = function (item, price) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    cartData.cart.push({item:item, price: price});
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    $('.cart-list').empty();
    cartData.cart.splice(0,cartData.cart.length);
    $('.total').html(sumOfCart());
  }
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggleClass('show');
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  var item = $(this).closest('.card').data().name;
  var price = $(this).closest('.card').find('.price').text();
  var price = Number(price.replace('$','').trim());
  app.addItem(item, price);
  app.updateCart();
  $('.shopping-cart').addClass('show');
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});