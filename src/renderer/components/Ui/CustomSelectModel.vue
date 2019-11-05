<template>
    <div class="field border-content has-background-ghostwhite" :is="decorated ? 'div' : 'span'">
        <label class="label" v-if="decorated" :for="name">{{$t(`${name}.label`)}}</label>
        <div class="control">
            <div class="select">
                <select :value="value"
                        @change="changeValue($event)"
                        :name="name"
                        :id="name">
                    <option value="--" :key="null"></option>
                    <option v-for="elem in list" :value="getId(elem)" :key="getId(elem)">
                        {{getDisplay(elem)}}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'CustomSelectModel',
      props: {
        value: null, // any
        list: Array,
        name: String,
        display: String,
        id: String,
        decorated: {
          type: Boolean,
          default: true
        }
      },
      methods: {
        changeValue: function (event) {
          this.$emit('input', event.target.value)
        },
        getId (element) {
          return element[this.id]
        },
        getDisplay (element) {
          return element[this.display]
        }
      }
    }
</script>
