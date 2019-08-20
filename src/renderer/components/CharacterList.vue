<template>
    <div class="container">
        <character-form v-if="showForm" @save-character="saveCharacter" @cancel-edit="cancelEdit" v-model="currentCharacter" />
        <div>
            <div class="navbar is-fixed-bottom">
                <button class="button" v-on:click="createCharacter"><i class="fa fa-plus"></i></button>
            </div>
            <div>
                <div class="card" v-for="(character, index) in characters">
                    <header class="card-header">
                        <p class="card-header-title">{{character.name}}</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{character.description}}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button class="button" v-on:click="editCharacter(index)"><i class="fa fa-edit"></i></button>
                        <button class="button" v-on:click="deleteCharacter(index)"><i class="fa fa-remove"></i></button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import CharacterForm from './CharacterList/CharacterForm'
  import Character from '@/domain/Character'
  import SaveManager from '@/back/SaveManager'
  import _ from 'lodash'
  import Page from './common/Page'

  export default {
    extends: Page,
    name: 'CharacterList',
    data: function () {
      return {
        showForm: false,
        cloneCharacter: null,
        currentCharacter: new Character(),
        currentIdx: 0,
        characters: []
      }
    },
    methods: {
      loadPage: function () {
        SaveManager.instance.loadModel('characters.json', this._data)
      },
      savePage: function () {
        SaveManager.instance.saveModel('characters.json', this._data, ['list', 'currentCharacter', 'cloneCharacter', 'currentIdx'])
      },
      createCharacter: function () {
        this.currentCharacter = new Character()
        this.cloneCharacter = null
        this.currentIdx = -1
        this.showForm = true
      },
      editCharacter: function (idx) {
        this.currentCharacter = this.characters[idx]
        this.currentIdx = idx
        this.cloneCharacter = _.clone(this.currentCharacter)
        this.showForm = true
      },
      deleteCharacter: function (idx) {
        this.$delete(this.characters, idx)
      },
      // Signals
      saveCharacter: function (character) {
        this.showForm = false
        if (!this.characters.includes(character)) {
          this.characters.push(character)
        }
      },
      cancelEdit: function () {
        this.showForm = false
        if (this.cloneCharacter) {
          // cancel edit modifications
          this.$delete(this.characters, this.currentIdx)
          this.characters.push(this.cloneCharacter)
        }
      }
    },
    components: {
      CharacterForm
    }
  }
</script>
