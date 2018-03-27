<template>
        <v-dialog :width="width" :hide-overlay="hideOverlay" :value="value" @input="showChanged($event)" :persistent="persistent">
            <v-card>
                <v-card-title class="headline">{{title}}</v-card-title>
                <v-card-text>
                    <slot></slot>
                </v-card-text>
                <v-card-actions>
                    <slot name="actions"></slot>
                </v-card-actions>
            </v-card>
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
          },
          width:{}
        },
        methods : {
          showChanged(show){
            this.$emit("input",show);
          }
        }

    }
</script>
