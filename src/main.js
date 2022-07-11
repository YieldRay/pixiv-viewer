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
