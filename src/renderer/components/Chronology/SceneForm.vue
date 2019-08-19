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
                <custom-select name="scene.leader" v-model="scene.strategy" />
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
  import CustomSelect from '../Ui/CustomSelect'

  export default {
    name: 'SceneForm',
    components: {CustomTextArea, CustomText, CustomSelect},
    props: ['value'],
    data: function () {
      return {
        scene: new Scene()
      }
    },
    created: function () {
      this.scene = this.value
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
