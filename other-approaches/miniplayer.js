
function miniPlayer(iwindow, idocument) {
    const playerContainer = idocument.getElementById('player-container-id');

    const player = idocument.getElementById('player');

    const playerControls = idocument.getElementById('player-control-container');

    // idocument.getElementsByTagName('video')[0].webkitSetPresentationMode("picture-in-picture");

    const observer = new MutationObserver(function (e) {
        setTimeout(() => {
            if (iwindow.location.href.includes('/watch')) {
                playerContainer.removeAttribute('style');
            } else {
                Object.assign(playerContainer.style, {
                    transform: 'scale(.5) translate(-50%,-50%)',
                    zIndex: 10,
                    top: 0,
                    left: 0,
                    position: 'fixed',
                });
                player.setAttribute('loading', 'false');
                player.removeAttribute('hidden');
                playerControls.removeAttribute('hidden');
            }
        }, 100);
    });
    observer.observe(player, { attributes: true });
}