// FILE: main.js

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Quasar, Dark, Meta } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
// import "@quasar/extras/material-icons/material-icons.css";

import "@quasar/extras/material-symbols-sharp/material-symbols-sharp.css";
import iconSet from 'quasar/icon-set/material-symbols-sharp.js';

// Import Quasar css
import 'quasar/dist/quasar.css'

// Import components
import App from './App.vue'
import MainLayout from './layouts/MainLayout.vue'
import IndexPage from './pages/IndexPage.vue'
import NewGame from './pages/newGame.vue'
import NewInstance from './pages/newInstance.vue'
import OngoingGame from './pages/ongoingGame.vue'
import RecordsView from './pages/recordsView.vue'
import ErrorNotFound from './pages/ErrorNotFound.vue'

// Define routes
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: 'newGame', component: NewGame },
      { path: 'newInstance', component: NewInstance },
      { path: 'ongoingGame', component: OngoingGame },
      { path: 'recordsView', component: RecordsView },
    ]
  },
  // Catch all 404s
  { path: '/:catchAll(.*)*', component: ErrorNotFound }
]

// Create router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const myApp = createApp(App)

myApp.use(router)
myApp.use(Quasar, {
  plugins: {
    Dark,
    Meta
  },
  config: {
    dark: 'auto'
  },
  iconSet: iconSet
})

myApp.mount('#app')