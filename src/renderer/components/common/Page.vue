<template>
    <!-- Abstract Component -->
</template>

<script>
  export default {
    name: 'Page',
    created () {
      this.$bus.$on('loading', state => {
        this.loading(state)
      })

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
          this.loader = this.$loading.show({
            container: null,
            canCancel: true,
            onCancel: this.onCancel
          })
        } else {
          this.loader.hide()
        }
      }
    }
  }
</script>
