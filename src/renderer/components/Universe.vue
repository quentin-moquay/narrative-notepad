<template>
    <div class="container">
        <custom-text name="universe.general" v-model="universe" />
        <custom-text name="universe.symbol" v-model="symbol" />
        <custom-text-area name="universe.arena" v-model="arena" />
        <custom-text-area name="universe.oppositions" v-model="oppositions" />
        <custom-text-area name="universe.territory" v-model="territory" />
        <custom-text-area name="universe.technology.general" v-model="technology.general" />
        <custom-text-area name="universe.technology.symbol" v-model="technology.symbol" />
        <custom-text-area name="universe.system" v-model="system" />
        <custom-text-area name="universe.canvas" v-model="narrativeCanvas" />
        <custom-text-area name="universe.atmosphere" v-model="atmosphere" />
        <custom-text-area name="universe.spaces" v-model="spaces" />
        <custom-text-area name="universe.miniatures" v-model="miniatures" />
        <custom-text-area name="universe.transformation" v-model="transformation" />
        <custom-text-area name="universe.seasons" v-model="seasons" />
        <custom-text-area name="universe.festivals" v-model="festivals" />
    </div>
</template>
<script>
  import CustomTextArea from './Ui/CustomTextArea'
  import CustomText from './Ui/CustomText'
  import CustomSelect from './Ui/CustomSelect'
  import SaveManager from '@/back/SaveManager'
  import Page from './common/Page'

  export default {
    extends: Page,
    name: 'Universe',
    data: function () {
      return {
        universe: '',
        symbol: '',
        arena: '',
        oppositions: '',
        territory: '',
        technology: {
          general: '',
          symbol: ''
        },
        system: '',
        narrativeCanvas: '',
        atmosphere: '',
        spaces: '',
        miniatures: '',
        transformation: '',
        seasons: '',
        festivals: ''
      }
    },
    components: {
      CustomText,
      CustomSelect,
      CustomTextArea
    },
    methods: {
      loadPage: function () {
        SaveManager.instance.loadModel('universe.json', this._data)
      },
      savePage: function () {
        SaveManager.instance.saveModel('universe.json', this._data)
      }
    }
  }
</script>
