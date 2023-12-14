<template>
    <div
        class="d-flex flex-column align-items-center align-items-start row flex-column justify-content-between mx-auto pt-1 text-white min-vh-100">
        <div class="col-12" style="height: 79vh;">
            <router-link to="/home">
                <div style="height: 10%;"
                    class="logoContainer py-1 d-flex align-items-center pb-1 mb-md-0 me-md-auto text-white text-decoration-none">
                    <h2 id="logo" class="logo d-none d-md-inline">IVY</h2>
                        <h2 class="logo d-inline d-md-none">I</h2>
                </div>
            </router-link>
            <div class="sidebarMenuSection text-sm-start text-center mb-3" style="height: 40%;">
                <div class="text-gray fw-lighter fs-8 mb-2 pt-4 ellipsisContent">
                    MENU
                </div>
                <div class="flex-column align-items-center align-items-sm-start sidebarEllipsisContent" id="menu">
                    <div class="mb-3">
                        <router-link to="/home">
                            <div v-tooltip="'Home'" class="text-gray hoverPointerWhite align-middle px-0 ellipsisContent"
                                :class="{}">
                                <font-awesome-icon icon="fa-solid fa-house-user" class="px-1 sidebarIcon" />
                                <span class="ms-1 d-none d-sm-inline fw-semi-bold p-1">Home</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="mb-3">
                        <router-link to="/artists">
                            <div v-tooltip="'Artists'"
                                class="text-gray hoverPointerWhite align-middle px-0 ellipsisContent">
                                <font-awesome-icon icon="fa-solid fa-user-astronaut" class="px-1 sidebarIcon" />
                                <span class="ms-1 d-none d-sm-inline p-1 fw-semi-bold">Artists</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="">
                        <router-link to="/songs">
                            <div v-tooltip="'Songs'" class="text-gray hoverPointerWhite align-middle px-0 ellipsisContent">
                                <font-awesome-icon icon="fa-solid fa-music" class="px-1 sidebarIcon" />
                                <span class="ms-1 d-none d-sm-inline p-1 fw-semi-bold">Songs</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-tooltip="'YOUR PLAYLIST'" class="text-gray fw-lighter fs-8 mb-2 ellipsisContent" style="height: 3%;">
                YOUR PLAYLIST
            </div>
            <div class="sidebarPlaylistSection " style="height: 40%; overflow-y: auto;">
                <div v-if="userStore.isAuthorized === true"
                    class="nav nav-pills w-100 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
                    id="menu">
                    <template v-for="playlist in playlistStore.playlists" :key="playlist._id">
                        <div class="mb-2 w-100" v-if="playlist.creator == userStore.user._id">
                            <router-link :to="{
                                name: 'playlist',
                                params: { id: playlist._id }
                            }">
                                <div v-tooltip="playlist.name"
                                    class="text-gray text-center text-sm-start px-0 hoverPointerWhite  ellipsisContent">
                                    <span class="">
                                        <font-awesome-icon icon="fa-solid fa-rectangle-list " class="px-1 sidebarIcon" />
                                    </span>
                                    <span class="ms-1 d-none fw-semi-bold d-sm-inline p-1 w-100">
                                        {{ playlist.name }}
                                    </span>
                                </div>
                            </router-link>
                        </div>
                    </template>
                </div>
                <span v-else class="text-gray fs-8 p-1 ellipsisContent">
                    Required an account
                </span>
            </div>
        </div>
        <div class="col-12 sidebarThenaDetail pb-2 " style="height: 20vh;">
            <div class="h-100 d-flex flex-column justify-content-evenly">
                <router-link to="/termsandconditions">
                    <div class="py-1 text-gray ellipsisContent">
                        <span class=" hoverPointerWhite underlineHoverEffect">
                            Terms and Conditions
                        </span>
                    </div>
                </router-link>
                <router-link to="/privacypolicy">
                    <div class="py-1 text-gray ellipsisContent">
                        <span class=" hoverPointerWhite underlineHoverEffect">
                            Privacy Policy

                        </span>
                    </div>
                </router-link>
                <div class="py-1 opacity-75 fs-8 ellipsisContent">
                    <font-awesome-icon icon="fa-solid fa-copyright" /> IVY 2023
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useUserStore } from '../stores/userStore'
import { useSongStore } from "../stores/songStore"
import { useArtistStore } from "../stores/artistStore"
import { useGenreStore } from "../stores/genreStore"
import { usePlaylistStore } from "../stores/playlistStore"
export default {
    setup() {
        const songStore = useSongStore()
        const userStore = useUserStore()
        const artistStore = useArtistStore()
        const genreStore = useGenreStore()
        const playlistStore = usePlaylistStore()
        return { userStore, songStore, artistStore, genreStore, playlistStore }
    },
    data() {
        return {
            token: {
                jwt: ""
            },
        }
    },
    components: {
    },
    methods: {
    },
    computed: {
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    }
}
</script>
<style scoped>
.sidebarEllipsisContent {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow-x: hidden !important;
    text-overflow: ellipsis
}

::-webkit-scrollbar {
    width: 5px;
    border-radius: 12px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #015D7D;
    color: #015D7D;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>