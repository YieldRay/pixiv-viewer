function proxy(url) {
    if (!url) return "";
    return url.replace("/-/", "https://pximg.deno.dev/");
}
function api(param) {
    return "https://cors.deno.dev/https://pixiv.js.org" + param;
}
export { proxy, api };
