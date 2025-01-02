document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const loadUrlButton = document.getElementById('loadUrl');
    const urlBtn = document.getElementById('urlBtn');
    const fileBtn = document.getElementById('fileBtn');
    const fileGroup = document.getElementById('fileGroup');
    const urlGroup = document.getElementById('urlGroup');
    const content = document.getElementById('content');
    const urlInput = document.getElementById('urlInput');
    const fileInput = document.getElementById('fileInput');

    // Handle URL input and fetch the README
    loadUrlButton.addEventListener('click', function () {
        let url = urlInput.value.trim();

        if (url.includes('github.com') && url.includes('/blob/')) {
            url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }

        if (!url) {
            alert('Please enter a URL.');
            return;
        }

        fetch(url)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = marked.parse(data);
                content.style.display = 'block';
            })
            .catch(error => alert('Error loading the URL.'));
    });

    // Handle file selection and display the README
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                content.innerHTML = marked.parse(e.target.result);
                content.style.display = 'block';
            };
            reader.readAsText(file);
        }
    });

    // Directly open file input when clicking the "Choose a File" button
    fileBtn.addEventListener('click', function () {
        urlInput.value = '';
        content.innerHTML = '';
        urlInput.style.display = 'none';
        content.style.display = 'none';
        loadUrlButton.style.display = 'none';
        fileInput.click();
    });

    // Toggle between file input and URL input
    urlBtn.addEventListener('click', function () {
        urlGroup.style.display = 'flex';
        fileGroup.style.display = 'none';
        urlInput.style.display = '';
        loadUrlButton.style.display = '';
    });
});
