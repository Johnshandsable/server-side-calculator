console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  // EVENT HANDLERS
  $(document).on('click', '#submitOperation', onSubmit);
  $(document).on('click', '.operationButton', setOperation);
  $(document).on('click', '#clearButton', clearEntries);
});

let operation = ''; // holds the operation

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
  */ console.log(
      $('#historyTableBody')
    );
    $('#historyTableBody').append(`
              <tr>
                  <td>${history.x}</td>
                  <td>${history.operation}</td>
                  <td>${history.y}</td>
                  <td>${history.result}</td>
              </tr>
          `);
  }
} // end renderToDom

// BUTTON EVENTS
function onSubmit(event) {
  /*
    button.click event which passes the input values to server using POST to /logoperations
    which then stores the data and is only retrieved using the GET to /logoperations
  */
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
}

function clearEntries() {
  console.log('in clearEntries() ');
  $('#xInput').val('');
  $('#yInput').val('');
}
