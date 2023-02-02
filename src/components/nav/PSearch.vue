<template>
    <div class="container">
        <input
            @focus="$emit('toggle')"
            type="text"
            placeholder="搜索作品"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keydown.enter="enter"
        />
    </div>
</template>

<script>
export default {
    name: "PSearch",
    props: {
        on: Boolean,
        modelValue: [String, Number],
    },
    emits: ["toggle", "update:modelValue", "search"],
    methods: {
        enter() {
            this.$emit("search");
            if (/^\d+$/.test(this.modelValue)) {
                this.$router.push("/artwork/" + this.modelValue);
            } else {
                this.$router.push("/search/" + this.modelValue);
            }
        },
    },
};
</script>

<style scoped>
input {
    background: rgba(0, 0, 0, 0.04);
    border: none;
    height: 2.4rem;
    border-radius: 0.25rem;
    padding-left: 2.5rem;
    outline: none;
    transition: all 0.5s;
    width: 30vw;
}
@media screen and (max-width: 32rem) {
    input {
        width: 40vw;
    }
}
input:focus {
    background-color: #ebebeb;
    outline: none;
    box-shadow: rgb(0 150 250 / 32%) 0px 0px 0px 4px;
}
input:hover {
    background: rgba(0, 0, 0, 0.05);
}
.container {
    position: relative;
}
.container::before {
    content: "🔍";
    display: block;
    position: absolute;
    top: 0;
    left: 0.8rem;
    transform: translateY(50%);
}
</style>
