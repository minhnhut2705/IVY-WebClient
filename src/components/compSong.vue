<template>
    <div class="row pt-md-4 pt-2 position-relative">
        <div class="col-12 pb-md-4 pb-2" style="border-bottom: 2px solid #0E3343;">
            <template v-for="song in songStore.songs" :key="song">
                <span v-if="song._id === $route.params.id" class="row w-100 mx-0">
                    <span class="col-3 d-md-flex d-none pe-0 justify-content-center">
                        <img class="w-75" :src="song.thumbnail" :alt="song.name"
                            style="box-shadow: 2px 2px 50px 1px #000F16; aspect-ratio: 1/1;">
                    </span>
                    <span class="col-md-6 col-7 ps-md-0 ps-2 d-flex flex-column justify-content-end">
                        <h1 class="row text-white">
                            <span class="ellipsisContent fw-bold px-0">
                                {{ song.name }}
                            </span>
                        </h1>
                        <span class="w-100 row">
                            <template v-for="(artistId, index) in song.artist" :key="artistId">
                                <template v-for="artist in artistStore.artists" :key="artist">

                                    <span
                                        v-if="artistId === artist._id && index === Object.keys(song.artist).length - 1 && Object.keys(song.artist).length === 1"
                                        class="fs-6 col-auto px-0 text-white ellipsisContent">
                                        <router-link class="w-auto" :to="{
                                            name: 'artist',
                                            params: { id: artist._id }
                                        }">
                                            <span class="text-gray hoverPointerWhite underlineHoverEffect">
                                                {{ artist.name }}
                                            </span>
                                        </router-link>
                                    </span>
                                    <span
                                        v-else-if="artistId === artist._id && index < Object.keys(song.artist).length - 1 && index > 0"
                                        class="fs-6 col-auto px-0 text-white">

                                        <router-link class="w-auto" :to="{
                                            name: 'artist',
                                            params: { id: artist._id }
                                        }">
                                            <span class="text-gray hoverPointerWhite underlineHoverEffect">
                                                , {{ artist.name }}
                                            </span>
                                        </router-link>
                                    </span>
                                    <span v-else-if="artistId === artist._id && index < Object.keys(song.artist).length - 1"
                                        class="fs-6 col-auto px-0 text-white">
                                        <router-link class="w-auto" :to="{
                                            name: 'artist',
                                            params: { id: artist._id }
                                        }">
                                            <span class="text-gray hoverPointerWhite underlineHoverEffect">
                                                {{ artist.name }}
                                            </span>
                                        </router-link>
                                    </span>
                                    <span
                                        v-else-if="artistId === artist._id && index === Object.keys(song.artist).length - 1"
                                        class="fs-6 col-auto px-0 text-white">
                                        <router-link class="w-auto" :to="{
                                            name: 'artist',
                                            params: { id: artist._id }
                                        }">
                                            <span class="text-gray hoverPointerWhite underlineHoverEffect">
                                                , {{ artist.name }}
                                            </span>
                                        </router-link>
                                    </span>
                                </template>
                            </template>
                        </span>
                        <span class="row">
                            Total streams: {{ song.stream }} streams
                        </span>
                        <span class="row">
                            Release: {{ new Date(song.createdAt).getDate() + " " + new
                                Date(song.createdAt).toLocaleString('default', { month: 'long' }) + " " + new
                                    Date(song.createdAt).getFullYear()
                            }}
                        </span>
                    </span>
                    <span class="col-md-3 col-5 d-flex flex-column justify-content-end">
                        <span class="row d-flex flex-row justify-content-end">
                            <span class="col-auto">
                                <font-awesome-icon
                                    v-if="song._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                    icon="fa-solid fa-circle-pause" class="hoverPointerWhite fs-2" @click="pauseSong()" />
                                <font-awesome-icon v-else icon="fa-solid fa-circle-play" class="hoverPointerWhite fs-2"
                                    @click="setCurrentSong(song._id, songStore.songs, 'songsIVY')" />
                            </span>
                            <span class="col-auto" v-if="userStore.user" @click="favorite(userStore.user._id, song._id)"
                                :class="{ 'heart': userStore.user.favorites.includes(song._id) }">
                                <font-awesome-icon icon="fa-solid fa-heart" class="hoverPointerWhite fs-2" />
                            </span>
                            <span v-else class="col-auto" @click="$router.push('/login')">
                                <font-awesome-icon class="hoverPointerWhite fs-2" icon="fa-solid fa-heart" />
                            </span>
                            <span class="col-auto">
                                <font-awesome-icon icon="fa-solid fa-square-plus" class="hoverPointerWhite fs-2"
                                    data-bs-toggle="modal" :data-bs-target="'#pllmd' + song._id" />
                            </span>
                            <div class="modal fade" :id="'pllmd' + song._id" tabindex="-1"
                                :aria-labelledby="'pllmd' + song._id + 'Label'" aria-hidden="true">
                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                    <div class="modal-content text-white" style="background-color: rgba(0, 54, 74, 0.9);">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="'pllmd' + song._id + 'Label'">
                                                Your playlists
                                            </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body row mx-auto py-0 w-100 justify-content-center"
                                            v-if="userStore.isAuthorized === true">
                                            <template v-for="playlist in playlistStore.playlists" :key="playlist">
                                                <div v-if="userStore.user._id === playlist.creator"
                                                    class="col-12 p-0 w-100 addPlaylistItem">
                                                    <div class="w-100 row p-2 m-0  border-bottom"
                                                        @click="addSongToPlaylist(song._id, playlist._id)">
                                                        <div class="col-9">
                                                            {{ playlist.name }}
                                                        </div>
                                                        <div class="col-3 text-end">
                                                            {{ Object.keys(playlist.songs).length }} songs
                                                        </div>
                                                        <!-- <div class="col-2 text-end fs-5 text-gray hoverPointerWhite">
                                                            <font-awesome-icon icon="fa-solid fa-square-plus" />
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </template>
                                            <div class="col-12 p-0 w-100">
                                                <div class="w-100 row py-2 px-0 m-0  border-bottom">
                                                    <div class="col-12 text-center fs-4 text-gray">
                                                        <font-awesome-icon class="hoverPointerWhite"
                                                            icon="fa-solid fa-square-plus" data-bs-toggle="collapse"
                                                            data-bs-target="#createPlaylist" aria-expanded="false"
                                                            aria-controls="createPlaylist" />
                                                    </div>
                                                    <div class="collapse col-12 px-0" id="createPlaylist"
                                                        style="border-radius: 5px;">
                                                        <!-- @click="createAndAddSongToPlaylist(userStore.user._id, song._id)" -->
                                                        <div class="d-flex justify-content-between">
                                                            <input
                                                                class="border-light-ocean w-75 p-1 playlistNameCreate bg-transparent"
                                                                type="text" placeholder="Type playlist name"
                                                                v-model="playlistName">
                                                            <button type="button" class="rounded btn btn-dark-green-blue"
                                                                @click="createAndAddSongToPlaylist(userStore.user._id, song._id)">
                                                                Create
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="modal-body row mx-auto py-0 w-100 justify-content-center" v-else>
                                            <div class="col-12 p-0 w-100 addPlaylistItem">
                                                <div class="w-100 row p-2 m-0  border-bottom">
                                                    <div class="col-12">
                                                        <router-link to="/login">
                                                            Login
                                                        </router-link>
                                                        or
                                                        <router-link to="/register">
                                                            Register
                                                        </router-link>
                                                        to get your playlist
                                                    </div>
                                                    <!-- <div class="col-2 text-end fs-5 text-gray hoverPointerWhite">
                                                            <font-awesome-icon icon="fa-solid fa-square-plus" />
                                                        </div> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="rounded btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <!-- <button type="button" data-bs-dismiss="modal"
                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                style="opacity: 0.8;"
                                                @click="userProfileFav(userStore.user._id, song._id)">
                                                Remove
                                            </button> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </span>
                    </span>
                </span>
            </template>
        </div>
        <div class="col-12 pt-4">
            <template v-for="song in songStore.songs" :key="song">
                <span v-if="song._id === $route.params.id" class="row w-100 mx-0">
                    <template v-for="(artistId) in song.artist" :key="artistId">
                        <template v-for="artist in artistStore.artists" :key="artist">
                            <span v-if="artistId === artist._id && Object.keys(artist.songs).length > 1" class="col-12">
                                <span class="row mb-3 ms-0 fw-semi-bold fs-4 ellipsisContent">
                                    More by "{{ artist.name }}"
                                </span>
                                <span class="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
                                    <template v-for="songIdInArtist in artist.songs" :key="songIdInArtist">
                                        <template v-for="songOfArtist in songStore.songs" :key="songOfArtist._id">
                                            <span
                                                v-if="songOfArtist._id === songIdInArtist && songOfArtist._id !== $route.params.id"
                                                class="col">
                                                <span
                                                    class="p-3 mb-4 rounded  d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                                                    <span class="w-100 songItem position-relative fs-1">
                                                        <img class="rounded w-100 songItemImage"
                                                            :src="songOfArtist.thumbnail" alt="" style="aspect-ratio: 1/1;">
                                                        <div class="d-flex align-items-center songThumbnailOverlay">
                                                            <!-- <font-awesome-icon
                                                            v-if="songStore.songs[index + 41]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                                            icon="fa-solid fa-circle-pause"
                                                            class="hoverPointerWhite fs-4" /> -->
                                                            <font-awesome-icon
                                                                v-if="songOfArtist._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                                                icon="fa-solid fa-circle-pause"
                                                                class="hoverPointerWhite fs-2" @click="pauseSong()" />
                                                            <font-awesome-icon v-else icon="fa-solid fa-circle-play"
                                                                class="hoverPointerWhite fs-2"
                                                                @click="setCurrentSong(songOfArtist._id, songStore.songs, 'songsIVY')" />
                                                        </div>
                                                    </span>

                                                    <span class="pt-3 pb-2 w-100">
                                                        <router-link :to="{
                                                            name: 'song',
                                                            params: { id: songOfArtist._id }
                                                        }">
                                                            <span class="ellipsisContent text-gray fw-semi-bold fs-6">
                                                                <span class="underlineHoverEffect  hoverPointerWhite">
                                                                    {{ songOfArtist.name }}
                                                                </span>
                                                            </span>
                                                        </router-link>
                                                    </span>
                                                    <span class="ellipsisContent">
                                                        {{ new Date(songOfArtist.createdAt).getDate() + " " + new
                                                            Date(songOfArtist.createdAt).toLocaleString('default', {
                                                                month:
                                                                    'long'
                                                            }) + " " + new Date(songOfArtist.createdAt).getFullYear()
                                                        }}
                                                    </span>
                                                </span>
                                            </span>
                                        </template>
                                    </template>
                                </span>
                            </span>
                        </template>
                    </template>
                </span>
            </template>
        </div>
        <div class="col-12 pt-md-4 pt-2" v-if="genreStore.sameSongs">
            <template v-for="song in songStore.songs" :key="song">
                <span v-if="song._id === $route.params.id" class="row w-100 mx-0">
                    <span class="col-12 mb-3 ms-0 fw-semi-bold fs-4 ellipsisContent">
                        More like "{{ song.name }}"
                    </span>
                    <span class="col-12">
                        <span class="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
                            <template v-for="songId in genreStore.sameSongs" :key="songId">
                                <template v-for="songSame in songStore.songs" :key="songSame">
                                    <span v-if="(songId === songSame._id && songId != $route.params.id)">
                                        <span
                                            class="p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                                            <span class="w-100 songItem position-relative fs-1">
                                                <img class="rounded w-100 songItemImage" :src="songSame.thumbnail" alt=""
                                                    style="aspect-ratio: 1/1;">
                                                <div class="d-flex align-items-center songThumbnailOverlay">
                                                    <font-awesome-icon
                                                        v-if="songSame._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                                        icon="fa-solid fa-circle-pause" class="hoverPointerWhite fs-2"
                                                        @click="pauseSong()" />
                                                    <font-awesome-icon v-else icon="fa-solid fa-circle-play"
                                                        class="hoverPointerWhite fs-2"
                                                        @click="setCurrentSong(songSame._id, songStore.songs, 'songsIVY')" />
                                                </div>
                                            </span>
                                            <span class="pt-3 pb-2 w-100">

                                                <router-link :to="{
                                                    name: 'song',
                                                    params: { id: songSame._id }
                                                }">
                                                    <span class="ellipsisContent text-gray ">
                                                        <span
                                                            class="underlineHoverEffect fw-semi-bold fs-5 hoverPointerWhite">
                                                            {{ songSame.name }}
                                                        </span>
                                                    </span>
                                                </router-link>
                                            </span>
                                            <template v-for="artist in artistStore.artists" :key="artist">
                                                <router-link :to="{
                                                    name: 'artist',
                                                    params: { id: artist._id }
                                                }">
                                                    <span class="ellipsisContent" v-if="songSame.artist[0] === artist._id">
                                                        <span class="underlineHoverEffect hoverPointerWhite text-gray">
                                                            {{ artist.name }}
                                                        </span>
                                                    </span>
                                                </router-link>
                                            </template>
                                        </span>
                                    </span>
                                </template>
                            </template>
                            <!-- <template v-for="genre in genreStore.genres" :key="genre">
                                <template v-for="genreId in song.genres" :key="genreId">
                                    <template v-if="genreId === genre._id">
                                        <template v-if="Object.keys(genre.songs).length >= 5">
                                            <template v-for="numberOfSong in 5" :key="numberOfSong">
                                                <template v-for="songOfGenre in songStore.songs" :key="songOfGenre">
                                                    <span
                                                        v-if="songOfGenre._id === genre.songs[numberOfSong] && songOfGenre._id !== $route.params.id">
                                                        <span
                                                            class="p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                                                            <span class="w-100 songItem position-relative fs-1">
                                                                <img class="rounded w-100 songItemImage"
                                                                    :src="songOfGenre.thumbnail" alt=""
                                                                    style="aspect-ratio: 1/1;">
                                                                <div
                                                                    class="d-flex align-items-center songThumbnailOverlay">
                                                                    <font-awesome-icon
                                                                        v-if="songOfGenre._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                                                        icon="fa-solid fa-circle-pause"
                                                                        class="hoverPointerWhite fs-2"
                                                                        @click="pauseSong()" />
                                                                    <font-awesome-icon v-else
                                                                        icon="fa-solid fa-circle-play"
                                                                        class="hoverPointerWhite fs-2"
                                                                        @click="setCurrentSong(songOfGenre._id)" />
                                                                </div>
                                                            </span>
                                                            <span class="pt-3 pb-2 w-100">

                                                                <router-link :to="{
                                                                    name: 'song',
                                                                    params: { id: songOfGenre._id }
                                                                }">
                                                                    <span class="ellipsisContent text-gray ">
                                                                        <span
                                                                            class="underlineHoverEffect fw-semi-bold fs-5 hoverPointerWhite">
                                                                            {{ songOfGenre.name }}
                                                                        </span>
                                                                    </span>
                                                                </router-link>
                                                            </span>
                                                            <template v-for="artist in artistStore.artists"
                                                                :key="artist">
                                                                <router-link :to="{
                                                                    name: 'artist',
                                                                    params: { id: artist._id }
                                                                }">
                                                                    <span class="ellipsisContent"
                                                                        v-if="songOfGenre.artist[0] === artist._id">
                                                                        <span
                                                                            class="underlineHoverEffect hoverPointerWhite text-gray">
                                                                            {{ artist.name }}
                                                                        </span>
                                                                    </span>
                                                                </router-link>
                                                            </template>
                                                        </span>
                                                    </span>
                                                </template>
                                            </template>
                                        </template>
                                        <template v-else-if="Object.keys(genre.songs).length < 5">
                                            <template v-for="numberOfSong in Object.keys(genre.songs).length "
                                                :key="numberOfSong">
                                                <template v-for="songOfGenre in songStore.songs" :key="songOfGenre">
                                                    <span
                                                        v-if="songOfGenre._id === genre.songs[numberOfSong] && songOfGenre._id !== $route.params.id">
                                                        <span
                                                            class="p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                                                            <span class="w-100 songItem position-relative">
                                                                <img class="rounded w-100 songItemImage"
                                                                    :src="songOfGenre.thumbnail" alt=""
                                                                    style="aspect-ratio: 1/1;">
                                                                <div
                                                                    class="d-flex align-items-center songThumbnailOverlay">
                                                                    <font-awesome-icon icon="fa-solid fa-circle-play"
                                                                        class="hoverPointerWhite fs-1"
                                                                        @click="setCurrentSong(songOfGenre._id)" />
                                                                </div>
                                                            </span>
                                                            <span class="pt-3 pb-2 w-100">
                                                                <router-link :to="{
                                                                    name: 'song',
                                                                    params: { id: songOfGenre._id }
                                                                }">
                                                                    <span
                                                                        class="ellipsisContent text-gray fw-semi-bold">
                                                                        <span
                                                                            class="underlineHoverEffect hoverPointerWhite">
                                                                            {{ songOfGenre.name }}
                                                                        </span>
                                                                    </span>
                                                                </router-link>
                                                            </span>
                                                            <template v-for="artist in artistStore.artists"
                                                                :key="artist">

                                                                <router-link :to="{
                                                                    name: 'artist',
                                                                    params: { id: artist._id }
                                                                }">
                                                                    <span class="ellipsisContent"
                                                                        v-if="songOfGenre.artist[0] === artist._id">
                                                                        <span
                                                                            class="underlineHoverEffect hoverPointerWhite text-gray">
                                                                            {{ artist.name }}
                                                                        </span>
                                                                    </span>
                                                                </router-link>
                                                            </template>
                                                        </span>
                                                    </span>
                                                </template>
                                            </template>
                                        </template>
                                    </template>
                                </template>
                            </template> -->
                        </span>
                    </span>
                </span>
            </template>
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
            playlistName: '',
            hideSuccess: false,
            sameSongs: []
        }
    },
    methods: {
        // async setCurrentSong(songId) {
        //     await this.songStore.setCurrentSong(songId)
        // },
        async setCurrentSong(songId, songs, songsID) {
            let songIDs = [...songs.map((song) => {
                return song._id
            })]
            // console.log("songs: ", songIDs);
            this.songStore.setPlayingSongs(songIDs, songsID)
            await this.songStore.setCurrentSong(songId)
        },
        async favorite(userId, songId) {
            await this.userStore.updateFavorites(userId, songId)
            // console.log(fav);
        },
        async addSongToPlaylist(songId, playlistId) {
            let addedSong = await this.playlistStore.addSongToPlaylist(songId, playlistId)
            if (addedSong == 1) {
                this.$toast.success('Song has been added to the playlist')
            } else if (addedSong == 2) {
                this.$toast.warning('Song already exists in the playlist')
            } else if (addedSong == 0) {
                this.$toast.error("Can't add song to playlist")
            }
        },
        async createAndAddSongToPlaylist(userId, songId) {
            let playlist = {
                name: this.playlistName,
                // thumbnail: '',
                songs: [songId],
                creator: userId,
                stream: 0
            }
            let userUpdated
            let playlistCreated = await this.playlistStore.createAndAddSongToPlaylist(playlist)
            if (playlistCreated) {
                userUpdated = await this.userStore.updateUserPlaylists(userId, playlistCreated._id)
            }
            if (playlistCreated && userUpdated) {
                this.$toast.success(`Playlist ${this.playlistName} has been created`);
            } else {
                this.$toast.error(`Playlist ${this.playlistName} can't be create`);
            }
        },
        pauseSong() {
            this.songStore.isPlaying = false
        },

    },
    created() {
    },
    mounted() {
        this.genreStore.getSameSongs(this.$route.params.id)

    },
    beforeUpdate() {
    },
    updated() {
    }
}
</script>
<style scoped>
.playlistNameCreate {
    box-shadow: none !important;
    color: white;
}

.playlistNameCreate:placeholder-shown {
    color: #D3D3D3;
}

.playlistNameCreate:focus {
    outline: none;
    color: white;
}

.border-light-ocean {
    /* border: 2px solid #015D7D !important; */
    box-shadow: none !important;
    border-radius: 5px;
}

.addPlaylistItem:hover {
    background-color: #015D7D;
    cursor: pointer;
    color: white;
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