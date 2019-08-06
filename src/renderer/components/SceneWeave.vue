<template>
    <div class="columns">
        <div class="column is-half">
            <h2>{{ $t("chronology.title") }}</h2>
            <draggable class="draggable" v-model="events" tag="div" group="story">
                <div class="card story" v-for="(event,i) in events" :key="event.order">
                    <story-event v-model="events[i]" />
                </div>
            </draggable>
        </div>
        <div class="column is-half">
            <h2>{{ $t("scene_weave.storyline") }}</h2>
            <draggable class="draggable" v-model="storyline" group="story">
                <div class="card story" v-for="(event,i) in storyline" :key="event.id">
                    <story-event v-model="storyline[i]" />
                </div>
            </draggable>
        </div>
    </div>
</template>
<script>
  import _ from 'lodash'
  import SaveManager from '@/back/SaveManager'
  import Draggable from 'vuedraggable'
  import StoryEvent from '@/components/Ui/StoryEvent'

  export default {
    name: 'SceneWeave',
    data: function () {
      return {
        events: [],
        storyline: []
      }
    },
    components: {
      Draggable,
      StoryEvent
    },
    created () {
      SaveManager.instance.loadCollection('story_events.json', this.events, this.loadStoryline)
    },
    methods: {
      loadStoryline () {
        SaveManager.instance.loadCollection('storyline.json', [], (ids) => {
          ids.forEach(id => {
            let idx = _.findIndex(this.events, { id: id })
            this.storyline.push(this.events[idx])
            this.$delete(this.events, idx)
          })
        })
      }
    },
    beforeDestroy () {
      SaveManager.instance.saveCollection('storyline.json', _.map(this.storyline, 'id'))
    }
  }
</script>
