<template>
    <div class="container">
        <button class="button" v-on:click="exportPdf"><i class="fa fa-file-pdf-o"></i></button>
    </div>
</template>
<script>
  import ExportPdf from '@/back/ExportPdf'

  export default {
    name: 'Export',
    methods: {
      exportPdf: function () {
        ExportPdf.instance.exportPdf()
      }
    }
  }
</script>
