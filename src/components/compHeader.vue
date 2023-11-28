<template>
    <div class="col-12 bg-light-ocean-gradient py-1 px-4" style="box-shadow: 0px 2px 1px -1px #888;">
        <div class="row">
            <div class="px-0 col-lg-8 col-6 bg-transparent">
                <form class="d-flex formSearch rounded-pill" role="search">
                    <input class="searchInput border-none rounded-pill bg-transparent form-control" type="search"
                        ref="searchInput" placeholder="Search" aria-label="Search" v-model="searchQuery"
                        @keyup="resultQuery" v-click-outside="onClickOutside">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass inputIcon"
                        class="fs-5 m-auto px-3 d-inline-block" />
                </form>
            </div>
            <div class="col-lg-4 col-6 d-flex justify-content-end">
                <div v-if="userStore.isAuthorized"
                    class="userSection text-white text-decoration-none bg-transparent p-1 rounded hoverPointerWhite"
                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img :src="userStore.user.avatar" alt="hugenerd" width="30" height="30"
                        class="rounded-circle col-auto userAvatar"
                        style="aspect-ratio: 1/1; object-fit: cover; object-position: -10% 0%;">
                    <span v-if="userStore.user.userName"
                        class="d-none userName hoverPointerWhite d-md-inline col text-gray p-2">{{
                            userStore.user.userName
                        }}</span>
                </div>
                <div v-else class="userSection bg-transparent p-2 rounded">
                    <router-link to="/register">
                        <span class="fw-semi-bold hoverPointerWhite text-decoration-none text-gray">
                            Register
                        </span>
                    </router-link>
                    <span>
                        &nbsp;
                    </span>
                    <span class="text-white fw-bold">
                        |
                    </span>
                    <span>
                        &nbsp;
                    </span>
                    <router-link to="/login">
                        <span class="fw-semi-bold hoverPointerWhite text-decoration-none text-gray">
                            Login
                        </span>
                    </router-link>
                </div>
                <ul v-if="userStore.isAuthorized" class="dropdown-menu dropdown-menu-dark bg-light-ocean text-small shadow">
                    <router-link class="dropdown-item hoverPointerWhite" to="/upload">New song</router-link>
                    <router-link class="dropdown-item hoverPointerWhite" to="/user/profile">Profile</router-link>
                    <router-link v-if="userStore.user.role === 'admin'" class="dropdown-item hoverPointerWhite"
                        to="/admin/dashboard">Dashboard</router-link>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li class="dropdown-item hoverPointerWhite" @click="signOut">Sign out</li>
                </ul>
            </div>
        </div>
        <table class="table w-50 mt-1 h-auto row position-fixed overflow-auto border-bottom text-dark"
                                    style="border-radius: 1px 0 3px 4px !important; max-height: 50% !important; background-color:  rgba(16, 15, 27, 0.95) !important;"
            v-if="Object.keys(searchResult).length > 0" v-click-outside="onClickOutside">
            <tbody class="w-100">
                <template v-for="item in searchResult" :key="item">
                    <router-link :to="{
                        name: 'song',
                        params: { id: item.id }
                    }">
                        <tr class="text-gray row d-flex justify-content-center align-items-center searchResultItem"
                            v-if="item.type === 'Song'">
                            <td class="col-md-1 col-2 py-1 px-lg-12 px-0">
                                <img class="w-100 border" :src="item.image" alt=""
                                    style="border-radius: 5%; aspect-ratio: 1/1;">
                            </td>
                            <td class="col-md-9 col-7 py-1">
                                <span class="ellipsisContent">
                                    {{ item.name }}
                                </span>
                            </td>
                            <td class="col-md-2 col-3 text-end">
                                <span>
                                    {{ item.type }}
                                </span>
                            </td>
                        </tr>
                    </router-link>
                    <router-link :to="{
                        name: 'artist',
                        params: { id: item.id }
                    }">
                        <tr class="text-gray row d-flex justify-content-center align-items-center searchResultItem"
                            v-if="item.type === 'Artist'">
                            <td class="col-md-1 col-2 py-1 px-lg-12 px-0">
                                <img class="w-100 border" :src="item.image" alt=""
                                    style="border-radius: 5%; aspect-ratio: 1/1;">
                            </td>
                            <td class="col-md-9 col-7 py-1">
                                <span class="ellipsisContent">
                                    {{ item.name }}
                                </span>
                            </td>
                            <td class="col-md-2 col-3 text-end">
                                <span>
                                    {{ item.type }}
                                </span>
                            </td>
                        </tr>
                    </router-link>
                    <router-link :to="{
                        name: 'playlist',
                        params: { id: item.id }
                    }">
                        <tr class="text-gray row d-flex justify-content-center align-items-center searchResultItem"
                            v-if="item.type === 'Playlist'">
                            <td class="col-md-1 col-2 py-1 px-lg-12 px-0">
                                <img class="w-100 border" :src="item.image" alt=""
                                    style="border-radius: 5%; aspect-ratio: 1/1;">
                            </td>
                            <td class="col-md-9 col-7 py-1">
                                <span class="ellipsisContent">
                                    {{ item.name }}
                                </span>
                            </td>
                            <td class="col-md-2 col-3 text-end">
                                <span>
                                    {{ item.type }}
                                </span>
                            </td>
                        </tr>
                    </router-link>
                    <router-link :to="{
                        name: 'genre',
                        params: { id: item.id }
                    }">
                        <tr class="text-gray row d-flex justify-content-center align-items-center searchResultItem"
                            v-if="item.type === 'Genre'">
                            <td class="col-md-10 col-9 py-1">
                                <span class="ellipsisContent">
                                    {{ item.name }}
                                </span>
                            </td>
                            <td class="col-md-2 col-3 text-end">
                                <span>
                                    {{ item.type }}
                                </span>
                            </td>
                        </tr>
                    </router-link>
                </template>
            </tbody>
        </table>
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
            searchQuery: null,
            searchResult: []
        }
    },
    methods: {
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
                // this.user = user
                this.userStore.isAuthorized = true
            } else {
                this.userStore.isAuthorized = false
            }
        },
        async signOut() {
            await this.userStore.signOut()
        },
        resultQuery() {
            this.searchResult = []
            if (this.searchQuery) {
                this.songStore.songs.filter((item) => {
                    if (item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        this.searchResult.push({
                            id: item._id,
                            name: item.name,
                            type: 'Song',
                            image: item.thumbnail
                        })
                    }
                })
                this.artistStore.artists.filter((item) => {
                    if (item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        this.searchResult.push({
                            id: item._id,
                            name: item.name,
                            type: 'Artist',
                            image: item.avatar
                        })
                    }
                })
                this.playlistStore.playlists.filter((item) => {
                    if (item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        this.searchResult.push({
                            id: item._id,
                            name: item.name,
                            type: 'Playlist',
                            image: item.thumbnail

                        })
                    }
                })
                this.genreStore.genres.filter((item) => {
                    if (item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        this.searchResult.push({
                            id: item._id,
                            name: item.name,
                            type: 'Genre',
                        })
                    }
                })
            }
        },
        onClickOutside() {
            this.searchResult = []
        }
    },
    computed: {

    },
    created() {
        this.setToken()
        this.getUserData()
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
        this.setToken()
        // this.getUserData()
    }
}
</script>
<style scoped>
::-webkit-scrollbar {
    width: 10px;
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

.searchInput {
    box-shadow: none !important;
}

.searchInput:placeholder-shown {
    color: #D3D3D3;
}
.searchInput::placeholder {
    color: #D3D3D3;
}

.userName {
    white-space: nowrap;
    width: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.userSection,
.formSearch {
    border: 2px solid #0E3343 !important;
}

.userSection::after {
    display: none;
}

.searchResultItem {
    background-color: rgba(16, 15, 27, 0.95) !important;
    color: white;
}
.searchResultItem:hover {
    background-color: #256D85 !important;
}

input,
select,
textarea {
    color: white !important;
}
</style>