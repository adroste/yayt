// not working cause not every external link is handled via anchor tags
function watchNavigation(iwindow) {
    iwindow.addEventListener('click', function (e) {
        console.log('click', e);

        if (e.target.tagName.toLowerCase() === 'a') {
            const url = e.target.href;

            console.log('a', url);

            // external navigation will break (cors)
            // navigation must be executed on parent window
            if (!url.startsWith(iwindow.location.origin)) {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('Do you want to leave YAYT?\nURL: ' + url))
                    window.location.href = url;
            } else {
                // sync url to fix share sheet
                window.history.replaceState({}, 'YAYT', url);
            }
        }
    }, true);
}

function watchNavigation(iwindow, idocument) {
    const observer = new MutationObserver(function (e) {
        setTimeout(function () {
            window.history.replaceState({}, title || 'YAYT', iwindow.location.href);
        }, 0);
    });
    observer.observe(idocument.getElementsByTagName('body')[0], { childList: true, subtree: true });
}