let storedResults = [];

// Adds to the global storedResults
function addToStoredResults(objectData) {
  storedResults.push(objectData);
}

// Returns the global storedResults
function getStoredResults() {
  return storedResults;
}

module.exports = {
  addToStoredResults,
  getStoredResults,
};
