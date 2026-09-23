/*
 * Reviews carousel. The arrows step through the slides and wrap around at both ends.
 */

export default function initCarousel() {
    const track = document.querySelector('.carousel__track');
    const slides = track.querySelectorAll('.slide');
    const previous = document.querySelector('.carousel__arrow--prev');
    const next = document.querySelector('.carousel__arrow--next');

    let index = 0;

    function step(offset) {
        index = (index + offset + slides.length) % slides.length;
        track.style.setProperty('--slide-index', index);
    }

    previous.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
}
