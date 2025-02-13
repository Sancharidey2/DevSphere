
        document.getElementById('searchBar').addEventListener('input', function() {
            let filter = this.value.toLowerCase();
            let cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(filter) ? 'block' : 'none';
            });
        });
    