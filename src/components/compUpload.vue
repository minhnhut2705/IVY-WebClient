<template>
    <div v-if="userStore.isAuthorized" class="row d-flex justify-content-center align-content-center"
        style="margin-top: 5%;">
        <div class="col-4 d-flex flex-column me-2" style="height: 280px;">
            <div class="row h-50 bg-transparent border-light-ocean mb-1 d-flex align-items-center">
                <span class="d-flex flex-column justify-content-center align-content-center h-100 hoverPointerWhite"
                    @click="songThumbnailClick">
                    <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" class=" mb-1 fs-4"
                        :class="{ 'd-none': imageChoosed }" />
                    <span class="d-block mx-auto" :class="{ 'd-none': imageChoosed }">
                        Choose thumbnail
                    </span>
                    <span v-if="imagePreview" class="h-100 mx-auto">
                        <img :src="imagePreview" :class="{ 'd-none': !imageChoosed }" alt="" class="h-100 p-1"
                            style=" aspect-ratio: 1/1;">
                    </span>
                    <input type="file" class="d-none" name="songThumbnail" ref="songThumbnail" @change="previewImage"
                        accept="image/png, image/jpeg">
                </span>
            </div>
            <div class="row h-50 bg-transparent border-light-ocean d-flex align-items-center">
                <span class="d-flex flex-column align-items-center hoverPointerWhite" @click="songFileClick">
                    <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" class=" mb-1 fs-4"
                        :class="{ 'd-none': songChoosed }" />
                    <span class="d-block" :class="{ 'd-none': songChoosed }">
                        Choose song
                    </span>
                    <span v-if="songPreview" class="h-100 mx-auto">
                        <span :class="{ 'd-none': !songChoosed }" alt="" class="h-100 p-1">{{ songPreview }}</span>
                    </span>
                    <input type="file" class="d-none" name="songFile" ref="songFile" accept="audio/*" @change="previewSong">
                </span>
            </div>
        </div>
        <div class="col-4 d-flex flex-column ms-2" style="height: 280px;">
            <span class="row fw-semi-bold px-0">
                Song name
            </span>
            <div class="row h-auto mb-2" style="">
                <span class="border-light-ocean px-0 rounded">
                    <input placeholder="Type your song name..." type="text"
                        class="border-none bg-transparent p-1 w-100 songNameUpload" v-model="songName">
                </span>
            </div>
            <span class="row fw-semi-bold px-0">
                Genres
            </span>
            <div class="row h-75 bg-transparent overflow-auto" style="">
                <span class="col-12">
                    <span class="row">
                        <template v-for="genre in genreStore.genres" :key="genre._id">
                            <span
                                class="col p-1 m-1 d-flex bg-transparent border-light-ocean uploadGenre align-items-center rounded justify-content-center hoverPointerWhite"
                                :class="{ 'uploadGenre-bg-color': songGenres.includes(genre._id) }"
                                @click="chooseGenreUploadSong(genre._id)">
                                {{ genre.name }}
                            </span>
                        </template>
                    </span>
                </span>
            </div>
        </div>
        <div class="col-12 text-center p-2 mt-2" :class="{ 'd-none': songUploadProgress == 0 }">
            <p class="m-0 uploading">
                Uploading...
            </p>
            <progress :value="songUploadProgress" class="w-50" max="100"></progress>
        </div>
        <div class="col-12 w-100 justify-content-center d-flex pt-1" :class="{ 'pt-3': songUploadProgress == 0 }">
            <button class="btn btn-block w-25 mx-2 text-gray fw-semi-bold uploadResetButton"
                :class="{ 'disabled': songUploadProgress != 0 }" type="button" style="background-color: #204244;"
                @click="resetUpload">
                Reset
            </button>
            <button class="btn btn-block w-25 mx-2 text-gray fw-semi-bold uploadSubmitButton"
                :class="{ 'disabled': songUploadProgress != 0, 'disabled': checked == false }" type="button"
                style="background-color: #204244;" @click="upload">
                Upload
            </button>
        </div>
    </div>
    <div v-else class="row text-center pt-4">
        <h2>
            Authentication required
        </h2>
    </div>
</template>
<script>
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from "../config/firebase.config.js"

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
            songName: null,
            uploadState: false,

            imageData: null,
            imageURL: null,
            imageUploadProgress: 0,
            imagePreview: null,
            imageChoosed: false,

            songData: null,
            songURL: null,
            songUploadProgress: 0,
            songPreview: null,
            songChoosed: false,

            songGenres: [],

            checked: false
        }
    },
    methods: {
        resetUpload() {
            this.imageData = this.imageURL = this.imagePreview = this.songData = this.songURL = this.songPreview = this.songName = null
            this.imageUploadProgress = this.songUploadProgress = 0
            this.imageChoosed = this.songChoosed = false
            this.songGenres = []
        },
        previewImage(event) {
            this.imageUploadProgress = 0
            this.imageURL = null
            this.imageData = event.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(this.imageData)
            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }
            this.imageChoosed = true
        },
        previewSong(event) {
            this.songUploadProgress = 0
            this.songURL = null
            this.songData = event.target.files[0]
            this.songPreview = event.target.files[0].name
            // console.log( event.target.files[0].name);
            this.songChoosed = true
        },
        upload() {
            this.imageURL = null;
            this.songURL = null;

            const thumbnailStorageRef = ref(storage, `img/songs/${this.songName}${Date.now()}`);
            const songStorageRef = ref(storage, `mp3/${this.songName}${Date.now()}`);

            const imageUploadTask = uploadBytesResumable(thumbnailStorageRef, this.imageData);
            const songUploadTask = uploadBytesResumable(songStorageRef, this.songData);

            imageUploadTask.on('state_changed',
                (snapshot) => {
                    this.imageUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Thumbnail uploading ' + this.imageUploadProgress + '%');
                    switch (snapshot.state) {
                        case 'paused':
                            // console.log('Thumbnail upload is paused');
                            break;
                        case 'running':
                            // console.log('Thumbnail upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                    this.uploadState = false
                },
                () => {
                    this.imageUploadProgress = 100;
                    getDownloadURL(imageUploadTask.snapshot.ref).then((thumbnailDownloadURL) => {
                        // console.log('Thumbnail available at', thumbnailDownloadURL);
                        this.imageURL = thumbnailDownloadURL;
                        this.uploadState = true
                    });
                })
            songUploadTask.on('state_changed',
                (snapshot) => {
                    this.songUploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 - 40;
                    // console.log('Song uploading ' + this.songUploadProgress + '%');
                    switch (snapshot.state) {
                        case 'paused':
                            // console.log('Song upload is paused');
                            break;
                        case 'running':
                            // console.log('Song upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                    this.uploadState = false
                },
                () => {
                    this.songUploadProgress = 60;
                    getDownloadURL(songUploadTask.snapshot.ref)
                        .then(async (songDownloadURL) => {
                            // console.log('Song available at', songDownloadURL);
                            this.songURL = songDownloadURL;
                            this.uploadState = true
                            let song = {
                                name: this.songName,
                                thumbnail: this.imageURL,
                                songURL: this.songURL,
                                artist: this.userStore.user.artistId,
                                stream: 0,
                                genres: this.songGenres,
                                banner: this.imageURL,
                                type: this.userStore.user.role
                            }
                            let songCreated = await this.songStore.createSong(song)
                            let userSongAdded = null
                            let artistSongAdded = null
                            let GenreSongAdded = null

                            if (songCreated) {
                                this.songUploadProgress = 70;
                                // userSongAdded = await this.userStore.updateUserSongs(this.userStore.user._id, songCreated._id)
                                userSongAdded = await this.userStore.addUserSongs(this.userStore.user._id, songCreated._id)
                                if (userSongAdded) {
                                    this.songUploadProgress = 80;
                                    artistSongAdded = await this.artistStore.addArtistSongs(this.userStore.user.artistId, songCreated._id)
                                    if (artistSongAdded) {
                                        this.songUploadProgress = 90;
                                        for (const genreIdIndex in this.songGenres) {
                                            this.songUploadProgress = 100;
                                            GenreSongAdded = await this.genreStore.addSongToGenres(songCreated._id, this.songGenres[genreIdIndex])
                                        }
                                    }
                                }
                            }
                            if (GenreSongAdded) {
                                // console.log("Song updated with our related");
                                this.$toast.success(`${songCreated.name} has been uploaded`)
                                this.$router.push("/user/profile")
                                this.songStore.loadSongs()
                            } else {
                                this.$toast.error("Can't upload song, refresh page and try again")
                            }
                        });
                })
        },
        songThumbnailClick() {
            this.$refs.songThumbnail.click()
        },
        songFileClick() {
            this.$refs.songFile.click()
        },
        chooseGenreUploadSong(genreId) {
            try {
                if (!this.songGenres.includes(genreId)) {
                    this.songGenres.push(genreId)
                    // console.log(this.songGenres);
                } else {
                    let genreIndex = this.songGenres.indexOf(genreId)
                    if (genreIndex > -1) {
                        this.songGenres.splice(genreIndex, 1)
                        // console.log(this.songGenres);
                        // console.log(typeof(this.songGenres), "type");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    updated() {
        if (this.imageData != null && this.imagePreview != null && this.songPreview != null
            && this.songName != null && this.imageChoosed != false && this.songChoosed != false
            && Object.keys(this.songGenres).length > 0) {
            this.checked = true
        } else {
            this.checked = false
        }
    }
}
</script>
<style scoped>
.uploading {
    opacity: 0;
    animation: opacityOn 3s infinite ease-in-out;
    animation-delay: 0.8s;
}

@keyframes opacityOn {
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

progress[value]::-webkit-progress-value {
    color: #FD841F !important;
    background-color: #FD841F;
}

progress[value] {
    height: 6px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border: none;
    color: #FD841F !important;
    border-radius: 5px;
}

.uploadGenre-bg-color {
    background-color: #1C6758 !important;
}

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

.uploadResetButton:hover,
.uploadSubmitButton:hover {
    color: white;
    background-color: #015D7D !important;
}

.songGenreUpload,
.songNameUpload {
    box-shadow: none !important;
    color: white;
}

.songGenreUpload:placeholder-shown,

.songNameUpload:placeholder-shown {
    color: #D3D3D3;
}

.songGenreUpload:focus,
.songNameUpload:focus {
    outline: none;
    color: white;
}


select option {
    /* margin: 40px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); */
}

.border-light-ocean {
    /* border: 2px solid #0E3343 !important; */
    box-shadow: none !important;
}</style>