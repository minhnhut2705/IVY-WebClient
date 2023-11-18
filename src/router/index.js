import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/viewHome.vue";
import Login from "../views/viewLogin.vue";
import Register from "../views/viewRegister.vue";
import NotFound from "../views/viewNotFound.vue";

import Genre from "../components/compGenre.vue";
import HomeContent from "../components/compHomeContent.vue";
import Song from "../components/compSong.vue"
import Artist from "../components/compArtist.vue"
import Playlist from "../components/compPlaylist.vue"
import Upload from "../components/compUpload.vue"
import Profile from "../components/compUserProfile.vue"
import AdminDashboard from "../components/compAdminDashboard.vue"
import TermsAndConditions from "../components/compTermsAndConditions.vue"
import PrivacyPolicy from "../components/compPrivacyPolicy.vue"
import Artists from "../components/compArtists.vue"
import Songs from "../components/compSongs.vue"

const routes = [
  {
    path: "/",
    name: "home",
    alias: "/home",
    component: Home,
    children: [
      {
        path: '',
        name: 'discover',
        component: HomeContent,
      },
      {
        path: 'genre/:id',
        name: "genre",
        component: Genre,
      },
      {
        path: 'song/:id',
        name: "song",
        component: Song,
      },
      {
        path: 'artist/:id',
        name: "artist",
        component: Artist,
      },
      {
        path: 'playlist/:id',
        name: "playlist",
        component: Playlist,
      },
      {
        path: 'upload',
        name: "upload",
        component: Upload,
      },
      {
        path: 'user/profile',
        name: "profile",
        component: Profile,
      },
      {
        path: 'admin/dashboard',
        name: "dashboard",
        component: AdminDashboard,
      },
      {
        path: 'termsandconditions',
        name: "termsandconditions",
        component: TermsAndConditions,
      },
      {
        path: 'privacypolicy',
        name: "privacypolicy",
        component: PrivacyPolicy,
      },
      {
        path: 'artists',
        name: "artists",
        component: Artists,
      },
      {
        path: 'songs',
        name: "songs",
        component: Songs,
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    alias: "/register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    alias: "/login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name != 'home') {
    const newTitle = to.name.charAt(0).toUpperCase() + to.name.slice(1)
    document.title = 'IVY - ' + newTitle
  } else {
    document.title = 'IVY'
  }
  next()
})
export default router;
