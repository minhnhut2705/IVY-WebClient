import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import vClickOutside from "click-outside-vue3"
import Toaster from "@meforma/vue-toaster";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import {
    faHouseUser,
    faCompactDisc,
    faHeadphonesSimple,
    faMusic,
    faRectangleList,
    faMagnifyingGlass,
    faHeart,
    faDownload,
    faBackwardStep,
    faBackward,
    faPlay,
    faPause,
    faForward,
    faForwardStep,
    faShuffle,
    faRepeat,
    faVolumeHigh,
    faVolumeXmark,
    faCopyright,
    faTriangleExclamation,
    faCircleExclamation,
    faCirclePlay,
    faCirclePause,
    faSquarePlus,
    faCloudArrowUp,
    faPen,
    faTrash,
    faPlus,
    faUserGroup,
    faArrowRight,
    faUserAstronaut,
    faCameraRetro,
    faEyeSlash,
    faEye,
    faListCheck,
    faUser,
    faUserClock,
    faHouseChimney
} from '@fortawesome/free-solid-svg-icons'


library.add(
    faHouseUser,
    faCompactDisc,
    faHeadphonesSimple,
    faMusic,
    faRectangleList,
    faMagnifyingGlass,
    faHeart,
    faDownload,
    faBackwardStep,
    faBackward,
    faPlay,
    faPause,
    faForward,
    faForwardStep,
    faShuffle,
    faRepeat,
    faVolumeHigh,
    faVolumeXmark,
    faCopyright,
    faTriangleExclamation,
    faCircleExclamation,
    faCirclePlay,
    faCirclePause,
    faSquarePlus,
    faCloudArrowUp,
    faPen,
    faTrash,
    faPlus,
    faUserGroup,
    faArrowRight,
    faUserAstronaut,
    faCameraRetro,
    faEyeSlash,
    faEye,
    faListCheck,
    faUser,
    faUserClock,
    faHouseChimney
)

const pinia = createPinia();
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).use(Toaster).use(FloatingVue).use(vClickOutside).mount('#app')
