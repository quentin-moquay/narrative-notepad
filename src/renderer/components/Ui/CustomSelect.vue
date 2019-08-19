<template>
    <div class="field border-content has-background-ghostwhite" :is="decorated ? 'div' : 'span'">
        <label class="label" v-if="decorated" :for="name">{{$t(`${name}.label`)}}</label>
        <select :value="value ? value : null"
            @change="changeValue($event)"
            :name="name"
            :id="name"
        >
            <option v-for="elem in values" v-if="elem" :value="elem" :key="elem">
                {{$t(`${name}.select.${elem}`)}}
            </option>
        </select>
    </div>
</template>
<script>
    export default {
      name: 'CustomSelect',
      props: {
        value: String,
        name: String,
        decorated: {
          type: Boolean,
          default: true
        }
      },
      methods: {
        changeValue: function (event) {
          this.$emit('input', event.target.value)
        }
      },
      created () {
        this.list = this.$t(`${this.name}.select`)
        this.values = Object.keys(this.list)
      }
    }
</script>
<style scoped>
</style>
