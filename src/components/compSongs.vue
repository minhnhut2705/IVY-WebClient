<template>
    <div class="row">
        <h1 class="col-12 p-4 text-center fw-bold">
            All songs we have
        </h1>
        <div class="col-12 pt-4">
            <div class="row mx-1 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
                <template v-for="song in songStore.songs" :key="song">
                    <span v-if="song" class="col">
                        <span
                            class="col p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                            <span class="genreSongItem position-relative hoverPointerWhite"
                                @click="setCurrentSong(song._id)">
                                <img class="rounded w-100 genreSongItemThumbnail" :src="song.thumbnail" alt=""
                                    style="aspect-ratio: 1/1;">
                                <div class="d-flex align-items-center topSongThumbnailOverlay ">
                                    <font-awesome-icon icon="fa-solid fa-circle-play" class=" fs-1" />
                                </div>
                            </span>
                            <router-link :to="{
                                name: 'song',
                                params: { id: song._id }
                            }">
                                <span class="pt-3 mb-2 text-white w-100 genreDetailSongName">
                                    <span class=" underlineHoverEffect hoverPointerWhite fw-semi-bold fs-6">
                                        {{ song.name }}
                                    </span>
                                </span>
                            </router-link>
                            <template v-for="artist in artistStore.artists" :key="artist">
                                <router-link :to="{
                                    name: 'artist',
                                    params: { id: artist._id }
                                }">
                                    <span v-if="song.artist[0] == artist._id"
                                        class="genreDetailSongArtist fs-6 text-gray">
                                        <span class="underlineHoverEffect hoverPointerWhite">
                                            {{ artist.name }}
                                        </span>
                                    </span>
                                </router-link>
                            </template>

                        </span>
                    </span>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { useSongStore } from '../stores/songStore'
import { useArtistStore } from '../stores/artistStore'
import { useGenreStore } from '../stores/genreStore'

export default {
    setup() {
        const songStore = useSongStore()
        const artistStore = useArtistStore()
        const genreStore = useGenreStore()
        return { songStore, artistStore, genreStore }
    },
    data() {
        return {
            currentGenre: '',
            currentGenreSongs: []
        }
    },
    methods: {
        async loadGenres() {
            await this.genreStore.loadGenres()
        },
        async loadSingleGenre() {
            await this.genreStore.loadSingleGenre()
        },
        async setCurrentSong(songId) {
            await this.songStore.setCurrentSong(songId)
        },
    },
    created() {
        // this.loadGenres()
        // this.loadDetailGenre()
        this.loadSingleGenre()
    },
    mounted() {
    },
    beforeUpdate() {
        // window.addEventListener('beforeunload', this.loadDetailGenre)
    },
    updated() {

    }
}
</script>
<style scoped>
.genreSongItemThumbnail {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
}

.topSongThumbnailOverlay {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.genreSongItem:hover .topSongThumbnailOverlay {
    opacity: 1;
}

.genreSongItem:hover .genreSongItemThumbnail {
    opacity: 0.6;
}

.genreDetailSongArtist,
.genreDetailSongName {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis
}
</style>