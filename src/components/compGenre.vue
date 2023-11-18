<template>
    <div class="row">
        <template v-for="genre in genreStore.genres" :key="genre">
            <!-- Match genre with ID params -->
            <template v-if="genre._id === $route.params.id">
                <div class="col-12 px-3 pb-4  text-center">
                    <span class="fw-bold text-white" style="font-size: 4.8rem;">
                        {{ genre.name }}
                    </span>
                </div>
                <div class="col-12 pt-4">
                    <div class="row mx-1 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
                        <!-- Find song in song store match with songID in genre.songs -->
                        <template v-for="songID in genre.songs" :key="songID">
                            <template v-for="song in songStore.songs" :key="song">
                                <span v-if="songID === song._id" class="col">
                                    <!-- Find artist in artist store match with artistID in song.artist above -->
                                    <template v-for="artist in artistStore.artists" :key="artist">
                                        <span v-if="song.artist[0] === artist._id"
                                            class="col p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom"
                                            :class="{'bg-light-ocean': song._id === songStore.playing[songStore.currentSong]._id}">
                                            <span class="genreSongItem position-relative hoverPointerWhite"
                                                @click="toggleControls"
                                                v-if="song._id === songStore.playing[songStore.currentSong]._id && songStore.isPlaying === true">
                                                <img class="rounded w-100 genreSongItemThumbnail" :src="song.thumbnail"
                                                    alt="" style="aspect-ratio: 1/1;">
                                                <div class="d-flex align-items-center topSongThumbnailOverlay ">
                                                    <font-awesome-icon icon="fa-solid fa-circle-pause"
                                                        class="hoverPointerWhite fs-1" />
                                                </div>
                                            </span>
                                            <span v-else class="genreSongItem position-relative hoverPointerWhite"
                                                @click="setCurrentSong(songID, genre.songs, genre._id)">
                                                <img class="rounded w-100 genreSongItemThumbnail" :src="song.thumbnail"
                                                    alt="" style="aspect-ratio: 1/1;">
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
                                            <router-link :to="{
                                                name: 'artist',
                                                params: { id: artist._id }
                                            }">
                                                <span class="genreDetailSongArtist fs-6 text-gray">
                                                    <span class="underlineHoverEffect hoverPointerWhite">
                                                        {{ artist.name }}
                                                    </span>
                                                </span>
                                            </router-link>
                                        </span>
                                    </template>
                                </span>
                            </template>
                        </template>
                    </div>
                </div>
            </template>
        </template>
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
        }
    },
    methods: {
        async setCurrentSong(songId, genreSongs, genreId) {
            this.songStore.setPlayingSongs(genreSongs, genreId)
            await this.songStore.setCurrentSong(songId)
        },
        toggleControls() {
            this.songStore.isPlaying = !this.songStore.isPlaying
        },
    },
    created() {
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