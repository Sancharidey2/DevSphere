document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const bookButton = document.getElementById("book");
    const text = document.querySelector(".text");
    const ticketPrice = 150;

    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll(".row .seat.selected");
        const selectedSeatsCount = selectedSeats.length;
        count.innerText = selectedSeatsCount;
        total.innerText = selectedSeatsCount * ticketPrice;
    }

    seats.forEach((seat) => {
        seat.addEventListener("click", () => {
            seat.classList.toggle("selected");
        });
    });

    bookButton.addEventListener("click", () => {
        updateSelectedCount();
        text.style.visibility = "visible";
    });
});
