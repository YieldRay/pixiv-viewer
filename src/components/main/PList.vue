<template>
    <div :style="{ gap: gap + 'rem' }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: { gap: Number },
};
</script>

<style scoped>
div {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
}
</style>
