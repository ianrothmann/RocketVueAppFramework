<template>
        <v-dialog :hide-overlay="hideOverlay" :value="value" @input="showChanged($event)" :persistent="persistent">
            <rw-card :title="title">
                <slot></slot>
                <rw-card-actions>
                    <slot name="actions"></slot>
                </rw-card-actions>
            </rw-card>
        </v-dialog>

</template>
<style>

</style>
<script>
    export default{
        props : {
          persistent : {
            default : false
          },
          title : {required:true},
          value : {},
          hideOverlay : {
              type : Boolean,
              default:false
          }
        },
        methods : {
          showChanged(show){
            this.$emit("input",show);
          }
        }

    }
</script>
