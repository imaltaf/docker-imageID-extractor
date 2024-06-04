const inputText = document.getElementById('inputText');
const outputForm = document.getElementById('outputForm');
const outputContainer = document.getElementById('outputContainer');
const tbody = outputForm.querySelector('tbody');

inputText.addEventListener('input', function() {
  const lines = inputText.value.trim().split('\n');
  const rows = lines.map(line => {
    const columns = line.trim().split(/\s{2,}/);
    if (columns.length >= 5) {
      const repository = columns[0];
      const tag = columns[1];
      const imageId = columns[2];
      const created = columns[3];
      const size = columns[4];

      if (/^[a-f0-9]{12}$/.test(imageId)) {
        return `
          <tr>
            <td><input type="checkbox" value="${imageId}"></td>
            <td>${repository}</td>
            <td>${tag}</td>
            <td>${imageId}</td>
            <td>${created}</td>
            <td>${size}</td>
          </tr>
        `;
      }
    }
    return '';
  });

  tbody.innerHTML = rows.join('');
  outputContainer.style.display = 'flex';
});

document.getElementById('convertButton').addEventListener('click', function() {
  const checkedBoxes = document.querySelectorAll('#outputForm input:checked');
  const imageIds = Array.from(checkedBoxes).map(box => box.value).join(' ');
  const commandText = `sudo docker rmi -f ${imageIds}`;

  // Create a paragraph element with the command text
  const commandElement = document.createElement('p');
  commandElement.textContent = commandText;

  // Clear previous output and append the new command element
  outputForm.innerHTML = ''; // Clear the table
  outputForm.appendChild(commandElement);

  // Copy the command to the clipboard
  navigator.clipboard.writeText(commandText).then(() => {
    // Update the convert button text to indicate success
    const convertButton = document.getElementById('convertButton');
    convertButton.textContent = 'Auto Copied to Clipboard!';
    setTimeout(() => {
      convertButton.textContent = 'Convert';
    }, 2000); // Reset button text after 2 seconds

    // Reset input and hide output container after 10 seconds
    setTimeout(() => {
      inputText.value = '';
      outputContainer.style.display = 'none';
    }, 10000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});

document.getElementById('copyButton').addEventListener('click', function() {
  const outputText = document.querySelector('#outputForm p')?.textContent || '';
  navigator.clipboard.writeText(outputText).then(() => {
    // Update the copy button text to indicate success
    const copyButton = document.getElementById('copyButton');
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy to Clipboard';
    }, 2000); // Reset button text after 2 seconds

    // Reset input and hide output container after 10 seconds
    setTimeout(() => {
      inputText.value = '';
      outputContainer.style.display = 'none';
    }, 10000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});
