<template>
    <button type="button" :class="{ on }">
        <slot>
            <svg viewBox="0 0 24 24" class="sc-cwqcw3-0 lcuJYz">
                <path
                    d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20
 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7ZM4 12C4 11.4477 4.44772 11
 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772
 13 4 12.5523 4 12ZM5 16C4.44772 16 4 16.4477 4 17C4 17.5523 4.44772 18 5
 18H19C19.5523 18 20 17.5523 20 17C20 16.4477 19.5523 16 19 16H5Z"
                ></path>
            </svg>
        </slot>
    </button>
</template>

<script>
export default {
    props: {
        on: Boolean,
    },
};
</script>

<style scoped>
button {
    border-radius: 50%;
    outline: none;
    border: none;
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(0, 0, 0, 0);
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
svg {
    fill: currentColor;
    color: #a1a1a1;
}
.on {
    background: rgba(0, 0, 0, 0.05);
}
button:hover {
    background: rgba(0, 0, 0, 0.05);
}
</style>
