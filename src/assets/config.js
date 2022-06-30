function proxy(url) {
    if (!url) return "";
    return url.replace("/-/", "https://pximg.deno.dev/");
}

export { proxy };
