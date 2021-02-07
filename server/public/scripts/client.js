console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  // EVENT HANDLERS
  $(document).on('click', '#submitOperation', onSubmit);
  $(document).on('click', '.numberButton', setNumber);
  $(document).on('click', '.operationButton', setOperation);
  $(document).on('click', '#clearButton', clearEntries);
});

let operation = ''; // holds the operation
let x = '';
let y = '';

function setNumber(event) {
  event.preventDefault();
  console.log('setting number');
  /*
    This function concatenates a string up to X up to the point of having an operator. 
    If we have an operator we concatenate to Y until the onSubmit button is clicked. 
    This functions like an old school calculator. 
  */
  if (!operation) {
    x += $(this).data('number');
    $('#expressionContainer').val(`${x}`);
  } else {
    y += $(this).data('number');
    $('#expressionContainer').val(`${y}`);
  }
}

function getHistoryData() {
  /*
    Makes a GET request to /logoperations to receive response and then call renderToDom
  */
  $.ajax({
    url: '/logoperations',
    method: 'GET', // GET METHOD
  })
    .then(function (response) {
      console.log('A GET response ocurred: ', response);
      renderToDom(response);
    })
    .catch(function (error) {
      console.log('An error ocurred: ', error);
    });
}

function renderToDom(historyData) {
  /*
    Renders all dynamic elements like history of user inputs to DOM
  */
  console.log('rendering to DOM');
  console.log(historyData);

  $('#historyTableBody').empty();
  $('#expressionContainer').empty();

  // renders each object within the array
  for (let i = 0; i < historyData.length; i++) {
    let history = historyData[i];
    console.log(history);
    /*
      historyData OBJECT should look like 
      {
        x: 
        y: 
        operation: 
        result:
      }
  */
    $('#historyTableBody').append(`
              <tr>
                  <td>${history.x}</td>
                  <td>${history.operation}</td>
                  <td>${history.y}</td>
                  <td>${history.result}</td>
              </tr>
          `);
  }
  // Place the last historyData value into the input
  $('#expressionContainer').val(
    `${historyData[historyData.length - 1].result}`
  );
  // Set X to the result, TODO - find a better place to put this
  x = historyData[historyData.length - 1].result;
  y = '';
} // end renderToDom

// BUTTON EVENTS
function onSubmit(event) {
  /*
    button.click event which passes the input values to server using POST to /logoperations
    which then stores the data and is only retrieved using the GET to /logoperations
  */
  event.preventDefault(); // prevent page from refreshing
  console.log('in onSubmit() ');

  // LEGACY CODE FROM BASE MODE
  // let x = $('#xInput').val();
  // let y = $('#yInput').val();

  console.log('x, ', x);
  console.log('y, ', y);

  let operationData = {
    // Currently come in as strings, but need to be converted to numbers
    x: Number(x),
    y: Number(y),
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
      console.log('A POST response ocurred: ', response);
    })
    .catch(function (error) {
      console.log('An error ocurred: ', error);
    });
  getHistoryData();
} // end onSubmit

function setOperation(event) {
  event.preventDefault(); // prevent page from refreshing
  console.log('in setOperation() ');
  console.log($(this).data('operation'));
  operation = $(this).data('operation');
} // end setOperation

function clearEntries() {
  console.log('in clearEntries() ');
  // LEGACY CODE
  // $('#xInput').val('');
  // $('#yInput').val('');
  x = '';
  y = '';
  $('#expressionContainer').val('');
} // end clearEntries
