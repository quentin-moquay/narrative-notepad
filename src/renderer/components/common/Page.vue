<template>
    <!-- Abstract Component -->
</template>

<script>
  export default {
    name: 'Page',
    created () {
      this.loadPage()
    },
    beforeDestroy () {
      this.savePage()
    }
  }
</script>
