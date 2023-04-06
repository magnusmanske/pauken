'use strict';

let router ;
let app ;
let wd = new WikiData() ;
let language_codes = {};
let browser_language = navigator.language.replace(/-.*$/,'');

$(document).ready ( function () {

    vue_components.toolname = 'pauken' ;
    Promise.all ( [
        vue_components.loadComponents ( ['wd-date','wd-link','tool-translate','tool-navbar','commons-thumbnail','widar','autodesc','typeahead-search','value-validator',
            'vue_components/entry.html',
            'vue_components/main-page.html',
            'vue_components/learn-page.html',
            ] ),
        new Promise((resolve, reject) => { // Load language codes
            let sparql = "SELECT ?language ?language_code { ?language wdt:P31 wd:Q34770 ; wdt:P218 ?language_code }";
            let url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent ( sparql ) ;
            $.get ( url , function ( d ) {
                $.each ( d.results.bindings , function ( k , v ) {
                    let item = v.language.value.replace(/^.+\/Q/,'Q');
                    let code = v.language_code.value;
                    language_codes[item] = code;
                } )
                resolve();
            } )
        }),


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
