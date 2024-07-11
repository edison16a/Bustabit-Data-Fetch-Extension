// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchStatistics') {
      fetch('https://bustabit.com/statistics')
        .then(response => response.text())
        .then(html => {
          // Create a temporary DOM element to parse the HTML
          var tempElement = document.createElement('div');
          tempElement.innerHTML = html;
  
          // Find the table with specific classes
          var tableElement = tempElement.querySelector('table._table_4uojo_1._statsTable_71jsa_7.table.table-sm.table-borderless');
  
          if (tableElement) {
            // Find all rows in the table body
            var rows = tableElement.querySelectorAll('tbody tr');
            let currentProfit = '';
            let highWaterMark = '';
  
            // Iterate through each row and extract data
            rows.forEach(row => {
              var cells = row.querySelectorAll('td');
              if (cells.length === 3) {
                var label = cells[0].textContent.trim();
                var value = cells[2].textContent.trim();
  
                if (label === "Investors' profit") {
                  currentProfit = value;
                } else if (label === "Investors' all-time high profit") {
                  highWaterMark = value;
                }
              }
            });
  
            sendResponse({ currentProfit, highWaterMark });
          } else {
            sendResponse({ error: 'Table element not found.' });
          }
        })
        .catch(error => {
          sendResponse({ error: 'Error fetching page: ' + error });
        });
  
      // Return true to indicate that we will send a response asynchronously
      return true;
    }
  });
  