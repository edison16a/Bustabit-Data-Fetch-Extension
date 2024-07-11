// content.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'fetchStatistics') {
      var table = document.querySelector('table._table_4uojo_1._statsTable_71jsa_7.table.table-sm.table-borderless');
      if (table) {
        var rows = table.querySelectorAll('tbody tr');
        var data = {};
  
        rows.forEach(function(row) {
          var cells = row.querySelectorAll('td');
          if (cells.length === 3) {
            var label = cells[0].textContent.trim();
            var value = cells[2].textContent.trim();
  
            if (label === "Investors' profit") {
              data.currentProfit = value;
            } else if (label === "Investors' all-time high profit") {
              data.highWaterMark = value;
            }
          }
        });
  
        sendResponse(data);
      } else {
        sendResponse({ error: 'Table element not found' });
      }
    }
  });
  