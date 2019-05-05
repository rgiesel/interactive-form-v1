//Set focus on the first text field when page loads
$(document).ready( function() {
  $('#name').focus();
  //Hides the "other" job role input field when page loads
  $('#other-title').hide();
  //Hides the t-shirt color select menu when page loads
  $('#color').hide();
  //Color field displays text requesting that user selects a t-shirt theme
  $('#colors-js-puns label').text('Color: Please select a T-shirt theme');
  /* Selects the credit card payment method by default and hides the bitcoin
     and paypal divs */
  $('#payment').val('credit card');
  $('#credit-card').next().hide();
  $('#credit-card').next().next().hide();
  /* Disables the "select payment method" option from the payment method menu,
     forcing the user to select a valid payment method. */
  $('#payment option').eq(0).attr('disabled', true);
});

// Creates red error messages for invalid user inputs and hides them initially
$('#name').before('<p id="name-error">Please enter a valid name</p>');
$('#name-error').css('color', 'red').hide();

$('#mail').before('<p id="email-error">Please enter a valid email address</p>');
$('#email-error').css('color', 'red').hide();

$('legend').eq(2).after('<p id="activities-error">Please choose at least one activity<br><br></p>');
$('#activities-error').css('color', 'red').hide();

$('#cc-num').after('<p id="cc-error"></p>');
$('#cc-error').css('color', 'red').hide();

$('#zip').after('<p id="zip-error">Please enter a valid zip code</p>');
$('#zip-error').css('color', 'red').hide();

$('#cvv').after('<p id="cvv-error">Please enter a valid 3-digit CVV</p>');
$('#cvv-error').css('color', 'red').hide();

/* Creates an element to display the total cost of the selected activities and
   hides it initially */
const total = '<p id="total">Total: </p>'
$('.activities').append(total);
$('#total').hide();

/* Reveals the "other" job role input field when "other" is selected from the
  job role dropdown menu, else the "other" job role input field is hidden */
$('#title').change( function() {
  if ( $('#title').val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

/* Displays only the t-shirt color options that match the design selected
  in the t-shirt "design" menu. Hides the color select menu if
  a t-shirt design has not been selected. When a t-shirt design is selected,
  a color value that matches that design is automatically selected */
  $('#design').change( function() {
    if ( $('#design').val() === 'js puns') {
      $('#color').show();
      $('#color option').filter(':eq(0), :eq(1), :eq(2)').show();
      $('#color option').filter(':eq(3), :eq(4), :eq(5)').hide();
      $('#color').val("cornflowerblue");
      $('#colors-js-puns label').text('Color:');
    } else if ( $('#design').val() === 'heart js') {
        $('#color').show();
        $('#color option').filter(':eq(0), :eq(1), :eq(2)').hide();
        $('#color option').filter(':eq(3), :eq(4), :eq(5)').show();
        $('#color').val("tomato");
        $('#colors-js-puns label').text('Color:');
    } else {
      $('#color').hide();
      $('#colors-js-puns label').text('Color: Please select a T-shirt theme');
    }
  });

  /* When an activities registration checkbox is checked, activities with
     conflicting times are greyed out and their checkboxes disabled */
$('input:checkbox').eq(1).on('click', function() {
  if ( $(this).prop('checked') ) {
    $('input:checkbox').eq(3).parent().css('color', 'grey');
    $('input:checkbox').eq(3).attr('disabled', true);
  } else {
    $('input:checkbox').eq(3).parent().css('color', 'black');
    $('input:checkbox').eq(3).attr('disabled', false);
  }
});

$('input:checkbox').eq(3).on('click', function() {
  if ( $(this).prop('checked') ) {
    $('input:checkbox').eq(1).parent().css('color', 'grey');
    $('input:checkbox').eq(1).attr('disabled', true);
  } else {
    $('input:checkbox').eq(1).parent().css('color', 'black');
    $('input:checkbox').eq(1).attr('disabled', false);
  }
});

$('input:checkbox').eq(2).on('click', function() {
  if ( $(this).prop('checked') ) {
    $('input:checkbox').eq(4).parent().css('color', 'grey');
    $('input:checkbox').eq(4).attr('disabled', true);
  } else {
    $('input:checkbox').eq(4).parent().css('color', 'black');
    $('input:checkbox').eq(4).attr('disabled', false);
  }
});

$('input:checkbox').eq(4).on('click', function() {
  if ( $(this).prop('checked') ) {
    $('input:checkbox').eq(2).parent().css('color', 'grey');
    $('input:checkbox').eq(2).attr('disabled', true);
  } else {
    $('input:checkbox').eq(2).parent().css('color', 'black');
    $('input:checkbox').eq(2).attr('disabled', false);
  }
});

// Assigns a cost attribute to each activity based on its cost in dollars
$('input:checkbox').eq(0).attr('cost', 200);
$('input:checkbox:gt(0)').attr('cost', 100);

/* Creates a function to calculate and display total cost of the selected
   activities. If the total is 0, the "total" display is hidden.  */
const calculateTotal = function() {
  let totalCost = 0;
  $('input:checkbox').each( function() {
    if ($(this).prop('checked') === true) {
      totalCost += parseInt($(this).attr('cost'));
    }
  });
  $('#total').text('Total: $' + totalCost);
  if (totalCost === 0) {
    $('#total').hide();
  } else {
    $('#total').show();
  }
}

//Calls the calculateTotal function when an activities checkbox is clicked.
$('input:checkbox').click(calculateTotal);

/* When a payment method is selected, the matching div is displayed and divs
   for other payment methods are hidden. If no payment method is selected,
   none of the payment method divs will be displayed */
$('#payment').on('change', function() {
  $('#credit-card').hide();
  $('#credit-card').next().hide();
  $('#credit-card').next().next().hide();
  if ( $('#payment').val() === 'credit card' ) {
    $('#credit-card').show();
  } else if ( $('#payment').val() === 'paypal' ) {
    $('#credit-card').next().show();
  } else if ( $('#payment').val() === 'bitcoin' ) {
    $('#credit-card').next().next().show();
  }
});

/* Creates event listeners to display error messages and prevent form
   submission if any input validation errors exist */
$('form').on('submit', function(event) {
  if ((/^\w+$/).test($('#name').val()) === false) {
    event.preventDefault();
    $('#name-error').show();
  } else {
    $('#name-error').hide();
  }
});

$('form').on('submit', function(event) {
  if ($('input:checked').length === 0) {
    event.preventDefault();
    $('#activities-error').show();
  } else {
    $('#activities-error').hide();
  }
});

$('form').on('submit', function(event) {
  if ($('#payment').val() === 'credit card'
      && (/^\d{5}$/).test($('#zip').val()) === false) {
    event.preventDefault();
    $('#zip-error').show();
  } else {
    $('#zip-error').hide();
  }
});

$('form').on('submit', function(event) {
  if ($('#payment').val() === 'credit card'
      && (/^\d{3}$/).test($('#cvv').val()) === false) {
    event.preventDefault();
    $('#cvv-error').show();
  } else {
    $('#cvv-error').hide();
  }
});

/* Creates an event listener for credit card validation that responds with one
   of two different error messages, depending on the user input */
$('form').on('submit', function(event) {
  if ($('#payment').val() === 'credit card'
      && $('#cc-num').val() === "") {
        event.preventDefault();
        $('#cc-error').text('Please enter a credit card number');
        $('#cc-error').show();
      } else if ($('#payment').val() === 'credit card'
        && (/^\d{13,16}$/).test($('#cc-num').val()) === false) {
          event.preventDefault();
          $('#cc-error').text('Please enter a number that is between 13 and 16 digits long');
          $('#cc-error').show();
      } else {
          $('#cc-error').hide();
  }
});

/* Creates a function for email validation and event listeners for both
   submission and keyup */
const emailValidate = function(event) {
     if ((/^\S+\@\S+\.\S+$/).test($('#mail').val()) === false) {
       event.preventDefault();
       $('#email-error').show();
     } else {
       $('#email-error').hide();
     }
}

$('form').on('submit', emailValidate);

$('form').on('keyup', emailValidate);
