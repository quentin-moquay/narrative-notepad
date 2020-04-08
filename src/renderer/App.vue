<template>
  <div id="app" class="ui centered grid">
      <div id="program-menu">
          <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                  <span class="button" aria-haspopup="true" aria-controls="dropdown-menu1">
                      <span>{{$t('file.label')}}</span>
                      <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                  </span>
              </div>
              <div class="dropdown-menu" id="dropdown-menu1" role="menu">
                  <div class="dropdown-content">
                      <div class="dropdown-item columns" v-on:click="exitProgram">
                          <i class="fa fa-close column is-2" aria-hidden="true"></i>
                          <span class="dropdown column is-10">{{$t('file.exit')}}</span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                  <span class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                      <span>{{$t('project.label')}}</span>
                      <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                  </span>
              </div>
              <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                  <div class="dropdown-content">
                      <div class="dropdown-item columns" v-on:click="chooseProject">
                          <i class="fa fa-folder-open-o column is-2" aria-hidden="true"></i>
                          <span class="dropdown column is-10">{{$t('project.load')}}</span>
                      </div>
                      <div class="dropdown-item columns" v-on:click="saveProject" :class="isChooseProject ? 'disabled' : ''">
                          <i class="fa fa-save column is-2" aria-hidden="true"></i>
                          <span class="dropdown column is-10">{{$t('project.save')}}</span>
                      </div>
                      <div class="dropdown-item columns" v-on:click="closeProject" :class="isChooseProject ? 'disabled' : ''">
                          <i class="fa fa-times column is-2" aria-hidden="true"></i>
                          <span class="dropdown column is-10">{{$t('project.close')}}</span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="dropdown is-hoverable" v-if="!isChooseProject">
              <div class="dropdown-trigger">
                  <span class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                      <span>{{$t('export.label')}}</span>
                      <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                  </span>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div class="dropdown-content">
                      <div class="dropdown-item columns" v-on:click="exportPdf">
                          <i class="fa fa-file-pdf-o column is-2" aria-hidden="true"></i>
                          <span class="dropdown column is-10">{{$t('export.pdf')}}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <nav class="tabs is-fullwidth" v-if="!isChooseProject">
          <ul>
          <li v-for="item in menu" v-bind:key="item" :class="{'is-active':item === currentTab}">
              <a @click="change(item)">{{ $t(item+".title") }}</a>
          </li>
          </ul>
      </nav>
      <section class="hero">
          <div class="hero-body">
            <choose-project v-if="isChooseProject"/>
            <brainstorm v-if="currentTab === menu[0]" />
            <character-list v-if="currentTab === menu[1]" />
            <universe v-if="currentTab === menu[2]" />
            <chronology v-if="currentTab === menu[3]" />
            <scene-weave v-if="currentTab === menu[4]" />
            <writing v-if="currentTab === menu[5]" />
          </div>
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
  import ExportPdf from '@/back/ExportPdf'
  import ChooseProject from './components/ChooseProject'
  import ProjectLoader from './back/ProjectLoader'
  import {ipcRenderer} from 'electron'

  export default {
    name: 'narrative-notepad',
    components: {
      Writing,
      SceneWeave,
      Chronology,
      Universe,
      Brainstorm,
      CharacterList,
      ChooseProject
    },
    data: function () {
      return {
        currentTab: 'brainstorm',
        menu: ['brainstorm', 'character_list', 'universe', 'chronology', 'scene_weave', 'writing']
      }
    },
    methods: {
      change: function (event) {
        this.currentTab = event
      },
      setCurrentTab (currentTab) {
        this.currentTab = currentTab
      },
      chooseProject () {
        ProjectLoader.instance.choose()
      },
      saveProject () {
        if (!this.isChooseProject) {
          ProjectLoader.instance.save()
            .then(a => {
              alert('Saved.')
            })
            .catch(a => {
              alert('Error')
            })
        }
      },
      closeProject () {
        ProjectLoader.instance.close()
      },
      exportPdf () {
        if (!this.isChooseProject) {
          ExportPdf.instance.exportPdf()
        }
      },
      exitProgram () {
        ProjectLoader.instance.save().then(a => {
          ipcRenderer.send('closed')
        })
      }
    },
    computed: {
      isChooseProject () {
        return this.currentTab === 'choose-project'
      }
    },
    created: function () {
      this.currentTab = 'choose-project'
      ProjectLoader.instance.init(this)
    }
  }
</script>
<style scoped>
    .dropdown {
        border: 0;
        margin: 0;
        height: 100%;
        border-radius: 0;
    }
    .dropdown-item {
        cursor: pointer;
        padding: 0;
        border-radius: 0;
        width: 100%;
    }
    .dropdown-item.disabled {
        opacity: .5;
        cursor: not-allowed;
    }

    .dropdown-item i {
        padding-left: 2em;
    }

    #program-menu {
        width: 100%;
        background-color: #282828;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .dropdown-trigger .button {
        border: 0;
        border-radius: 0;
        background-color: #282828;
        color: whitesmoke;
    }
</style>