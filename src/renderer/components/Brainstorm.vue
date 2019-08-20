<template>
    <div class="container">
        <div class="notification"><i>{{ $t('brainstorm.advice.general')}}</i></div>
        <div class="notification"><p><i>{{ $t('brainstorm.advice.principle')}}</i></p></div>
        <div>
            <custom-text name="brainstorm.premise" v-model="premise"/>
            <custom-text-area name="brainstorm.thema.general" v-model="thema.general"/>
            <custom-text-area name="brainstorm.thema.symbol" v-model="thema.symbol"/>
            <custom-text-area name="brainstorm.moral_problem" v-model="moral_problem"/>
            <custom-text-area name="brainstorm.challenge" v-model="challenge"/>
            <custom-text-area name="brainstorm.designing_principle" v-model="designing_principle"/>
            <custom-text-area name="brainstorm.symbol" v-model="symbol"/>
            <custom-select name="brainstorm.hero"/>
        </div>
    </div>
</template>
<script>
  import Page from './common/Page'
  import CustomTextArea from './Ui/CustomTextArea'
  import CustomText from './Ui/CustomText'
  import CustomSelect from './Ui/CustomSelect'
  import SaveManager from '@/back/SaveManager'

  export default {
    extends: Page,
    name: 'Brainstorm',
    data: function () {
      return {
        premise: '',
        moral_problem: '',
        thema: {
          general: '',
          symbol: ''
        },
        challenge: '',
        designing_principle: '',
        symbol: ''
      }
    },
    components: {
      CustomText,
      CustomSelect,
      CustomTextArea
    },
    methods: {
      loadPage: function () {
        SaveManager.instance.loadModel('brainstorm.json', this._data, () => { this.$bus.$emit('loading', false) })
      },
      savePage: function () {
        return SaveManager.instance.saveModel('brainstorm.json', this._data)
      }
    }
  }
</script>
<style scoped>
</style>
