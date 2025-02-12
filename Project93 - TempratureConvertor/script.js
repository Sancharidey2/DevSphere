document.getElementById("drop-1").value = '1';
document.getElementById("drop-2").value = "3";

var drop1 = document.querySelector('#drop-1');
var drop2 = document.querySelector('#drop-2');

function getRandomAvailableValue(excludedValue, dropdown) {
    let options = [...dropdown.options].filter(opt => opt.value && opt.value !== excludedValue);
    return options.length ? options[Math.floor(Math.random() * options.length)].value : "";
}

drop1.addEventListener('change', function () {
    if (this.value === drop2.value) {
        drop2.value = getRandomAvailableValue(this.value, drop2);
    }
});

drop2.addEventListener('change', function () {
    if (this.value === drop1.value) {
        drop1.value = getRandomAvailableValue(this.value, drop1);
    }
});

var Tmap = new Map();
Tmap.set(1.1, 0);
Tmap.set(1.2, 100);
Tmap.set(2.1, 32);
Tmap.set(2.2, 212);
Tmap.set(3.1, 273);
Tmap.set(3.2, 373);

const convert = function (from, to, temp) {
    var lower1 = Tmap.get(from + 0.1);
    var higher1 = Tmap.get(from + 0.2);
    var lower2 = Tmap.get(to + 0.1);
    var higher2 = Tmap.get(to + 0.2);

    if (lower1 === undefined || higher1 === undefined || lower2 === undefined || higher2 === undefined) {
        return "Invalid conversion";
    }


    return (((temp - lower1) / (higher1 - lower1)) * (higher2 - lower2)) + lower2;
};

var text1 = document.querySelector('#text-1');
var text2 = document.querySelector('#text-2');

text1.addEventListener('input', function () {
    var from = Number(drop1.value);
    var to = Number(drop2.value);
    text2.value = convert(from, to, Number(text1.value)).toFixed(5);
});

text2.addEventListener('input', function () {
    var from = Number(drop2.value);
    var to = Number(drop1.value);
    text1.value = convert(from, to, Number(text2.value)).toFixed(5);
});