import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.interceptors.push((request, next)=>{
    Vue.prototype.$addactivity(request.url);
    next(response=>{
        Vue.prototype.$removeactivity(request.url);
    });
});