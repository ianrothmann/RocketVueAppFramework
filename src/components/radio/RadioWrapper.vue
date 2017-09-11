<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeabledark'
    export default{
        mixins : [Contextualable],
        functional : true,
        props : {
            disabled: Boolean,
            value: null,
            label: String,
            color : String,
            light : Boolean,
            dark : Boolean
        },
        render(h,c){

            const data=c.data || {};
            data.props=c.props;

            return h('v-radio',data);
        }
    }
</script>
