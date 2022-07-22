function proxy(url) {
    if (!url) return "";
    return url.replace("/-/", "https://pximg.deno.dev/");
}
function api(param) {
    return "https://pixivapi.vercel.app" + param;
}
export { proxy, api };
