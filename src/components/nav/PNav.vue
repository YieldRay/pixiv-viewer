<template>
    <nav @click.self="this.isSearchOpen ? (this.isSearchOpen = false) : null">
        <div class="left" style="margin-right: 1rem;">
            <RoundButton @click="isSidebarOpen = !isSidebarOpen"></RoundButton>
            <PLogo></PLogo>
        </div>

        <div class="right">
            <PSearch
                :on="isSearchOpen"
                @toggle="isSearchOpen = true"
                @search="search"
                v-model="modelValue"
            >
            </PSearch>
            <UserSpace></UserSpace>
        </div>
    </nav>

    <PSidebar :on="isSidebarOpen" v-on:toggle="isSidebarOpen = false">
    </PSidebar>
    <PSearchAssosiate
        :on="isSearchOpen"
        :history="history"
        @clearHistory="clearHistory"
        @search="searchHistory"
    >
    </PSearchAssosiate>

    <transition name="fade">
        <div
            class="mask"
            v-if="isSearchOpen"
            @click="isSearchOpen = false"
        ></div>
    </transition>
</template>

<script>
import PLogo from "./PLogo.vue";
import RoundButton from "./ToggleButton.vue";
import PSidebar from "./PSidebar.vue";
import PSearch from "./PSearch.vue";
import PSearchAssosiate from "./PSearchAssosiate.vue";
import UserSpace from "./UserSpace.vue";
import { storage } from "@/assets/localStorage";

export default {
    name: "PNav",
    data() {
        return {
            isSidebarOpen: false,
            isSearchOpen: false,
            history: storage.get(),
            modelValue: "",
        };
    },
    methods: {
        search() {
            storage.push(this.modelValue);
            storage.noRepeat();
            this.history = storage.get();
        },
        clearHistory() {
            storage.clear();
            this.history = storage.get();
        },
        searchHistory(value) {
            this.modelValue = value;
        },
    },
    components: {
        RoundButton,
        PSidebar,
        PLogo,
        PSearch,
        UserSpace,
        PSearchAssosiate,
    },
};
</script>

<style scoped>
nav {
    height: 4rem;
    /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1vw;
    position: relative;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    overflow-y: visible;
}

.left,
.right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.mask {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
}

@import url("../../assets/transiton.css");
</style>
