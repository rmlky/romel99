if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('../sw.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
  }
 // Function to fetch the predicted age from the Agify API
function fetchAgePrediction() {
    const name = document.getElementById('name-input').value.trim();
    const resultDiv = document.getElementById('result');
    const errorMessageDiv = document.getElementById('error-message');

    // Clear previous results and error messages
    resultDiv.innerHTML = '';
    errorMessageDiv.innerHTML = '';

    if (!name) {
        errorMessageDiv.innerHTML = 'Please enter a name.';
        return;
    }

    const apiUrl = `https://api.agify.io/?name=${name}`;

    // Fetch data from the Agify API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Display the predicted age if the data is valid
            if (data.age) {
                resultDiv.innerHTML = `The predicted age for the name <strong>${name}</strong> is <strong>${data.age}</strong> years old.`;
            } else {
                errorMessageDiv.innerHTML = 'Could not predict the age for the given name.';
            }
        })
        .catch(error => {
            // Handle errors in fetching the data
            errorMessageDiv.innerHTML = `Error fetching data: ${error.message}`;
        });
}
