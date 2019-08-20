<template>
    <div class="columns">
        <div class="column is-half">
            <h2>{{ $t("chronology.title") }}</h2>
            <draggable class="draggable border-content" v-model="events" tag="div" group="story">
                <div class="card story" v-for="(event,i) in events" :key="event.order">
                    <scene-card v-model="events[i]" />
                </div>
            </draggable>
        </div>
        <div class="column is-half">
            <h2>{{ $t("scene_weave.storyline") }}</h2>
            <draggable class="draggable border-content" v-model="storyline" group="story">
                <div class="card story" v-for="(event,i) in storyline" :key="event.id">
                    <scene-card v-model="storyline[i]" />
                </div>
            </draggable>
        </div>
    </div>
</template>
<script>
  import _ from 'lodash'
  import SaveManager from '@/back/SaveManager'
  import Draggable from 'vuedraggable'
  import SceneCard from './common/SceneCard'
  import Bluebird from 'bluebird'
  import Page from './common/Page'

  export default {
    extends: Page,
    name: 'SceneWeave',
    data: function () {
      return {
        events: [],
        storyline: []
      }
    },
    components: {
      Draggable,
      SceneCard
    },
    methods: {
      loadPage () {
        Bluebird.join(
          SaveManager.instance.loadCollection('scenes.json', this.events),
          SaveManager.instance.loadCollection('storyline.json'),
          (events, storyline) => {
            storyline.forEach(id => {
              let idx = _.findIndex(this.events, {id: id})
              this.storyline.push(this.events[idx])
              this.$delete(this.events, idx)
            })
            this.$bus.$emit('loading', false)
          })
      },
      savePage () {
        return SaveManager.instance.saveCollection('storyline.json', _.map(this.storyline, 'id'))
      }
    }
  }
</script>
