let pximg = localStorage.getItem("pximg") || "";

if (!pximg.startsWith("http://") && !pximg.startsWith("https://")) {
    pximg = "https://i.pixiv.re/";
}

function proxy(url) {
    if (!url) return "";
    return url.replace("/-/", pximg.endsWith("/") ? pximg : pximg + "/");
}
function api(param) {
    return "https://api.allorigins.win/raw?url=https://pixiv.js.org" + param;
}

export { proxy, api, pximg };
