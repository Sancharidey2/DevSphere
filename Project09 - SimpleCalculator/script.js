function appendValue(value) {
  const display = document.getElementById('calc-display');
  display.value += value;
}

function clearDisplay() {
  const display = document.getElementById('calc-display');
  display.value = '';
}

function deleteLast() {
  const display = document.getElementById('calc-display');
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const display = document.getElementById('calc-display');
  try {
    // Use Function constructor for safer evaluation of mathematical expressions
    const sanitizedExpression = display.value.replace(/[^-()\d/*+.]/g, ''); // Allow only safe characters
    display.value = new Function(`return ${sanitizedExpression}`)();
  } catch {
    display.value = 'Error';
  }
}
