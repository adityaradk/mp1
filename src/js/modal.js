/*
 * Modal windows for the functionality tiles. A single dialog is reused and
 * filled from the tile that opened it, so the prose stays in the markup.
 */

export default function initModal() {
    const modal = document.querySelector('.modal');
    const title = modal.querySelector('.modal__title');
    const body = modal.querySelector('.modal__body');
    const closeButton = modal.querySelector('.modal__close');

    // The tile is restored as the focus target so keyboard users land where they left.
    let opener = null;

    function open(tile) {
        title.textContent = tile.querySelector('.tile__name').textContent;
        body.textContent = tile.querySelector('.tile__detail').textContent;
        modal.hidden = false;
        opener = tile;
        closeButton.focus();
    }

    function close() {
        modal.hidden = true;

        if (opener) {
            opener.focus();
            opener = null;
        }
    }

    document.querySelectorAll('.tile').forEach((tile) => {
        tile.addEventListener('click', () => open(tile));
    });

    closeButton.addEventListener('click', close);
    modal.querySelector('.modal__backdrop').addEventListener('click', close);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            close();
        }
    });
}
