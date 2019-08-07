<template>
<span>
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
                        <custom-text name="chronology.description" v-model="description" />
                        <custom-text name="chronology.place" v-model="place" />
                    </div>
                </div>
                <footer class="card-footer">
                    <button class="button" v-on:click="addStoryEvent"><i class="fa fa-plus"></i></button>
                </footer>
            </div>
        </div>
        <div class="column is-three-quarters">
            <draggable class="draggable" v-model="events" @end="moveStory" group="story">
                <transition-group type="transition" name="card">
                    <div class="card story" v-for="(event,i) in events" :key="event.id">
                        <story-event v-model="events[i]" @delete="checkDelete(event.id)" v-bind:editable="true" />
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</span>
</template>
<script>
  import CustomTextArea from './Ui/CustomTextArea'
  import CustomText from './Ui/CustomText'
  import CustomSelect from './Ui/CustomSelect'
  import StoryEventDomain from '@/domain/StoryEvent'
  import SaveManager from '@/back/SaveManager'
  import _ from 'lodash'
  import StoryEvent from '@/components/Ui/StoryEvent'
  import Confirmation from '@/components/Ui/Confirmation'
  import Draggable from 'vuedraggable'

  export default {
    name: 'Chronology',
    data: function () {
      return {
        deleteId: null,
        deleteConfirmation: false,
        description: '',
        place: '',
        events: [],
        storyline: []
      }
    },
    components: {
      CustomText,
      CustomSelect,
      CustomTextArea,
      Draggable,
      StoryEvent,
      Confirmation
    },
    methods: {
      addStoryEvent: function () {
        this.events.push(new StoryEventDomain(this.nextId, this.description, this.place, this.nextOrder))
        this.description = ''
        this.place = ''
      },
      cancelDelete: function () {
        this.deleteConfirmation = false
      },
      confirmDelete: function (id) {
        this.deleteConfirmation = false
        let idx = _.findIndex(this.events, { id: id })
        this.$delete(this.events, idx)

        idx = _.findIndex(this.storyline, (it) => it === id)
        if (idx) {
          this.$delete(this.storyline, idx)
        }

        let index = 1
        this.storyOrder.forEach(it => {
          it.order = index++
        })
      },
      checkDelete: function (id) {
        if (_.includes(this.storyline, id)) {
          this.deleteId = id
          this.deleteConfirmation = true
        } else {
          this.confirmDelete(id)
        }
      },
      moveStory: function () {
        let index = 1
        this.events.forEach(it => {
          it.order = index++
        })
      }
    },
    computed: {
      nextId: function () {
        if (_.isEmpty(this.events)) {
          return 1
        } else {
          return _.max(_.map(this.events, 'id')) + 1
        }
      },
      nextOrder: function () {
        if (_.isEmpty(this.events)) {
          return 1
        } else {
          return _.max(_.map(this.events, 'order')) + 1
        }
      },
      storyOrder: function () {
        return _.sortBy(this.events, { order: 'desc' })
      }
    },
    created: function () {
      SaveManager.instance.loadCollection('story_events.json', this.events)
      SaveManager.instance.loadCollection('storyline.json', this.storyline)
    },
    beforeDestroy: function () {
      SaveManager.instance.saveCollection('story_events.json', this.events)
      SaveManager.instance.saveCollection('storyline.json', this.storyline)
    }
  }
</script>
