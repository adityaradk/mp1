/*
 * Navigation bar behaviour: shrink on scroll, smooth scrolling to sections, and
 * the reading-position indicator.
 */

// How far down the page the bar switches to its compact size.
const SHRINK_THRESHOLD = 60;

// Tolerance in pixels for deciding the page is scrolled all the way down.
const BOTTOM_SLACK = 2;

/*
 * Picks the section currently being read: the last one whose top edge has passed
 * beneath the navbar. The final section is often too short to ever reach that
 * line, so hitting the bottom of the page selects it outright.
 */
function currentIndex(sections, navHeight) {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - BOTTOM_SLACK) {
        return sections.length - 1;
    }

    let index = 0;

    sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top <= navHeight + BOTTOM_SLACK) {
            index = i;
        }
    });

    return index;
}

export default function initNav() {
    const navbar = document.querySelector('#navbar');
    const links = Array.from(document.querySelectorAll('.navbar__link'));
    const sections = links.map((link) => document.querySelector(link.getAttribute('href')));

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll events fire far more often than the page can repaint, so the actual
    // work is deferred to the next frame and collapsed into a single update.
    let pending = false;

    function update() {
        pending = false;
        navbar.classList.toggle('is-shrunk', window.scrollY > SHRINK_THRESHOLD);

        const active = currentIndex(sections, navbar.offsetHeight);
        links.forEach((link, i) => link.classList.toggle('is-active', i === active));
    }

    window.addEventListener('scroll', () => {
        if (!pending) {
            pending = true;
            window.requestAnimationFrame(update);
        }
    });

    window.addEventListener('resize', update);
    // Section heights settle once the background image and video have loaded.
    window.addEventListener('load', update);
    update();
}
