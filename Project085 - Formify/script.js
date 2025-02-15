let add = document.getElementById('submit');  // Get the add button
let output = document.getElementById('output');  // Get the output
const thingN = document.getElementById('text-input'); // Get the thingNameconst ele = document.getElementById('form-selection'); // Get the type input
const element = document.getElementById('drpdwn'); // Get the type input
// const el = document.getElementById("form-selection");
// const ele = el.options[el.selectedIndex].value;
add.addEventListener('click', function() {  
    const thing = document.createElement('div');  // Create an input element 
    const ele = element.value;
    const thingName = thingN.value;
    console.log(ele);
    if(ele == "button") {
        thing.innerHTML = `
        <button>${thingName}</button>
        `;  // Set the input's type attribute
    }else{
        thing.innerHTML = `
        <label for="${thingName}">${thingName}</label>
        <input type="${ele}" id="${thingName}" name="${thingName}" required>
        `;  // Set the input's type attribute
    }
    

    output.appendChild(thing);  // Append the input to the form
});