// not loaded if injected dynamically (needs some further research)
function injectManifest() {
    const manifest = `{
    "name": "YouTube9",
    "short_name": "YouTube9",
    "start_url": "/",
    "display": "standalone",
    "scope": "/watch",
    "background_color": "#fff",
    "description": "Youtube Mobile Wrapper"
}`;

    const m = document.createElement('link');
    m.rel = 'manifest';
    m.href = 'data:application/manifest+json;base64,' + btoa(manifest);

    document.getElementsByTagName('head')[0].appendChild(m);
}

// breaks certain dialogs and forces wrong navigation
// it seems that yt is reacting to the contents of window.location
// this approach was needed to be able to maintain fullscreen
// while using the apple specific app meta tag
// fullscreen mode is left when url changes (so fullscreen only works on one screen by default)
function forceFullscreen() {
    let url;

    function patchUrl() {
        url = window.location.href;
        setTimeout(() => {
            window.history.replaceState(window.history.state, "YouTube", "/watch");
        }, 1000);
    }

    function resetUrl() {
        window.history.replaceState(window.history.state, "YouTube", url);
    }

    document.addEventListener('click', resetUrl, true);
    document.addEventListener('click', patchUrl, false);
}
