// Define CSV file paths for each species
const csvFiles = {
  mauritiana: 'data/ziziphus_mauritiana.csv',
  jujuba: 'data/ziziphus_jujuba.csv'
};

let markerData = []; // Holds the current CSV data

// Load CSV data using PapaParse
function loadCSV(filePath) {
  Papa.parse(filePath, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      markerData = results.data;
      displayTable(markerData);
    },
    error: function(err) {
      console.error("Error loading CSV:", err);
    }
  });
}

// Display data in the table
function displayTable(data) {
  const tbody = document.querySelector('#markerTable tbody');
  tbody.innerHTML = ''; // Clear previous rows

  data.forEach(row => {
    // Check for an empty row
    if (!row.MarkerID && !row.RepeatSequence && !row.PrimerForward && !row.PrimerReverse && !row.AnnealingTemp) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.MarkerID || ''}</td>
      <td>${row.RepeatSequence || ''}</td>
      <td>${row.PrimerForward || ''}</td>
      <td>${row.PrimerReverse || ''}</td>
      <td>${row.AnnealingTemp || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Filter table rows based on search input
function filterTable() {
  const searchTerm = document.getElementById('searchBox').value.toLowerCase();
  const filteredData = markerData.filter(row => {
    // Combine searchable fields into one string
    const combined = `${row.MarkerID} ${row.RepeatSequence} ${row.PrimerForward} ${row.PrimerReverse} ${row.AnnealingTemp}`.toLowerCase();
    return combined.includes(searchTerm);
  });
  displayTable(filteredData);
}

// Event listener for species selection
document.getElementById('speciesSelect').addEventListener('change', (e) => {
  const species = e.target.value;
  loadCSV(csvFiles[species]);
  // Clear search box when switching species
  document.getElementById('searchBox').value = '';
});

// Event listener for in-page search
document.getElementById('searchBox').addEventListener('input', filterTable);

// Initial load for default species (mauritiana)
window.addEventListener('DOMContentLoaded', () => {
  loadCSV(csvFiles['mauritiana']);
});
