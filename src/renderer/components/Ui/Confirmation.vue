<template>
    <div v-if="visible" class="modal is-active is-clipped">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title"><i class="fa fa-warning"></i></p>
                <button class="delete" aria-label="close" v-on:click="$emit('cancel', id)"></button>
            </header>
            <section class="modal-card-body">
                <p>{{$t(message)}}</p>
            </section>
            <footer class="modal-card-foot">
                <button class="button" v-on:click="$emit('cancel', id)">{{ $t("general.cancel") }}</button>
                <button class="button is-success" v-on:click="$emit('confirm', id)">{{ $t("general.confirm") }}</button>
            </footer>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'Confirmation',
      props: {
        id: Number,
        message: String,
        visible: Boolean
      }
    }
</script>
