<template>
<span>
    <scene-form v-if="showForm" @cancel-edit="cancelEdit" @save-scene="saveScene" v-model="currentScene" />
    <confirmation :visible="deleteConfirmation" :id="deleteId" message="chronology.delete.confirmation" @cancel="cancelDelete" @confirm="confirmDelete" />
    <div class="columns">
        <div class="column is-one-quarter">
            <div class="notification"><i>{{ $t("chronology.advice") }}</i></div>
            <div class="card sticky">
                <header class="card-header">
                    <p class="card-header-title">{{ $t("chronology.add.title") }}</p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <custom-text name="scene.description" v-model="description" />
                        <custom-text name="scene.place" v-model="place" />
                    </div>
                </div>
                <footer class="card-footer">
                    <button class="button" v-on:click="addScene"><i class="fa fa-plus"></i></button>
                </footer>
            </div>
        </div>
        <div class="column is-three-quarters">
            <draggable class="draggable" v-model="scenes" @end="moveScene" group="scene">
                <transition-group type="transition" name="card">
                    <div class="card story" v-for="(scene,i) in scenes" :key="scene.id">
                        <scene-card v-model="scenes[i]" @delete="checkDelete(scene.id)" @edit="editScene(i)" v-bind:editable="true" />
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</span>
</template>
<script>
  import Bluebird from 'bluebird'
  import CustomTextArea from './Ui/CustomTextArea'
  import CustomText from './Ui/CustomText'
  import CustomSelect from './Ui/CustomSelect'
  import Scene from '@/domain/Scene'
  import SaveManager from '@/back/SaveManager'
  import _ from 'lodash'
  import Confirmation from '@/components/Ui/Confirmation'
  import Draggable from 'vuedraggable'
  import SceneForm from './Chronology/SceneForm'
  import SceneCard from './common/SceneCard'
  import Page from './common/Page'

  export default {
    extends: Page,
    name: 'Chronology',
    data: function () {
      return {
        cloneScene: null,
        currentScene: null,
        currentIdx: 0,
        showForm: false,
        deleteId: null,
        deleteConfirmation: false,
        description: '',
        place: '',
        scenes: [],
        storyline: []
      }
    },
    components: {
      SceneCard,
      SceneForm,
      CustomText,
      CustomSelect,
      CustomTextArea,
      Draggable,
      Confirmation
    },
    methods: {
      loadPage: function () {
        Bluebird.all([
          SaveManager.instance.loadCollection('scenes.json', this.scenes),
          SaveManager.instance.loadCollection('storyline.json', this.storyline)])
          .then(() => {
            this.$bus.$emit('loading', false)
          })
      },
      savePage: function () {
        return Bluebird.all([
          SaveManager.instance.saveCollection('scenes.json', this.scenes),
          SaveManager.instance.saveCollection('storyline.json', this.storyline)])
      },
      addScene: function () {
        this.scenes.push(new Scene(this.nextId, this.description, this.place, this.nextOrder))
        this.description = ''
        this.place = ''
      },
      cancelDelete: function () {
        this.deleteConfirmation = false
      },
      confirmDelete: function (id) {
        this.deleteConfirmation = false
        let idx = _.findIndex(this.scenes, { id: id })
        this.$delete(this.scenes, idx)

        idx = _.findIndex(this.storyline, (it) => it === id)
        if (idx) {
          this.$delete(this.storyline, idx)
        }

        let index = 1
        this.storyOrder.forEach(it => {
          it.order = index++
        })
      },
      editScene: function (idx) {
        this.currentIdx = idx
        this.currentScene = this.scenes[this.currentIdx]
        this.cloneScene = _.clone(this.currentScene)
        this.showForm = true
      },
      checkDelete: function (id) {
        if (_.includes(this.storyline, id)) {
          this.deleteId = id
          this.deleteConfirmation = true
        } else {
          this.confirmDelete(id)
        }
      },
      moveScene: function () {
        let index = 1
        this.scenes.forEach(it => {
          it.order = index++
        })
      },
      // Signals
      saveScene: function () {
        this.showForm = false
      },
      cancelEdit: function () {
        this.showForm = false
        if (this.cloneScene) {
          // cancel edit modifications
          this.scenes[this.currentIdx] = this.cloneScene
        }
      }
    },
    computed: {
      nextId: function () {
        if (_.isEmpty(this.scenes)) {
          return 1
        } else {
          return _.max(_.map(this.scenes, 'id')) + 1
        }
      },
      nextOrder: function () {
        if (_.isEmpty(this.scenes)) {
          return 1
        } else {
          return _.max(_.map(this.scenes, 'order')) + 1
        }
      },
      storyOrder: function () {
        return _.sortBy(this.scenes, { order: 'desc' })
      }
    }
  }
</script>
