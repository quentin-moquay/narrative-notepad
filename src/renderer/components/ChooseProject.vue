<template>
    <div class="box">
      <div class="media-content">
        <div class="content">
          <section class="section">
            <div class="container">
              <h1 class="title">Create a new project</h1>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field is-expanded">
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <input class="input" type="text" v-model="projectName">
                    </div>
                    <p class="control">
                      <button class="button is-link" v-on:click="chooseNewProject()">
                        Choose directory from File system
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p class="control">
                <button class="button is-info" v-on:click="createProject()">
                  Create new project
                </button>
              </p>
          </section>
          <section class="section">
            <div class="container">
              <h1 class="title">Load an existing project</h1>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-info" v-on:click="chooseProject()">
                  Load a project
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
</template>
<script>
  import _ from 'lodash'
  import CustomText from '@/components/Ui/CustomText'
  import ProjectLoader from '@/back/ProjectLoader'
  const {dialog} = require('electron').remote

  export default {
    name: 'ChooseProject',
    components: {
      CustomText
    },
    data: function () {
      return {
        projectName: 'H:\\narrative-notepad-test',
        projects: []
      }
    },
    methods: {
      createProject () {
        ProjectLoader.instance.initProject(this.projectName).then(callback => this.$emit('project'))
      },
      chooseNewProject () {
        dialog.showSaveDialog({
          filters: [
            { name: 'Narrative Files', extensions: ['tar'] }
          ],
          defaultPath: this.projectName
        }, result => {
          if (result) {
            this.projectName = result
          }
        })
      },
      chooseProject () {
        dialog.showOpenDialog({
          filters: [
            { name: 'Narrative Files', extensions: ['tar'] }
          ]})
          .then(project => {
            if (project === undefined || _.size(project.filePaths) === 0) {
              console.log('No file selected')
              return
            }
            console.log(project.filePaths[0])
            ProjectLoader.instance.load(project.filePaths[0]).then(callback => this.$emit('project'))
          })
      }
    }
  }
</script>
