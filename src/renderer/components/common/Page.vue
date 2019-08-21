<template>
    <!-- Abstract Component -->
</template>

<script>
  export default {
    name: 'Page',
    created () {
      if (this.loadPage) {
        this.loading(true)
        let promise = this.loadPage()
        if (promise) {
          promise.finally(() => { this.loading(false) })
        }
      }
    },
    beforeDestroy () {
      if (this.savePage) {
        this.loading(true)
        let promise = this.savePage()
        if (promise) {
          promise.finally(() => { this.loading(false) })
        }
      }
    },
    methods: {
      loading (state) {
        if (state) {
          this.loader = this.$loading.show()
        } else {
          this.loader.hide()
        }
      }
    }
  }
</script>
