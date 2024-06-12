document.getElementById('multiplicationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const hStart = parseInt(document.getElementById('hStart').value);
  const hEnd = parseInt(document.getElementById('hEnd').value);
  const vStart = parseInt(document.getElementById('vStart').value);
  const vEnd = parseInt(document.getElementById('vEnd').value);

  console.log('hStart:', hStart, 'hEnd:', hEnd, 'vStart:', vStart, 'vEnd:', vEnd); // Debugging log
  if (validateInputs(hStart, hEnd, vStart, vEnd)) {
    alert('Hello');
    generateTable(hStart, hEnd, vStart, vEnd);
  }
});

function validateInputs(hStart, hEnd, vStart, vEnd) {
  if (isNaN(hStart) || isNaN(hEnd) || isNaN(vStart) || isNaN(vEnd)) {
    alert('All inputs must be valid numbers.');
    return false;
  }
  if (hStart > hEnd || vStart > vEnd) {
    alert('Start values must be less than or equal to end values.');
    return false;
  }
  if (hStart < -50 || hEnd > 50 || vStart < -50 || vEnd > 50) {
    alert('Values must be between -50 and 50.');
    return false;
  }
  return true;
}

function generateTable(hStart, hEnd, vStart, vEnd) {
  validateInputs(hStart, hEnd, vStart, vEnd);
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML = ''; // Clear previous table

  const table = document.createElement('table');

  // Create table header
  let headerRow = table.insertRow();
  headerRow.insertCell().textContent = '';
  for (let h = hStart; h <= hEnd; h++) {
    headerRow.insertCell().textContent = h;
  }

  // Create table rows
  for (let v = vStart; v <= vEnd; v++) {
    let row = table.insertRow();
    row.insertCell().textContent = v;
    for (let h = hStart; h <= hEnd; h++) {
      row.insertCell().textContent = h * v;
    }
  }

  tableContainer.appendChild(table);
}
