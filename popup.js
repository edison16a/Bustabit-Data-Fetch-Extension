// popup.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetchButton').addEventListener('click', fetchData);
  });
  
  function fetchData() {
    // Show the progress bar and hide the button
    document.getElementById('fetchButton').style.display = 'none';
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    progressBar.style.display = 'block';
    progress.style.width = '0'; // Reset the progress bar
    progress.style.animation = 'load 5s linear forwards'; // Start the animation
  
    // Simulate the loading time
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: 'fetchStatistics' }, function(response) {
        if (response && !response.error) {
          document.getElementById('currentProfitValue').textContent = response.currentProfit;
          document.getElementById('highWaterMarkValue').textContent = response.highWaterMark;
        } else {
          document.getElementById('statistics').innerHTML = '<p>Error fetching statistics.</p>';
        }
  
        // Hide the progress bar and show the button
        progressBar.style.display = 'none';
        document.getElementById('fetchButton').style.display = 'inline-block';
      });
    }, 5000); // 5 seconds
  }
  