<template>
    <div class="modal is-active is-clipped">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{$t("character.title")}}</p>
                <button class="delete" aria-label="close" v-on:click="cancelEdit"></button>
            </header>
            <section class="modal-card-body">
                <div class="notification"><i>{{ $t("character.advice.general")}}</i></div>
                <custom-text name="character.name" v-model="character.name" />
                <custom-select name="character.role" v-model="character.role" />
                <custom-select name="character.archetype" v-model="character.archetype" />
                <custom-text name="character.symbols" v-model="character.symbols" />
                <custom-text-area name="character.description" v-model="character.description" />
                <custom-text-area name="character.values" v-model="character.values" />
                <custom-text-area name="character.strengths" v-model="character.strengths" />
                <custom-text-area name="character.weaknesses" v-model="character.weaknesses" />
                <custom-text-area name="character.need" v-model="character.need" />
                <custom-text-area name="character.desire" v-model="character.desire" />
                <custom-text-area name="character.plan_to_achieve_desire" v-model="character.plan_to_achieve_desire" />
                <custom-text-area name="character.transformation.general" v-model="character.transformation.general" />
                <custom-text-area name="character.transformation.symbol" v-model="character.transformation.symbol" />
                <custom-text-area name="character.realization" v-model="character.realization" />
                <custom-text-area name="character.morale_decision" v-model="character.morale_decision" />
                <custom-text-area name="character.transformation.sequence" v-model="character.transformation.sequence" />
            </section>
            <footer class="modal-card-foot">
                <button class="button" v-on:click="cancelEdit">{{ $t("general.cancel") }}</button>
                <button class="button is-success" v-on:click="saveCharacter">{{ $t("general.save") }}</button>
            </footer>
        </div>
    </div>
</template>
<script>
  import CustomTextArea from '../Ui/CustomTextArea'
  import CustomText from '../Ui/CustomText'
  import CustomSelect from '../Ui/CustomSelect'
  import Character from '@/domain/Character'

  export default {
    name: 'CharacterForm',
    props: ['value'],
    data: function () {
      return {
        character: new Character()
      }
    },
    components: {
      CustomTextArea,
      CustomText,
      CustomSelect
    },
    created: function () {
      this.character = this.value
    },
    methods: {
      cancelEdit: function () {
        this.$emit('cancel-edit')
      },
      saveCharacter: function () {
        this.$emit('save-character', this.character)
      }
    }
  }
</script>
