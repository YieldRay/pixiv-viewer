let pximg = localStorage.getItem("pximg") || "";

if (!pximg.startsWith("http://") && !pximg.startsWith("https://")) {
    pximg = "https://i1.wp.com/i.pixiv.re/";
}

function proxy(url) {
    if (!url) return "";
    const replaceTo = pximg.endsWith("/") ? pximg : pximg + "/";
    return url.replace("https://i.pximg.net/", replaceTo);
}

function api(param) {
    return "https://fetch0.488848.xyz/https://www.pixiv.net" + param;
}

// 遗留项目的简单修复
function wrapAjax(res) {
    if (res.body) return res.body;
    return res;
}

export { proxy, api, pximg, wrapAjax };
