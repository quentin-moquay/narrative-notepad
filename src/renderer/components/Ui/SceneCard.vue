<template>
<span>
    <header class="card-header">
        <p class="card-header-title">{{value.order}}</p>
    </header>
    <div class="card-content">
        <div class="content" v-if="editable === false">
            {{value.description}} {{value.place}}
        </div>
        <div class="content" v-if="editable">
            <div class="field-body">
                <custom-text name="scene.description" v-bind:decorated="false" v-model="value.description" />
                <custom-text name="scene.place" v-bind:decorated="false" v-model="value.place" />
            </div>
        </div>
    </div>
    <footer class="card-footer" v-if="editable">
        <button class="button" v-on:click="$emit('edit', value.id)">
            <i class="fa fa-edit"></i>
        </button>
        <button class="button" v-on:click="$emit('delete', value.id)">
            <i class="fa fa-remove"></i>
        </button>
    </footer>
</span>
</template>
<script>
    import CustomText from '@/components/Ui/CustomText'

    export default {
      name: 'SceneCard',
      props: {
        editable: {
          type: Boolean,
          default: false
        },
        value: Object
      },
      components: {
        CustomText
      }
    }
</script>
