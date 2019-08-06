<template>
    <div class="field" :is="decorated ? 'div' : 'span'">
        <label class="label" v-if="decorated" :for="name">{{$t(`${name}.label`)}}</label>
        <input class="input" type="text" :id="name" :name="name" :placeholder="$t(`${name}.placeholder`)" v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)" />
    </div>
</template>
<script>
  export default {
    name: 'CustomText',
    props: {
      value: String,
      name: String,
      decorated: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
<style scoped>
</style>
