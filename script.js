// You can add interactivity to your website here
// For example, you might add a simple scroll effect or a contact form validation

// Example: Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.dropdown').forEach((dropdown) => {
    // Show dropdown menu on hover
    dropdown.addEventListener('mouseenter', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) menu.style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) menu.style.display = 'none';
    });

    // For touch devices, allow navigation on category links
    dropdown.addEventListener('click', (e) => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const isLink = e.target.tagName === 'A'; // Check if the clicked element is a link

        // Prevent default behavior only for the parent menu (if it's the link itself, allow navigation)
        if (!isLink) {
            e.preventDefault(); // Prevent navigation on parent link (Portfolio)
        }

        if (menu) {
            const isVisible = menu.style.display === 'block';
            menu.style.display = isVisible ? 'none' : 'block';
        }
    });
});


