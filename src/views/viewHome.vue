<template>
    <div class="container-fluid row mx-0 px-0 vh-100">
        <div id="sidebar" ref="sidebar" class="col-2 px-0 bg-light-ocean-gradient-to-top position-fixed"
            style="z-index: 100; border-right: 1px solid #5c5b5b;">
            <Sidebar></Sidebar>
        </div>
        <div ref="contentContainer" class="col-10 px-4 bg-light-ocean-gradient-to-top position-realtive"
            :style="{ 'margin-left': sidebarWidth + 'px' }">
            <div id="header" ref="header" class="row position-fixed bg-transparent"
                :style="{ 'margin-left': sidebarWidth + 'px' }">
                <Header></Header>
            </div>
            <div id="content" class="row h-auto px-0" ref="content"
                :style="{ 'margin-top': headerHeight + 'px', 'margin-bottom': playerHeight + 'px' }">
                <div class="col-12 px-0">

                    <!-- <homeContent></homeContent> -->
                    <router-view></router-view>
                </div>
            </div>
            <div id="player" ref="player" class="row bg-transparent position-fixed fixed-bottom"
                :style="{ marginLeft: sidebarWidth + 'px' }">
                <Player></Player>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "../components/compSidebar.vue"
import Header from "../components/compHeader.vue"
import Player from "../components/compPlayer.vue"

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
            headerHeight: 0,
            sidebarWidth: 0,
            playerHeight: 0,
            token: {
                jwt: ""
            },
        }
    },
    components: {
        Sidebar,
        Header,
        Player,
        // Loader
    },
    methods: {
        matchHeight() {
            this.headerHeight === this.$refs.header.offsetHeight ? this.headerHeight : this.headerHeight = this.$refs.header.offsetHeight;
            this.sidebarWidth = this.$refs.sidebar.offsetWidth;
            this.playerHeight = this.$refs.player.clientHeight;
        },
        async loadGenres() {
            await this.genreStore.loadGenres()
        },
        async loadSongs() {
            await this.songStore.loadSongs()
        },
        async loadArtists() {
            await this.artistStore.loadArtists()
        },
        async loadPlaylists() {
            await this.playlistStore.loadPlaylists()
        },
        async loadUsers() {
            await this.userStore.loadUsers()
        },
        setToken() {
            const itoken = localStorage.getItem('jwt')
            if (itoken) {
                this.token.jwt = itoken
            } else {
                this.token.jwt = "none"
            }
        },
        async getUserData() {
            if (this.token.jwt != "none") {
                await this.userStore.fetchUser(this.token)
                // this.userStore.isAuthorized = true
            } else {
                this.userStore.isAuthorized = false
            }
        },
    },
    computed: {
    },
    watch: {
        '$route'() {
            this.headerHeight = 0;
            this.sidebarWidth = 0;
            this.playerHeight = 0;
        },
    },
    beforeCreate() {
    },
    async created() {
        window.addEventListener("resize", this.matchHeight);
        this.loadGenres();
        this.loadArtists();
        await this.loadSongs();
        this.loadPlaylists()
        this.loadUsers()
        this.songStore.getRecent()
        this.songStore.playing = [...this.songStore.songs]

    },
    beforeMount() {
    },
    mounted() {
        this.matchHeight()
        this.setToken()
        this.getUserData()
    },
    beforeUpdate() {
    },
    updated() {
        this.matchHeight()
        window.addEventListener("load", this.matchHeight);

        // this.setToken()
        // this.getUserData()
    }
}
</script>

<style>
#header {
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}
</style>