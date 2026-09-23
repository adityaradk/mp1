/*
 * Fades elements in the first time they scroll into view.
 */

export default function initReveal() {
    const targets = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.25 }
    );

    targets.forEach((target) => observer.observe(target));
}
