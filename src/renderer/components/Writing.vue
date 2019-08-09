<template>
    <div class="columns has-background-grey-lighter">
        <div class="column is-one-quarter">
        <aside class="menu sticky book-menu border-content">
            <p class="menu-label">
                Storyline
            </p>
            <ul class="menu-list">
                <li v-for="(menu,id) in storyline" >
                    <a v-on:click="changeChapter(menu)" :class="{'is-active':menu === chapter}">{{id + 1}}. {{menu.description}}</a>
                </li>
            </ul>
        </aside>
        </div>
        <div class="column is-three-quarters" v-if="isEmpty">
            <editor-menu-bar class="wysiwyg-menu" :editor="editor" v-slot="{ commands, isActive }">
                <div class="tabs is-centered">
                    <ul>
                        <li :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                            <a>
                                <span class="icon is-small"><i class="fa fa-bold" aria-hidden="true"></i></span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                            <a>
                                <span class="icon is-small"><i class="fa fa-italic" aria-hidden="true"></i></span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                            <a>

                                <span class="icon is-small"><i class="fa fa-underline" aria-hidden="true"></i></span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">
                            <a>

                                <span class="icon is-small"><i class="fa fa-quote-left" aria-hidden="true"></i></span>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                            <a>
                                <span class="icon is-small"><i class="fa fa-list-ul" aria-hidden="true"></i></span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
                            <a>
                                <span class="icon is-small"><i class="fa fa-list-ol" aria-hidden="true"></i></span>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li @click="commands.undo">
                            <a>
                                <span class="icon is-small"><i class="fa fa-undo" aria-hidden="true"></i></span>
                            </a>
                        </li>
                        <li @click="commands.redo">
                            <a>
                                <span class="icon is-small"><i class="fa fa-repeat" aria-hidden="true"></i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </editor-menu-bar>
            <editor-content class="page content" :editor="editor" />
        </div>
        <div class="column is-three-quarters" v-else>
            <div class="notification">
                {{$t("chronology.empty")}}
            </div>
        </div>
    </div>
</template>
<script>
  import _ from 'lodash'
  import SaveManager from '@/back/SaveManager'
  import { Editor, EditorMenuBar, EditorContent } from 'tiptap'
  import { Bold, Italic, Underline, History, OrderedList, BulletList, ListItem, Blockquote } from 'tiptap-extensions'
  import Bluebird from 'bluebird'

  export default {
    name: 'Writing',
    data: function () {
      return {
        storyline: [],
        chapter: {
          description: ''
        },
        editor: new Editor({
          extensions: [
            new Bold(),
            new Italic(),
            new Underline(),
            new History(),
            new OrderedList(),
            new BulletList(),
            new ListItem(),
            new Blockquote()
          ],
          content: ``
        })
      }
    },
    created () {
      Bluebird.join(
        SaveManager.instance.loadCollection('scenes.json'),
        SaveManager.instance.loadCollection('storyline.json'),
        (events, storyline) => {
          storyline.forEach(id => {
            let idx = _.findIndex(events, { id: id })
            this.storyline.push(events[idx])
          })

          if (this.storyline.length > 0) {
            this.chapter = this.storyline[0]
            this.loadChapter()
          }
        })
    },
    methods: {
      changeChapter (el) {
        this.saveChapter(() => {
          this.chapter = el
          this.loadChapter()
        })
      },
      saveChapter (callback) {
        if (this.chapter.id) {
          SaveManager.instance.saveData(`chapter_${this.chapter.id}.html`, this.editor.getHTML()).then(callback)
        }
      },
      loadChapter () {
        SaveManager.instance.loadData(`chapter_${this.chapter.id}.html`)
        .then(data => {
          this.editor.setContent(data)
        })
        .catch(_ => {
          this.editor.setContent('')
        })
      }
    },
    computed: {
      isEmpty () {
        return this.storyline.length > 0
      }
    },
    components: {
      EditorContent,
      EditorMenuBar
    },
    beforeDestroy () {
      this.saveChapter(() => {
        this.editor.destroy()
      })
    }
  }
</script>
