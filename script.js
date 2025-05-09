document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const mainContainer = document.getElementById('main-container');
  const numberForm = document.getElementById('number-form');
  const inputView = document.getElementById('input-view');
  const processingView = document.getElementById('processing-view');
  const resultView = document.getElementById('result-view');
  const processingText = document.getElementById('processing-text');
  const resultValue = document.getElementById('result-value');
  const resetButton = document.getElementById('reset-button');
  const errorMessage = document.getElementById('error-message');
  const number1Input = document.getElementById('number1');
  const number2Input = document.getElementById('number2');
  
  // Form submission
  numberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    errorMessage.textContent = '';
    errorMessage.style.opacity = '0';
    
    // Get and validate input values
    const num1 = parseInt(number1Input.value);
    const num2 = parseInt(number2Input.value);
    
    if (isNaN(num1) || isNaN(num2)) {
      showError('Please enter valid integers');
      shakeInputs();
      return;
    }
    
    // Calculate result
    const result = Math.floor((num1 + num2) / 3);
    
    // Start animation sequence
    animateSequence(result);
  });
  
  // Reset button click
  resetButton.addEventListener('click', resetApp);
  
  // Input validation - only allow numbers
  [number1Input, number2Input].forEach(input => {
    input.addEventListener('keydown', (e) => {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    });
    
    // Clear error when typing
    input.addEventListener('input', () => {
      errorMessage.textContent = '';
      errorMessage.style.opacity = '0';
    });
  });
  
  // Show error message
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.opacity = '1';
  }
  
  // Shake inputs on error
  function shakeInputs() {
    const inputs = document.querySelectorAll('.wave-group');
    inputs.forEach(input => {
      input.classList.add('shake-animation');
      setTimeout(() => input.classList.remove('shake-animation'), 500);
    });
  }
  
  // Animation sequence
  async function animateSequence(result) {
    // Scale up container
    mainContainer.classList.remove('scale-down');
    mainContainer.classList.add('scale-up');
    
    // Show processing view
    inputView.style.display = 'none';
    processingView.style.display = 'flex';
    
    // Processing step 1
    processingText.textContent = 'Connecting to banking API';
    await wait(1500);
    
    // Processing step 2
    processingText.textContent = 'Authorizing';
    await wait(1500);
    
    // Processing step 3
    processingText.textContent = 'Processing calculation';
    await wait(1000);
    
    // Show result
    processingView.style.display = 'none';
    resultView.style.display = 'flex';
    resultValue.textContent = result;
    
    // Add reset button after a delay
    resetButton.style.opacity = '0';
    await wait(1000);
    resetButton.style.opacity = '1';
  }
  
  // Reset the app
  function resetApp() {
    // Reset container scale
    mainContainer.classList.remove('scale-up');
    mainContainer.classList.add('scale-down');
    
    // Hide result view, show input view
    resultView.style.display = 'none';
    inputView.style.display = 'block';
    
    // Clear inputs
    number1Input.value = '';
    number2Input.value = '';
  }
  
  // Helper function for async/await delay
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});