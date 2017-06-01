<template>
        <v-dialog :hide-overlay="true" :value="value" @input="showChanged($event)" :persistent="persistent">
            <v-card>
                <v-card-row>
                    <v-card-title v-html="title"></v-card-title>
                </v-card-row>
                <v-card-row>
                    <v-card-text>
                        <slot></slot>
                    </v-card-text>
                </v-card-row>
                <v-card-row actions>
                    <slot name="actions"></slot>
                </v-card-row>
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
          value : {}
        },
        data(){
            return{

            }
        },
        methods : {
          showChanged(show){
            this.$emit("input",show);
          }
        }

    }
</script>
