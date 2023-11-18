<template>
    <div class="row px-0">
        <template v-for="artist in artistStore.artists" :key="artist">
            <span class="col-12 px-0 position-relative" v-if="artist._id === $route.params.id">
                <img class="px-0 w-100 artistAvatar" :src="artist.avatar" alt="" style="aspect-ratio: 1/1;">
                <span class="text-white w-100 row p-4 position-absolute bottom-0" style="left: 0;">
                    <span class="ellipsisContent col-12" style="font-size: 6rem; font-weight: 700;">
                        {{ artist.name }}
                    </span>
                    <div class="col-12">
                        <span class="fs-5 d-flex align-items-center row" :set="artistStream = loadArtistStream()">
                            <a class="col-1 w-auto pe-0" :href="artist.instagram">
                                <img style="width: 2rem; height: 2rem; aspect-ratio: 1/1"
                                    src="https://firebasestorage.googleapis.com/v0/b/athena-4d002.appspot.com/o/img%2Fartists%2FInstagram_icon.png.webp?alt=media&token=d6466886-dd2b-48c7-a21b-712a29c52a07"
                                    alt="">
                            </a>
                            <span class="col-1 w-auto">
                                &#9679;
                            </span>
                            <span class="col-1 px-0 d-flex align-items-center">
                                <span class="w-100 my-auto ellipsisContent">
                                    {{ Object.keys(artist.songs).length }} songs
                                </span>
                            </span>
                            <span class="col-1 w-auto">
                                &#9679;
                            </span>
                            <span class="col-1 px-0 d-flex align-items-center">
                                <span class="w-100 my-auto ellipsisContent">
                                    {{ artistStream }} streams
                                </span>
                            </span>
                            <span class="col-1 w-auto">
                                &#9679;
                            </span>
                            <span class="col-4 px-0 d-flex align-items-center">
                                <span class="w-100 my-auto ellipsisContent">
                                    Join with us at:
                                    {{ new Date(artist.createdAt).getDate() + " " + new
                                        Date(artist.createdAt).toLocaleString('default', { month: 'long' }) + " " + new
                                            Date(artist.createdAt).getFullYear()
                                    }}
                                </span>
                            </span>
                            <span class="col-4">

                            </span>
                        </span>
                    </div>
                </span>
            </span>

        </template>
        <span class="col-12 p-3">
            <span class="row w-100 fw-semi-bold fs-4 px-3 pb-3 pb-md-4">
                All songs
            </span>
            <template v-for="artist in artistStore.artists" :key="artist">
                <span class="row w-100 row-cols-md-4 row-cols-sm-3 row-cols-2 row-cols-lg-5 fw-semi-bold fs-4 px-lg-3 mx-0"
                    v-if="artist._id === $route.params.id">
                    <template v-for="songIdOfArtist in artist.songs" :key="songIdOfArtist">
                        <template v-for="song in songStore.songs" :key="song">
                            <span v-if="songIdOfArtist === song._id" class="col">
                                <span
                                    class="p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom"
                                    :class="{'bg-light-ocean': song._id === songStore.playing[songStore.currentSong]._id}">
                                    <span class="w-100 songItem position-relative">
                                        <img class="rounded w-100 songItemImage" :src="song.thumbnail" alt=""
                                            style="aspect-ratio: 1/1;">
                                        <div class="d-flex align-items-center songThumbnailOverlay">
                                            <font-awesome-icon
                                                v-if="song._id === songStore.playing[songStore.currentSong]._id && songStore.isPlaying === true"
                                                icon="fa-solid fa-circle-pause" class="hoverPointerWhite fs-1" @click="toggleControls" />
                                            <font-awesome-icon v-else icon="fa-solid fa-circle-play"
                                                class="hoverPointerWhite fs-1"
                                                @click="setCurrentSong(song._id, artist.songs, artist._id)" />
                                        </div>
                                    </span>
                                    <span class="pt-3 pb-2 w-100">
                                        <router-link :to="{
                                            name: 'song',
                                            params: { id: song._id }
                                        }">
                                            <span class="ellipsisContent text-white fw-semi-bold fs-6">
                                                <span class="underlineHoverEffect fw-semi-bold hoverPointerWhite">
                                                    {{ song.name }}
                                                </span>
                                            </span>
                                        </router-link>
                                    </span>
                                    <span class="fs-6 ellipsisContent">
                                        {{ new Date(song.createdAt).getDate() + " " + new
                                            Date(song.createdAt).toLocaleString('default', {
                                                month:
                                                    'long'
                                            }) + " " + new Date(song.createdAt).getFullYear()
                                        }}
                                    </span>
                                </span>
                            </span>
                        </template>
                    </template>
                </span>
            </template>
        </span>
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
        loadArtistStream() {
            var streams = 0
            this.artistStore.artists.forEach(artist => {
                if (artist._id === this.$route.params.id) {
                    artist.songs.forEach(songIdOfArtist => {
                        this.songStore.songs.forEach(song => {
                            if (songIdOfArtist === song._id) {
                                streams += song.stream
                            }
                        })
                    })
                }
            });
            return streams
        },
        async setCurrentSong(songId, artistSongs, artistId) {
            this.songStore.setPlayingSongs(artistSongs, artistId)
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
.artistAvatar {
    height: 300px;
    opacity: 0.6;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    object-fit: cover;
    object-position: 30% 30%;
}

.ellipsisContent {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis
}

.songItemImage {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
}

.songThumbnailOverlay {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.songItem:hover .songItemImage {
    opacity: 0.5;
    cursor: pointer;
}

.songItem:hover .songThumbnailOverlay {
    opacity: 1;
}
</style>