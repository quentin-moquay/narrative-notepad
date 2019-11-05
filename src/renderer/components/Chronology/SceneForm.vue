<template>
    <div class="modal is-active is-clipped">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{$t("scene.title")}}</p>
                <button class="delete" aria-label="close" v-on:click="cancelEdit"></button>
            </header>
            <section class="modal-card-body">
                <div class="notification"><i>{{ $t("scene.advice")}}</i></div>
                <custom-text name="scene.description" v-model="scene.description" />
                <custom-text name="scene.place" v-model="scene.place" />
                <custom-text-area name="scene.arcPosition" v-model="scene.arcPosition" />
                <custom-text-area name="scene.problem" v-model="scene.problem" />
                <custom-text-area name="scene.strategy" v-model="scene.strategy" />
                <custom-select-model name="scene.leader" :list="characters" v-model="scene.leader" display="name" id="id"/>
                <custom-text-area name="scene.desire" v-model="scene.desire" />
                <custom-text-area name="scene.desirePurpose" v-model="scene.desirePurpose" />
                <!-- TODO this.characters -->
            </section>
            <footer class="modal-card-foot">
                <button class="button" v-on:click="cancelEdit">{{ $t("general.cancel") }}</button>
                <button class="button is-success" v-on:click="saveScene">{{ $t("general.save") }}</button>
            </footer>
        </div>
    </div>
</template>

<script>
  import Scene from '../../domain/Scene'
  import CustomText from '../Ui/CustomText'
  import CustomTextArea from '../Ui/CustomTextArea'
  import CustomSelectModel from '../Ui/CustomSelectModel'
  import SaveManager from '@/back/SaveManager'
  import Page from '../common/Page'

  export default {
    name: 'SceneForm',
    extends: Page,
    components: {CustomTextArea, CustomText, CustomSelectModel},
    props: ['value'],
    data: function () {
      return {
        scene: new Scene(),
        characters: []
      }
    },
    created: function () {
      this.loading(true)
      SaveManager.instance.loadCollection('characters.json', this.characters)
        .then(response => {
          this.scene = this.value
          this.loading(false)
        })
    },
    methods: {
      cancelEdit: function () {
        this.$emit('cancel-edit')
      },
      saveScene: function () {
        this.$emit('save-scene', this.scene)
      }
    }
  }
</script>
