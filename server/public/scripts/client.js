console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  // EVENT HANDLERS
  $(document).on('click', '#submitOperation', onSubmit);
  $(document).on('click', '.operationButton', setOperation);
  $(document).on('click', '#clearButton', clearEntries);
});

let operation = ''; // holds the operation

function onSubmit(event) {
  event.preventDefault(); // prevent page from refreshing
  console.log('in onSubmit() ');

  let x = $('#xInput').val();
  let y = $('#yInput').val();
  console.log('x, ', x);
  console.log('y, ', y);

  let operationData = {
    x: x,
    y: y,
    operation: operation,
  };

  // PUSHING DATA TO POST
  $.ajax({
    url: '/logoperations',
    method: 'POST', // POST METHOD
    data: {
      data_to_add: operationData,
    },
  })
    .then(function (response) {
      console.log('A response ocurred: ', response);
    })
    .catch(function (error) {
      console.log('An error ocurred: ', error);
    });
} // end onSubmit

function setOperation(event) {
  event.preventDefault(); // prevent page from refreshing
  console.log('in setOperation() ');
  console.log($(this).data('operation'));
  operation = $(this).data('operation');
}

function clearEntries() {
  console.log('in clearEntries() ');
  $('#xInput').val('');
  $('#yInput').val('');
}
