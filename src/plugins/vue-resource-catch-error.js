import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.interceptors.push((request, next)=>{


    next(response=>{
        if(response.status!==200){
            Vue.prototype.$snackbar('An error has occurred','error');
            console.error(response.statusText);
        }
    });
});