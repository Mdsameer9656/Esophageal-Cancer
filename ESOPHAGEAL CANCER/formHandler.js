document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const formData = new FormData(this);
        for (const [name, value] of formData.entries()) {
            console.log(name, value);
        }
        // Further processing or fetch request here
    });
});
