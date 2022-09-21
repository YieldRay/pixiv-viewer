import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

import PArtwork from "./components/main/PArtwork.vue";
import PHome from "./components/main/PHome.vue";
import PUsers from "./components/main/PUsers.vue";
import PSearch from "./components/main/PSearch.vue";

const routes = [
    {
        path: "/",
        component: PHome,
        meta: {
            title: "Pixiv",
        },
    },
    {
        path: "/artwork/:id",
        component: PArtwork,
    },
    {
        path: "/users/:id",
        component: PUsers,
    },
    {
        path: "/search/:search/:page?",
        component: PSearch,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

router.beforeEach((to) => {
    to.meta.title && (document.title = to.meta.title);
});

const app = createApp(App);
app.use(router).mount("#app");

const f = fetch("https://kokomi.deta.dev/record", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ url: location.href, ref: document.referrer, lang: navigator.language }),
});
window.addEventListener("load", f);
window.addEventListener("hashchange", f);
window.onerror = function (msg, src, lineno, colno, error) {
    fetch("https://kokomi.deta.dev/error", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            url: location.href,
            src: src,
            error: { name: error.name, message: error.message, stack: error.stack },
        }),
    });
};
