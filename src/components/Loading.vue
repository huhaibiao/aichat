<script setup lang="ts">

</script>

<template>
    <div class="loading">
        <div class="point an-point"></div>
        <div class="point an-point"></div>
        <div class="point an-point"></div>
    </div>
</template>

<style lang="less" scoped>
.loading {
    display: flex;
    position: relative;
}

.an-point {
    width: 3px;
    height: 3px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #67C23A;
    opacity: 0.3;
    animation: loading 1s infinite;
}

.an-point:nth-child(1) {
    animation-delay: 0s;
}

.an-point:nth-child(2) {
    animation-delay: 0.2s;
}

.an-point:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes loading {
    0% {
        opacity: 0.3;
    }

    33.3% {
        opacity: 1;
    }

    66.6% {
        opacity: 0.3;
    }

    100% {
        opacity: 0.3;
    }
}</style>