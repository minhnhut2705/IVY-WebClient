<template >
    <div class="row px-0">
        <template v-for="playlist in playlistStore.playlists" :key="playlist">
            <span class="col-12 px-0 position-relative" v-if="playlist._id === $route.params.id">
                <img class="px-0 w-100 plalistThumbnail" :src="playlist.thumbnail" alt="" style="aspect-ratio: 1/1;">
                <span class="text-white w-100 row p-4 position-absolute bottom-0" style="left: 0;">
                    <span class="ellipsisContent col-12" style="font-size: 6rem; font-weight: 700;">
                        {{ playlist.name }}
                    </span>
                    <div class="col-12 mx12">
                        <span class="fs-5 row d-flex align-items-center justify-content-start">
                            <span class="col-1 w-auto px-0 d-flex align-items-center">
                                <span class="w-100 my-auto ellipsisContent">
                                    {{ Object.keys(playlist.songs).length }} songs
                                </span>
                            </span>
                            <span class="col-1 w-auto">
                                &#9679;
                                </span>

                            <span class="col-6 px-0 d-flex align-items-center">
                                <span class="w-100 my-auto ellipsisContent">
                                    Created at:
                                {{ new Date(playlist.createdAt).getDate() + " " + new
                                        Date(playlist.createdAt).toLocaleString('default', { month: 'long' }) + " " + new
                                            Date(playlist.createdAt).getFullYear()
                                }}
                                </span>
                            </span>
                        </span>
                    </div>
                </span>
            </span>
        </template>
        <span class="col-12">
            <span class="row w-100 fw-semi-bold fs-4 px-4 pt-4 pb-3">
                All songs
            </span>
            <template v-for="playlist in playlistStore.playlists" :key="playlist">
                <span class="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2 mx-1" v-if="playlist._id === $route.params.id">
                    <template v-for="songIdOfPlaylist in playlist.songs" :key="songIdOfPlaylist">
                        <template v-for="song in songStore.songs" :key="song">
                            <span v-if="songIdOfPlaylist === song._id">
                                <span
                                    class="p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                                    <span class="w-100 songItem position-relative hoverPointerWhite fs-1"
                                        @click="setCurrentSong(song._id, playlist.songs, playlist._id)">
                                        <img class="rounded w-100 songItemImage" :src="song.thumbnail" alt=""
                                            style="aspect-ratio: 1/1;">
                                        <div class="d-flex align-items-center songThumbnailOverlay">
                                            <!-- <font-awesome-icon
                                                            v-if="songStore.songs[index + 41]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                                            icon="fa-solid fa-circle-pause"
                                                            class="hoverPointerWhite fs-4" /> -->
                                            <font-awesome-icon icon="fa-solid fa-circle-play" class="" />
                                        </div>
                                    </span>
                                    <span class="pt-3 pb-2 w-100">
                                        <router-link :to="{
                                            name: 'song',
                                            params: { id: song._id }
                                        }">
                                            <span class="ellipsisContent text-gray ">
                                                <span class="underlineHoverEffect fw-semi-bold fs-5 hoverPointerWhite">
                                                    {{ song.name }}
                                                </span>
                                            </span>
                                        </router-link>
                                    </span>
                                    <template v-for="artist in artistStore.artists" :key="artist">
                                        <router-link :to="{
                                            name: 'artist',
                                            params: { id: artist._id }
                                        }">
                                            <span class="fs-6" v-if="artist._id === song.artist[0]">
                                                <span class="underlineHoverEffect text-gray hoverPointerWhite ellipsisContent">
                                                    {{ artist.name }}
                                                </span>
                                            </span>
                                        </router-link>
                                    </template>
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
import { usePlaylistStore } from '../stores/playlistStore'

export default {
    setup() {
        const songStore = useSongStore()
        const artistStore = useArtistStore()
        const genreStore = useGenreStore()
        const playlistStore = usePlaylistStore()
        return { songStore, artistStore, genreStore, playlistStore }
    },
    data() {
        return {

        }
    },
    methods: {
        async setCurrentSong(songId, playlistSongs, playlistId) {
            this.songStore.setPlayingSongs(playlistSongs, playlistId)
            await this.songStore.setCurrentSong(songId)
        },
    }
}
</script>
<style scoped>
.plalistThumbnail {
    height: 300px;
    opacity: 0.5;
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