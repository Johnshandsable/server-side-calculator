console.log('JS loaded');

$(document).ready(function () {
  // EVENT HANDLERS

  $(document).on('click', '#submitOperation', onSubmit);
});

function onSubmit(event) {
  event.preventDefault();
  console.log('in onSubmit() ');
  //$();
}
