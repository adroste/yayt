function injectAppMetaTag(document) {
    const metaEl = document.createElement('meta');
    metaEl.name = 'apple-mobile-web-app-capable';
    metaEl.content = 'yes';

    document.getElementsByTagName('head')[0].appendChild(metaEl);
}

function wrapInIframe(document) {
    const iframe = document.createElement('iframe');

    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = '';
    body.appendChild(iframe);

    const html = document.getElementsByTagName('html')[0];

    const style = {
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0,
        border: 0,
    };
    Object.assign(iframe.style, style);
    Object.assign(body.style, style);
    Object.assign(html.style, style);

    return iframe;
}

(function init(document) {

    // to allow fullscreen pwa via "add to homescreen"
    injectAppMetaTag(document);

    // iframe wrap is required for fullscreen view
    // in order for main window location to remain static
    // Also: site reloads can be monitored and scripts can be reinjected
    const iframe = wrapInIframe(document);

    // Path "/watch" without params gets redirect to "/".
    // yayt sets the current url to "/watch" so that the user
    // can create a bookmark to "/watch".
    // Fullscreen view is only available for the bookmarked url ("/watch").
    // If the user opens the bookmark, youtube will redirect and
    // the pwa will therefore leave the fullscreen mode.
    // This is necessary to show the "share" button.
    // The user must use the share button to inject
    // this yayt script via a shortcut in the Share Sheet.
    window.history.replaceState({}, "YAYT", "/watch");


})(window.document);