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
            <custom-select-model name="brainstorm.hero" :list="characters" v-model="heros" display="name" id="id"/>
        </div>
    </div>
</template>
<script>
  import Page from './common/Page'
  import CustomTextArea from './Ui/CustomTextArea'
  import CustomText from './Ui/CustomText'
  import SaveManager from '@/back/SaveManager'
  import CustomSelectModel from './Ui/CustomSelectModel'

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
        symbol: '',
        characters: [],
        heros: null
      }
    },
    components: {
      CustomSelectModel,
      CustomText,
      CustomTextArea
    },
    methods: {
      loadPage: function () {
        return SaveManager.instance.loadCollection('characters.json', this.characters)
          .then(response => {
            return SaveManager.instance.loadModel('brainstorm.json', this._data)
          })
      },
      savePage: function () {
        return SaveManager.instance.saveModel('brainstorm.json', this._data, ['characters'])
      }
    }
  }
</script>
<style scoped>
</style>
