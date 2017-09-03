<template>
    <div>

        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOptions"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
        >
        </quill-editor>
    </div>
</template>
<script>
    export default{
        props : {
            value : {type:String},
            label : {type:String},
            name : {type:String},
            editorOptions : {type:Object},
        },
        inject: ['$validator'],
        render(h){
            return h('div', data, [h('label', {}, c.props.label), h('div', {'class': 'input-group__input'}, [h('span', {
                'class': {
                    'rw-label': true,
                    'grey--text': isPlaceholder,
                    'text--lighten-2': isPlaceholder,
                }
            }, children)])]);
          return h('v-card',{},[h('v-card-text',{},this.$slots.default)]);
        }
    }
</script>
