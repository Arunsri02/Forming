$(document).ready(function() {
  // Function to update the cart count, total, and toggle "Checkout" button
  function updateCartStatus() {
      const count = $('.cart-item').length; // Get the number of items in the cart
      $('#cartCount').text(count); // Update the text with the count
      updateCartTotal(); // Update the total cost of the cart

      // Show/hide the "Checkout" button based on item count
      if (count > 0) {
          $('.check-out').show(); // Show checkout button when there's at least one item
      } else {
          $('.check-out').hide(); // Hide checkout button when cart is empty
      }
  }

  // Function to update the total price
  function updateCartTotal() {
      let total = 0;
      $('.cart-item').each(function() {
          const price = parseFloat($(this).find('.cart-item-price').text().replace(/[^0-9.]/g, '')); // Ensure price is extracted as a number
          const quantity = parseInt($(this).find('.quantity').val()); // Get the quantity
          total += price * quantity; // Calculate the total for this item
      });
      $('#cartTotal').html(`<strong> Total: &#8377; ${total.toFixed(2)} </strong>`); // Display the total in a proper format
  }

  // Add to cart button click event
  $('.add-to-cart').click(function() {
      const item = $(this).closest('.item');
      const name = item.find('h5').text();
      const price = item.find('.price').text();
      const imageSrc = item.find('img').attr('src');
      addToCart(name, price, imageSrc);
  });

  // Remove item from cart
  $('.cart-items').on('click', '.remove-item', function() {
      $(this).closest('.cart-item').remove();
      updateCartStatus(); // Update cart status when an item is removed
  });

  // Change quantity of an item in the cart
  $('.cart-items').on('change', '.quantity', function() {
      updateCartTotal(); // Update cart status when quantity changes
  });

  // Function to add item to cart
  function addToCart(name, price, imageSrc) {
      $('.cart-items').append(`
        <li class="cart-item d-flex align-items-start">
          <img src="${imageSrc}" alt="${name}" class="cart-item-img mr-sm-5">
          <div class="cart-item-info">
            <p class="cart-item-name mr-sm-5">${name}</p>
            <p class="cart-item-price">${price}</p>
          </div>
          <div class="cart-item-quantity">
            <input type="number" class="quantity col-6 col-xs-1" value="1" min="1">
            <button class="remove-item"><i class="fas fa-trash"></i></button>
          </div>
        </li>
      `);
      updateCartStatus(); // Update cart status when an item is added
  }

  // Open panel button click event
  $('#openPanelBtn').click(function() {
      var sidePanel = $('#sidePanel');
      if (sidePanel.css('right') === '0px') {
          sidePanel.css('right', '-700px'); // Hide panel
      } else {
          sidePanel.css('right', '0'); // Open panel
      }
  });

  // Close panel button click event
  $('#closePanelBtn').click(function() {
      $('#sidePanel').css('right', '-700px');
  });

  // Initialize cart status
  updateCartStatus(); // Ensure correct state on page load
});
