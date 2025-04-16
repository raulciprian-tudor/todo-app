import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import App from './App.vue'

const app = createApp(App)

library.add(faCheck, faXmark, faTrash)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)


app.mount('#app')
