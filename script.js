document.addEventListener('DOMContentLoaded', function () {
    // Function to check if the link corresponds to the current page URL
    function isLinkActive(linkElement) {
        const currentURL = window.location.href.split('#')[0];
        return linkElement.href === currentURL || linkElement.href === currentURL + '#';
    }

    const links = document.querySelectorAll('.barlink');

    // Loop through each link and check if it's the active page
    links.forEach(link => {
        if (isLinkActive(link)) {
            link.classList.add('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const locationFilters = document.querySelectorAll('.location-filter');

    // Reset lightbox on page load
    resetLightbox();

    // Add click event listeners to location filters
    locationFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const selectedLocation = filter.getAttribute('data-location');
            filterPhotos(selectedLocation);
            locationFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
        });
    });

    // Add event listeners to photos
    photos.forEach(photo => {
        const img = photo.querySelector('img');
        const description = img.getAttribute('data-description');

        photo.addEventListener('click', () => openLightbox(img.src, description));
        photo.addEventListener('mouseover', () => showDescription(photo));
        photo.addEventListener('mouseout', () => hideDescription(photo));
    });

    // Function to reset the lightbox
    function resetLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightboxDesc.textContent = '';
        document.body.style.overflow = 'auto'; // Restore scrolling when the lightbox is closed
    }

    // Function to filter photos based on the selected location
    function filterPhotos(location) {
        photos.forEach(photo => {
            const photoLocation = photo.getAttribute('data-location');
            if (location === 'all' || photoLocation === location) {
                photo.style.display = 'block';
            } else {
                photo.style.display = 'none';
            }
        });
    }

    // Function to handle lightbox behavior when a photo is clicked
    function openLightbox(imageUrl, description) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imageUrl;
        lightboxDesc.textContent = description;

        // Prevent scrolling when the lightbox is open
        document.body.style.overflow = 'hidden';

        // Reset image size and calculate appropriate dimensions
        lightboxImg.style.width = 'auto';
        lightboxImg.style.height = 'auto';

        const img = new Image();
        img.src = imageUrl;
        img.onload = function() {
            const maxWidth = lightboxContent.clientWidth - 20;
            const maxHeight = lightboxContent.clientHeight - 70;
            const widthRatio = maxWidth / img.width;
            const heightRatio = maxHeight / img.height;
            const scaleFactor = Math.min(widthRatio, heightRatio);

            const scaledWidth = Math.round(img.width * scaleFactor);
            const scaledHeight = Math.round(img.height * scaleFactor);

            lightboxImg.style.width = scaledWidth + 'px';
            lightboxImg.style.height = scaledHeight + 'px';
        };
    }

    // Function to close the lightbox
    function closeLightbox() {
        resetLightbox();
    }

    lightbox.addEventListener('click', closeLightbox);
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to shuffle an array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const photosContainer = document.querySelector('.masonry-grid');
    const photos = document.querySelectorAll('.photo');

    // Convert NodeList to an array for shuffling
    const photosArray = Array.from(photos);

    // Shuffle the photos randomly
    shuffleArray(photosArray);

    // Append the shuffled photos back to the container
    photosArray.forEach(photo => {
        photosContainer.appendChild(photo);
    });

    // ... Your existing code for the rest of the page
    // (e.g., event listeners, lightbox, etc.)
});

