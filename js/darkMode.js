// Function to toggle dark mode
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    // Save the preference
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
}

// Function to initialize dark mode based on saved preference or system preference
function initializeDarkMode() {
    // Check for saved user preference
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode) {
        // If there's a saved preference, use it
        if (savedMode === 'dark') {
            document.documentElement.classList.add('dark');
        }
    } else {
        // If no saved preference, check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'dark');
        }
    }
}

// Add event listeners for dark mode toggles
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    initializeDarkMode();

    // Add click event listeners to both desktop and mobile dark mode toggles
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }

    // Listen for system dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {  // Only if user hasn't set a preference
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
}); 