document.querySelectorAll('.transport-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove the 'clicked' class from all buttons
        document.querySelectorAll('.transport-button').forEach(btn => {
            btn.classList.remove('clicked');
        });
        
        // Add the 'clicked' class to the clicked button
        this.classList.add('clicked');
    });
});
