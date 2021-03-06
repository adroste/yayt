// const baseUrl = 'https://192.168.178.188:1234';
const baseUrl = 'https://adroste.github.io/yayt';

function getApp() {
    const url = baseUrl + '/app/index.html';
    return fetch(url)
        .then(r => r.text())
        .then(html => { 
            html = html.replace(/(href="|src=")(\/)/gi, `$1${baseUrl}$2`);
            let scripts = html.match(/script.*src="(.*?)"/i) || [];
            scripts = scripts.splice(1);
            html = html.replace(/<script.*?\/script>/ig, '');
            return { html, scripts };
        });
}

(function inject() {
    getApp().then(app => {
        document.documentElement.innerHTML = app.html;
        const head = document.getElementsByTagName('head')[0];
        // scripts won't get executed by just setting app.html
        for (let src of app.scripts) {
            const script = document.createElement('script');
            script.src = src;
            script.type = 'application/javascript';
            head.appendChild(script);
        }
    });
})();