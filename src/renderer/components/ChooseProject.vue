<template>
    <div class="box">
      <div class="media-content">
        <div class="content">
          <section class="section">
            <div class="container">
              <h1 class="title">{{$t('project.create')}}</h1>
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
                        {{$t('general.browse')}}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p class="control">
                <button class="button is-info" v-on:click="createProject()">
                  {{$t('project.create_confirm')}}
                </button>
              </p>
          </section>
          <section class="section">
            <div class="container">
              <h1 class="title">{{$t('project.load')}}</h1>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-info" v-on:click="chooseProject()">
                  {{$t('general.load')}}
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
</template>
<script>
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
        ProjectLoader.instance.choose()
      }
    }
  }
</script>
