<template>
    <div class="field border-content has-background-ghostwhite">
        <label class="label" :for="name">{{$t(`${name}.label`)}}</label>
        <textarea class="textarea" :id="name" :name="name" :placeholder="$t(`${name}.placeholder`)" v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"></textarea>
    </div>
</template>
<script>
  export default {
    name: 'CustomTextArea',
    props: ['name', 'value']
  }
</script>
<style scoped>
</style>
