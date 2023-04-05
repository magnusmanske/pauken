'use strict';

let router ;
let app ;
let wd = new WikiData() ;

let subjects = {} ;

$(document).ready ( function () {

    vue_components.toolname = 'pauken' ;
    Promise.all ( [
        vue_components.loadComponents ( ['wd-date','wd-link','tool-translate','tool-navbar','commons-thumbnail','widar','autodesc','typeahead-search','value-validator',
            'vue_components/entry.html',
            'vue_components/main-page.html',
            'vue_components/learn-page.html',
            ] )
    ] )
    .then ( () => {
        const routes = [
            { path: '/', component: MainPage , props:true },
            { path: '/learn/:items_param', component: LearnPage , props:true },
            { path: '/learn/:items_param/:learn_language', component: LearnPage , props:true },
            ] ;
        router = new VueRouter({routes}) ;
        app = new Vue ( { router } ) .$mount('#app') ;
    } ) 
} ) ;
