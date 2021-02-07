let storedResults = [];

// Adds to the global storedResults
function addToStoredResults(objectData) {
  storedResults.push(objectData);
  return true;
}

// Returns the global storedResults
function getStoredResults() {
  return storedResults;
}

function clearStoredResults() {
  storedResults = [];
  return true;
}

module.exports = {
  addToStoredResults,
  getStoredResults,
  clearStoredResults,
};
