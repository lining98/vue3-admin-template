<template>
    <div class="line">
        <h1>{{msg}}</h1>
    </div>
</template>


<script setup lang='ts'>
import {ref} from 'vue'

const msg = ref("line")
</script>


<style lang='scss' scoped>
.line{
    flex:1;
    background: skyblue;
}
</style>