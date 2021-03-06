// use to trigger start overlay (soft fullscreen)
function onResize() {
    const content = document.getElementById('content');
    const start = document.getElementById('start');

    if (content.clientHeight !== window.innerHeight) {
        start.classList.add('show-overlay');
    } else {
        start.classList.remove('show-overlay');
    }

    setTimeout(() => {
        window.scrollTo(0, 2);
    }, 100);
}

function patchIcon(idocument) {
    idocument.getElementById('home-icon').style.filter = 'grayscale()';
}

function removeAppLink(idocument) {
    const appLink = idocument.getElementsByName('apple-itunes-app')[0];
    if (appLink)
        appLink.remove();
}

function restorePip(idocument) {
    let lastVideo = idocument.getElementsByTagName('video')[0];

    function suppressEvent(e) {
        e.stopPropagation();
    }

    function applyFix(video) {
        lastVideo.removeEventListener('webkitpresentationmodechanged', suppressEvent, true);
        video.addEventListener('webkitpresentationmodechanged', suppressEvent, true);
        lastVideo = video;
    }

    const observer = new MutationObserver(function (e) {
        for (let m of e) {
            if (m.type === 'childList' && m.addedNodes.length) {
                for (let node of m.addedNodes) {
                    if (node.tagName.toLowerCase() === 'video') {
                        applyFix(node);
                        return;
                    }
                }
            }
        }
    });
    observer.observe(idocument.getElementById('player-container-id'), { childList: true, subtree: true });

    applyFix(lastVideo);
}

function waitForLoad(idocument, cb) {
    setTimeout(function () {
        if (idocument.getElementById('home-icon'))
            return cb();
        waitForLoad(idocument, cb);
    }, 100);
}


(function init() {
    console.log('yayt started');

    const iframe = document.getElementById('ytframe');

    window.addEventListener('resize', onResize);
    onResize();

    const navError = document.getElementById('nav-error');
    const backButton = document.getElementById('back-button');
    const noYaytButton = document.getElementById('no-yayt-button');
    backButton.addEventListener('click', function () {
        navError.classList.remove('show-overlay');
        iframe.src = window.location.href;
    });
    noYaytButton.addEventListener('click', function () {
        window.location.reload();
    });

    if (!window.location.origin.includes('youtube')) {
        iframe.src = 'https://adroste.github.io/yayt/index.html';
        return;
    }

    iframe.onload = function () {
        try {
            const iwindow = iframe.contentWindow;
            const idocument = iwindow.document;

            removeAppLink(idocument);

            waitForLoad(idocument, function () {

                patchIcon(idocument);
                restorePip(idocument);

            });
        } catch (e) {
            navError.classList.add('show-overlay');
        }
    }

    iframe.src = 'https://m.youtube.com';
    window.history.replaceState({}, "YAYT", "/");
})();