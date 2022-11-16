import {createWebHistory, createRouter} from "vue-router";
import Home from "@/pages/Home.vue";
import Join from "@/pages/Join.vue";
import Write from "@/pages/Write.vue";
import Community from "@/pages/Community.vue";

export default createRouter({
    history: createWebHistory(),
    scrollBehavior() {
      return { top: 0 }
    },
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/join/:step",
            component: Join,
        },
        {
            path: "/join/:step/:id",
            component: Join,
        },
        {
            path: "/write",
            component: Write,
        },
        {
            path: "/community",
            component: Community,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/"
        },
    ],
});
