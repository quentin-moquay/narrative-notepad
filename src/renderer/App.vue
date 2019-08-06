<template>
  <div id="app" class="ui centered grid">
      <nav class="navbar is-fixed-top is-primary">
          <a v-for="item in menu" class="navbar-item" :class="{'is-active':item === selected}" @click="change(item)">
              {{ $t(item+".title") }}
          </a>
      </nav>
      <section class="section">
        <brainstorm v-if="selected === menu[0]" />
        <character-list v-if="selected === menu[1]" />
        <universe v-if="selected === menu[2]" />
        <chronology v-if="selected === menu[3]" />
        <scene-weave v-if="selected === menu[4]" />
        <writing v-if="selected === menu[5]" />
        <export v-if="selected === menu[6]" />
      </section>
  </div>
</template>

<script>
  import Brainstorm from '@/components/Brainstorm'
  import CharacterList from '@/components/CharacterList'
  import Chronology from '@/components/Chronology'
  import Universe from '@/components/Universe'
  import SceneWeave from './components/SceneWeave'
  import Writing from './components/Writing'
  import Export from './components/Export'

  export default {
    name: 'narrative-notepad',
    components: {
      Export,
      Writing,
      SceneWeave,
      Chronology,
      Universe,
      Brainstorm,
      CharacterList
    },
    data: function () {
      return {
        selected: 'export',
        menu: ['brainstorm', 'character_list', 'universe', 'chronology', 'scene_weave', 'writing', 'export']
      }
    },
    methods: {
      change: function (event) {
        this.selected = event
      }
    }
  }
</script>
