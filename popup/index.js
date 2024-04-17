document.addEventListener('DOMContentLoaded', function() {
    var flipCount = 1;

    // Get reference to the close icon
    var closeIcon = document.getElementById('cta-close');

    // Add click event listener to the close icon
    closeIcon.addEventListener('click', function() {
        // Close the popup
        window.close();
    });

    
});