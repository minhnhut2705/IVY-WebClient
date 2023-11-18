<template>
    <div class="row py-4" v-if="userStore.isAuthorized == true">
        <span class="col-12 pb-4" style="border-bottom: 2px solid #0E3343 ;">
            <span class="row w-100 mx-0">
                <span class="col-3 pe-0 justify-content-center d-lg-flex d-none rounded-circle position-relative">
                    <div class="w-75 h-auto rounded-circle">
                        <img class="w-100 h-auto rounded-circle profileUserAvatar" :src="userStore.user.avatar"
                            :alt="userStore.user.userName"
                            style="aspect-ratio: 1/1; object-fit: cover; object-position: -10% 0%;">
                    </div>
                    <div @click="clickToChangeAv" v-tooltip="'Change avatar'"
                        class="position-absolute fs-5 rounded-circle bg-light-ocean-gradient w-25 hoverPointerWhite"
                        style="bottom: -10%;">
                        <font-awesome-icon icon="fa-solid fa-camera-retro" class="w-100" />
                        <input type="file" class="d-none" name="userAvatarInput" ref="userAvatarInput"
                            @change="previewChangeAvatar" accept="image/png, image/jpeg">
                    </div>
                    <button class="fs-4 hoverPointerWhite d-none changeAvatarButton" ref="changeAvatarButton"
                        data-bs-toggle="modal" :data-bs-target="'#avtmd' + userStore.user._id">
                    </button>
                    <div class="modal fade" :id="'avtmd' + userStore.user._id" :ref="userStore.user._id" tabindex="-1"
                        :aria-labelledby="'avtmd' + userStore.user._id + 'Label'" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content text-white" style="background-color: rgba(10, 9, 45, 0.9);">
                                <div class="modal-header">
                                    <h5 class="modal-title" :id="'avtmd' + userStore.user._id + 'Label'">Avatar preview
                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body d-flex flex-column align-items-center justify-content-center">
                                    <h5>
                                        Your avatar will look like this
                                    </h5>
                                    <img class="w-50 rounded-circle h-50" :src="imagePreview" alt=""
                                        style="aspect-ratio: 1/1; object-fit: cover; object-position: -10% 0%;">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" :class="'btclose' + userStore.user._id"
                                        class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" data-bs-dismiss="modal"
                                        class="rounded btn text-gray confirmDeleteButton bg-success" @click="changeAvatar">
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
                <span class="col-lg-9 col-12 ps-0 d-flex flex-column justify-content-end">
                    <span class="row">
                        <span class="fs-5 fw-semi-bold">
                            Member
                        </span>
                    </span>
                    <span class="ellipsisContent fw-bold px-0 row text-white">
                        <span class="ellipsisContent" style="font-size: 5rem; font-weight: 700; opacity: 0.85;">
                            {{ userStore.user.userName }}
                        </span>
                    </span>
                </span>
            </span>
        </span>
        <div class="col-12 fw-semi-bold fs-3 py-2">
            Overview
        </div>
        <div class="col-12">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="row" role="tablist">
                        <span class="col-4 pe-1 text-end">
                            <div class="row w-100 p-2 m-0"
                                style="background-color: #AA8B56;  border-radius: 5px 5px 0px 0px">
                                <span class="col-6">
                                    <span class="row text-white fw-semi-bold">
                                        {{ Object.keys(userStore.user.songs).length }}
                                    </span>
                                    <span class="row text-start">
                                        <span v-tooltip="'Songs'"
                                            class="col-12 tex-start px-0 ellipsisContent fw-semi-bold text-white">
                                            Songs
                                        </span>
                                    </span>
                                </span>
                                <span class="col-6 text-end px-0" role="presentation">
                                    <span class="w-100 d-block text-white">
                                        <font-awesome-icon icon="fa-solid fa-music" />
                                    </span>
                                    <button id="songTabButton"
                                        class="nav-link active w-auto fw-semi-bold text-white bg-transparent border-none float-end underlineHoverEffect hoverPointerWhite"
                                        data-bs-toggle="pill" data-bs-target="#songTab" type="button" role="tab"
                                        aria-controls="songTab" aria-selected="true">
                                        <span class="fw-semi-bold d-md-block d-none text-white">
                                            View all
                                        </span>
                                        <span class="fw-semi-bold d-md-none d-block text-white">
                                            View
                                        </span>
                                    </button>
                                </span>

                            </div>
                        </span>
                        <span class="col-4 px-1 text-end">
                            <div class="row w-100 p-2 m-0"
                                style="background-color: #42855B;  border-radius: 5px 5px 0px 0px">
                                <span class="col-6">
                                    <span class="row text-white fw-semi-bold">
                                        {{ Object.keys(userStore.user.playlists).length }}
                                    </span>
                                    <span class="row text-start">
                                        <span v-tooltip="'Playlists'"
                                            class="col-12 px-0 ellipsisContent fw-semi-bold text-white">
                                            Playlists
                                        </span>
                                    </span>
                                </span>
                                <span class="col-6 text-end px-0">
                                    <span class="w-100 d-block text-white">
                                        <font-awesome-icon icon="fa-solid fa-rectangle-list" />
                                    </span>
                                    <button id="playlistTabButton"
                                        class="nav-link w-auto fw-semi-bold text-white bg-transparent border-none float-end underlineHoverEffect hoverPointerWhite"
                                        data-bs-toggle="pill" data-bs-target="#playlistTab" type="button" role="tab"
                                        aria-controls="playlistTab" aria-selected="true">
                                        <span class="fw-semi-bold d-md-block d-none text-white">
                                            View all
                                        </span>
                                        <span class="fw-semi-bold d-md-none d-block text-white">
                                            View
                                        </span>
                                    </button>
                                </span>
                            </div>
                        </span>
                        <span class="col-4 ps-1 text-end">
                            <div class="row w-100 p-2 m-0 justify-content-between"
                                style="background-color: #3A8891;  border-radius: 5px 5px 0px 0px">
                                <span class="col-6">
                                    <span class="row text-white fw-semi-bold">
                                        {{ Object.keys(userStore.user.favorites).length }}
                                    </span>
                                    <span class="row text-start">
                                        <span v-tooltip="'Favorites'"
                                            class="col-12 tex-start px-0 ellipsisContent fw-semi-bold text-white">
                                            Favorites
                                        </span>
                                    </span>
                                </span>
                                <span class="col-6 text-end px-0">
                                    <span class="w-100 d-block text-white">
                                        <font-awesome-icon icon="fa-solid fa-heart" />
                                    </span>
                                    <button id="favoriteTabButton"
                                        class="nav-link w-auto fw-semi-bold text-white bg-transparent border-none float-end"
                                        data-bs-toggle="pill" data-bs-target="#favoriteTab" type="button" role="tab"
                                        aria-controls="favoriteTab" aria-selected="true">
                                        <span class="fw-semi-bold d-md-block d-none underlineHoverEffect hoverPointerWhite">
                                            View all
                                        </span>
                                        <span class="fw-semi-bold d-md-none d-block underlineHoverEffect hoverPointerWhite">
                                            View
                                        </span>
                                    </button>
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="row tab-content">
                        <div class="tab-pane fade show active col-12" id="songTab" role="tabpanel"
                            aria-labelledby="songTabButton">
                            <div class="card card-body" style="background-color: #AA8B56; border-radius: 0px 0px 5px 5px">
                                <template v-for="song in songStore.songs" :key="song">
                                    <div class="row py-2 border-bottom d-flex align-items-center"
                                        v-if="song.artist[0] === userStore.user.artistId">
                                        <div class="col-1 rounded d-lg-flex d-none align-items-center">
                                            <img class="w-75 rounded border" :src="song.thumbnail" alt=""
                                                style="aspect-ratio: 1/1;">
                                        </div>
                                        <div class="col-6 d-flex justify-content-start">
                                            <div class="row w-100">
                                                <div class="col-12">
                                                    <router-link :to="{
                                                        name: 'song',
                                                        params: { id: song._id }
                                                    }">

                                                        <span class="ellipsisContent text-dark-white">
                                                            <span class="underlineHoverEffect hoverPointerWhite fs-5">
                                                                {{ song.name }}
                                                            </span>
                                                        </span>
                                                    </router-link>
                                                </div>
                                                <template v-for="artist in artistStore.artists" :key="artist">
                                                    <div class="col-12 ellipsisContent"
                                                        v-if="artist._id === song.artist[0]">
                                                        <router-link :to="{
                                                            name: 'artist',
                                                            params: { id: artist._id }
                                                        }">
                                                            <span class="text-gray underlineHoverEffect hoverPointerWhite">
                                                                {{ artist.name }}
                                                            </span>
                                                        </router-link>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col-4 d-flex justify-content-start">
                                            <div class="row text-white ellipsisContent">
                                                <div class="col-12">
                                                    Streams: {{ song.stream }}
                                                </div>
                                                <div class="col-12 ellipsisContent">
                                                    Release: {{ new Date(song.createdAt).getDate() + " " + new
                                                        Date(song.createdAt).toLocaleString('default', { month: 'long' }) +
                                                        " "
                                                        +
                                                        new
                                                            Date(song.createdAt).getFullYear()
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-1 col-2 text-center">
                                            <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                                data-bs-toggle="modal" :data-bs-target="'#md' + song._id" />
                                        </div>
                                        <!-- Delete Song modal -->
                                        <div class="modal fade" :id="'md' + song._id" :ref="song._id" tabindex="-1"
                                            :aria-labelledby="'md' + song._id + 'Label'" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog modal-dialog-centered">
                                                <div class="modal-content text-white"
                                                    style="background-color: rgba(10, 9, 45, 0.9);">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" :id="'md' + song._id + 'Label'">Delete
                                                            confirmation</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <font-awesome-icon class="px-1"
                                                            icon="fa-solid fa-triangle-exclamation" style="color: red;" />
                                                        You want to delete "{{ song.name }}". After you delete this, it
                                                        can't
                                                        be recovered
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" :class="'btclose' + song._id"
                                                            class="rounded btn btn-secondary"
                                                            data-bs-dismiss="modal">Close</button>
                                                        <button type="button" data-bs-dismiss="modal"
                                                            class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                            style="opacity: 0.8;"
                                                            @click="deleteUserSongs(userStore.user._id, song._id)">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="tab-pane fade col-12" id="playlistTab" role="tabpanel"
                            aria-labelledby="playlistTabButton">
                            <div class="card card-body" style="background-color: #42855B; border-radius: 0px 0px 5px 5px">
                                <template v-for="playlist in playlistStore.playlists" :key="playlist">
                                    <div class="row py-2 border-bottom d-flex align-items-center"
                                        v-if="playlist.creator === userStore.user._id">
                                        <div class="col-1 rounded d-lg-flex d-none align-items-center">
                                            <img class="w-75 rounded border" :src="playlist.thumbnail" alt=""
                                                style="aspect-ratio: 1/1;">
                                        </div>
                                        <div class="col-4">
                                            <div class="row w-100">
                                                <div class="col-12">

                                                    <router-link :to="{
                                                        name: 'playlist',
                                                        params: { id: playlist._id }
                                                    }">
                                                        <span class="ellipsisContent text-dark-white">
                                                            <span class="underlineHoverEffect hoverPointerWhite fs-5">
                                                                {{ playlist.name }}
                                                            </span>
                                                        </span>
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="row">
                                                <div class="col-12 ellipsisContent">
                                                    Songs: {{ Object.keys(playlist.songs).length }}
                                                </div>
                                                <div class="col-12 ellipsisContent">
                                                    Release: {{ new Date(playlist.createdAt).getDate() + " " + new
                                                        Date(playlist.createdAt).toLocaleString('default', {
                                                            month: 'long'
                                                        }) + " "
                                                        +
                                                        new
                                                            Date(playlist.createdAt).getFullYear()
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-2 fw-semi-bold text-white text-center" data-bs-toggle="collapse"
                                            :data-bs-target="'#plldtcll' + playlist._id" aria-expanded="false"
                                            :aria-controls="'plldtcll' + playlist._id">
                                            <span class=" hoverPointerWhite underlineHoverEffect">
                                                Detail
                                            </span>
                                        </div>
                                        <div class="col-lg-1 col-2 text-center">
                                            <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                                data-bs-toggle="modal" :data-bs-target="'#uspllmd' + playlist._id" />
                                        </div>
                                        <div class="collapse col-12" :id="'plldtcll' + playlist._id"
                                            style="background-color: rgba(57, 62, 70, 0.5); border-radius: 5px;">
                                            <template v-for="songId in playlist.songs" :key="songId">
                                                <template v-for="song in songStore.songs" :key="song">
                                                    <div class="row py-2 border-bottom d-flex align-items-center"
                                                        v-if="songId === song._id">
                                                        <div class="col-1 rounded d-lg-flex d-none align-items-center">
                                                            <img class="w-75 rounded border" :src="song.thumbnail" alt=""
                                                                style="aspect-ratio: 1/1;">
                                                        </div>
                                                        <div class="col-6 d-flex justify-content-start">
                                                            <div class="row w-100">
                                                                <div class="col-12">
                                                                    <router-link :to="{
                                                                        name: 'song',
                                                                        params: { id: song._id }
                                                                    }">
                                                                        <span class="ellipsisContent text-dark-white">
                                                                            <span
                                                                                class="underlineHoverEffect hoverPointerWhite fs-5">
                                                                                {{ song.name }}
                                                                            </span>
                                                                        </span>
                                                                    </router-link>
                                                                </div>
                                                                <template v-for="artist in artistStore.artists"
                                                                    :key="artist">
                                                                    <div class="col-12"
                                                                        v-if="artist._id === song.artist[0]">
                                                                        <router-link :to="{
                                                                            name: 'artist',
                                                                            params: { id: artist._id }
                                                                        }">
                                                                            <span class="ellipsisContent text-gray">
                                                                                <span
                                                                                    class="underlineHoverEffect hoverPointerWhite">
                                                                                    {{ artist.name }}
                                                                                </span>
                                                                            </span>
                                                                        </router-link>
                                                                    </div>
                                                                </template>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="row text-white">
                                                                <div class="col-12 ellipsisContent">
                                                                    Streams: {{ song.stream }}
                                                                </div>
                                                                <div class="col-12 ellipsisContent">
                                                                    Release: {{ new Date(song.createdAt).getDate() + " "
                                                                        +
                                                                        new
                                                                            Date(song.createdAt).toLocaleString('default', {
                                                                                month:
                                                                                    'long'
                                                                            }) +
                                                                        " "
                                                                        +
                                                                        new
                                                                            Date(song.createdAt).getFullYear()
                                                                    }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-2 text-center">
                                                            <font-awesome-icon icon="fa-solid fa-trash"
                                                                class="fs-4 hoverPointerWhite" data-bs-toggle="modal"
                                                                :data-bs-target="'#delPlaylistSongmd' + song._id + playlist._id" />
                                                        </div>
                                                        <!-- Delete Song modal -->
                                                        <div class="modal fade"
                                                            :id="'delPlaylistSongmd' + song._id + playlist._id"
                                                            :ref="song._id" tabindex="-1"
                                                            :aria-labelledby="'delPlaylistSongmd' + song._id + playlist._id + 'Label'"
                                                            aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog modal-dialog-centered">
                                                                <div class="modal-content text-white"
                                                                    style="background-color: rgba(10, 9, 45, 0.9);">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title"
                                                                            :id="'delPlaylistSongmd' + song._id + playlist._id + 'Label'">
                                                                            Delete
                                                                            confirmation</h5>
                                                                        <button type="button" class="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"></button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <font-awesome-icon class="px-1"
                                                                            icon="fa-solid fa-triangle-exclamation"
                                                                            style="color: red;" />
                                                                        You want to remove "{{ song.name }}" from {{
                                                                            playlist.name
                                                                        }}
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button"
                                                                            :class="'delPlaylistSongbtclose' + song._id"
                                                                            class="rounded btn btn-secondary"
                                                                            data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" data-bs-dismiss="modal"
                                                                            class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                                            style="opacity: 0.8;"
                                                                            @click="removeSongFromUserPlaylist(song._id, playlist._id)">
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </template>
                                            </template>
                                        </div>
                                        <div class="modal fade" :id="'uspllmd' + playlist._id" tabindex="-1"
                                            :aria-labelledby="'uspllmd' + playlist._id + 'Label'" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog modal-dialog-centered">
                                                <div class="modal-content text-white"
                                                    style="background-color: rgba(10, 9, 45, 0.9);">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" :id="'uspllmd' + playlist._id + 'Label'">
                                                            Delete
                                                            confirmation</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <font-awesome-icon class="px-1"
                                                            icon="fa-solid fa-triangle-exclamation" style="color: red;" />
                                                        You want to remove "{{ playlist.name }}" from your playlists
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="rounded btn btn-secondary"
                                                            data-bs-dismiss="modal">Close</button>
                                                        <button type="button" data-bs-dismiss="modal"
                                                            class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                            style="opacity: 0.8;"
                                                            @click="userProfileDeletePlaylist(userStore.user._id, playlist._id)">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="tab-pane fade col-12" id="favoriteTab" role="tabpanel"
                            aria-labelledby="favoriteTabButton">
                            <div class="card card-body" style="background-color: #3A8891; border-radius: 0px 0px 5px 5px">
                                <template v-for="song in songStore.songs" :key="song">
                                    <template v-for="songId in userStore.user.favorites" :key="songId">
                                        <div class="row py-2 border-bottom d-flex align-items-center"
                                            v-if="song._id === songId">
                                            <div class="col-1 rounded d-lg-flex d-none align-items-center">
                                                <img class="w-75 rounded border" :src="song.thumbnail" alt=""
                                                    style="aspect-ratio: 1/1;">
                                            </div>
                                            <div class="col-6 d-flex justify-content-start">
                                                <div class="row w-100">
                                                    <div class="col-12">
                                                        <router-link :to="{
                                                            name: 'song',
                                                            params: { id: song._id }
                                                        }">
                                                            <span class="ellipsisContent text-dark-white">
                                                                <span class="underlineHoverEffect hoverPointerWhite fs-5">
                                                                    {{ song.name }}
                                                                </span>
                                                            </span>
                                                        </router-link>
                                                    </div>
                                                    <template v-for="artist in artistStore.artists" :key="artist">
                                                        <div class="col-12" v-if="artist._id === song.artist[0]">
                                                            <router-link :to="{
                                                                name: 'artist',
                                                                params: { id: artist._id }
                                                            }">
                                                                <span
                                                                    class="underlineHoverEffect text-gray hoverPointerWhite">
                                                                    {{ artist.name }}
                                                                </span>
                                                            </router-link>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="row">
                                                    <div class="col-12">
                                                        Streams: {{ song.stream }}
                                                    </div>
                                                    <div class="col-12">
                                                        Release: {{ new Date(song.createdAt).getDate() + " " + new
                                                            Date(song.createdAt).toLocaleString('default', {
                                                                month: 'long'
                                                            }) + " "
                                                            +
                                                            new
                                                                Date(song.createdAt).getFullYear()
                                                        }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-1 col-2 text-center">
                                                <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                                    data-bs-toggle="modal" :data-bs-target="'#favmd' + song._id" />
                                            </div>
                                            <div class="modal fade" :id="'favmd' + song._id" tabindex="-1"
                                                :aria-labelledby="'favmd' + song._id + 'Label'" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                                    <div class="modal-content text-white"
                                                        style="background-color: rgba(10, 9, 45, 0.9);">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" :id="'favmd' + song._id + 'Label'">
                                                                Delete
                                                                confirmation</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <font-awesome-icon class="px-1"
                                                                icon="fa-solid fa-triangle-exclamation"
                                                                style="color: red;" />
                                                            You want to remove "{{ song.name }}" from your favorite
                                                            songs
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="rounded btn btn-secondary"
                                                                data-bs-dismiss="modal">Close</button>
                                                            <button type="button" data-bs-dismiss="modal"
                                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                                style="opacity: 0.8;"
                                                                @click="userProfileFav(userStore.user._id, song._id)">
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 fw-semi-bold fs-3 pb-2 pt-4">
            Account
        </div>
        <div class="col-12">
            <div class="row d-flex align-content-center" style="border-bottom: 2px solid #0E3343 !important;">
                <div class="col-4 fw-semi-bold fs-5 h-100 py-2">
                    Full name :
                </div>
                <div class="col-4 my-auto">
                    <span class="ellipsisContent">
                        {{ userStore.user.userName }}
                    </span>
                </div>
                <div class="col-4 my-auto">
                    <div class="row w-100 userChangeSection border-light-ocean m-0">
                        <input v-if="userStore.user.role !== 'partner'" id="fullname"
                            class="col userChangeInput border-none bg-transparent p-1" type="text"
                            :placeholder="userStore.user.userName" v-model="updateDetail.userName">
                        <input v-else disabled id="fullname" class="col userChangeInput border-none bg-transparent p-1"
                            type="text" :placeholder="userStore.user.userName" v-model="updateDetail.userName">
                        <label for="fullname" :class="{ 'd-none': userStore.user.role == 'partner' }"
                            class="col-lg-1 col-md-2 col-4 my-auto px-0 d-flex justify-content-center">
                            <font-awesome-icon icon="fa-solid fa-pen" class="fs-5" />
                        </label>
                        <span class="col-12" v-if="msg.name">
                            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation"
                                style="color: yellow;" />
                            {{ msg.name }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row d-flex align-content-center" style="border-bottom: 2px solid #0E3343 !important;">
                <div class="col-4 fw-semi-bold fs-5 h-100 py-2">
                    Country :
                </div>
                <div class="col-4 my-auto">
                    <span class="ellipsisContent">
                        {{ userStore.user.country }}
                    </span>
                </div>
                <div class="col-4 my-auto">
                    <div class="row w-100 userChangeSection border-light-ocean m-0">
                        <!-- <input id="country" class="col userChangeInput border-none bg-transparent p-1"
                            > -->
                        <select v-if="userStore.user.role !== 'partner'" name="country" id="country"
                            class="col userChangeInput border-none bg-transparent p-1" v-model="updateDetail.country">
                            <option value="" class="bg-light-ocean text-white">{{ userStore.user.country }}</option>
                            <template v-for="country in country_list" :key="country">
                                <option class="bg-light-ocean text-white" :value="country">{{ country }}</option>
                            </template>
                        </select>
                        <select v-else name="country" id="country"
                            class="col userChangeInput border-none bg-transparent p-1" v-model="updateDetail.country">
                            <option value="" disabled class="bg-light-ocean text-white">{{ userStore.user.country }}
                            </option>
                            <template v-for="country in country_list" :key="country">
                                <option disabled class="bg-light-ocean text-white" :value="country">{{ country }}</option>
                            </template>
                        </select>
                        <label for="country" :class="{ 'd-none': userStore.user.role == 'partner' }"
                            class="col-lg-1 col-md-2 col-4 my-auto px-0 d-flex justify-content-center py-1">
                            <font-awesome-icon icon="fa-solid fa-pen" class=" fs-5 " />
                        </label>
                        <span class="col-12" v-if="msg.country">
                            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation"
                                style="color: yellow;" />
                            {{ msg.country }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row d-flex align-content-center" style="border-bottom: 2px solid #0E3343 !important;">
                <div class="col-4 fw-semi-bold fs-5 h-100 py-2">
                    DoB :
                </div>
                <div class="col-4 my-auto">
                    <span class="ellipsisContent">
                        {{ new Date(userStore.user.DoB).getDate() + " " + new
                            Date(userStore.user.DoB).toLocaleString('default', { month: 'long' }) +
                            " "
                            +
                            new
                                Date(userStore.user.DoB).getFullYear()
                        }}
                    </span>
                </div>
                <div class="col-4 my-auto">
                    <div class="row w-100 userChangeSection border-light-ocean m-0">
                        <input v-if="userStore.user.role !== 'partner'" type="date" id="DoB"
                            class="col userChangeInput border-none bg-transparent p-1" v-model="updateDetail.DoB"
                            max="2004-01-01" />
                        <input v-else type="date" id="DoB" disabled
                            class="col userChangeInput border-none bg-transparent p-1" v-model="updateDetail.DoB"
                            max="2004-01-01" />
                    </div>
                    <span class="col-12" v-if="msg.DoB">
                        <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
                        {{ msg.DoB }}
                    </span>

                </div>
            </div>
            <div class="row d-flex align-content-center" style="border-bottom: 2px solid #0E3343 !important;">
                <div class="col-4 fw-semi-bold fs-5 h-100 py-2">
                    Email :
                </div>
                <div class="col-4 my-auto ">
                    <span class="ellipsisContent">
                        {{ userStore.user.email }}
                    </span>
                </div>
                <div class="col-4 my-auto">
                    <div class="row w-100 userChangeSection border-light-ocean m-0">
                        <input id="email" class="col userChangeInput border-none bg-transparent p-1" type="text"
                            :placeholder="userStore.user.email" disabled>
                        <!-- <label for="email" class="col-1 my-auto px-0">
                            <font-awesome-icon icon="fa-solid fa-pen" class=" fs-5 " />
                        </label> -->
                        <span class="col-12" v-if="msg.email">
                            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation"
                                style="color: yellow;" />
                            {{ msg.email }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row d-flex align-content-center" style="border-bottom: 2px solid #0E3343 !important;">
                <div class="col-4 fw-semi-bold fs-5 h-100 py-2">
                    Password :
                </div>
                <div class="col-4 my-auto">
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                    &#42;
                </div>
                <div class="col-4 my-auto">
                    <div class="row w-100 userChangeSection border-light-ocean m-0">
                        <input v-if="userStore.user.role !== 'partner'" id="password"
                            class="col userChangeInput border-none bg-transparent p-1" type="password"
                            v-model="updateDetail.password">
                        <input v-else disabled id="password" class="col userChangeInput border-none bg-transparent p-1"
                            type="password" v-model="updateDetail.password">
                        <label for="password"
                            class="col-lg-1 col-md-2 fs-5 col-4 my-auto px-0 d-flex justify-content-center">
                            <font-awesome-icon icon="fa-solid fa-pen"
                                :class="{ 'd-none': userStore.user.role == 'partner' }" />
                        </label>
                        <span class="col-12" v-if="msg.password">
                            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation"
                                style="color: yellow;" />
                            {{ msg.password }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row d-flex align-content-center" style="border-bottom: 2px solid #0E3343 !important;">
                <div class="col-4 fw-semi-bold fs-5 h-100 py-2">
                    Joined :
                </div>
                <div class="col-4 my-auto">
                    <span class="ellipsisContent">
                        {{ new Date(userStore.user.createdAt).getDate() + " " + new
                            Date(userStore.user.createdAt).toLocaleString('default', { month: 'long' }) +
                            " "
                            +
                            new
                                Date(userStore.user.createdAt).getFullYear()
                        }}
                    </span>

                </div>
            </div>
        </div>
        <div class="col-12 text-end pt-3">
            <button class="btn px-4 userChangeInfoButton text-gray" :class="{
                'disabled': validatedName === false || validatedEmail === false || validatedPassword === false || validatedCountry === false || validatedDoB === false,
                'bg-dark': validatedName === false || validatedEmail === false || validatedPassword === false || validatedCountry === false || validatedDoB === false
            }" style="background-color: #016386;" data-bs-toggle="modal"
                :data-bs-target="'#userProfilemd' + userStore.user._id">
                Change
            </button>
            <div class="modal fade" :id="'userProfilemd' + userStore.user._id" tabindex="-1"
                :aria-labelledby="'userProfilemd' + userStore.user._id + 'Label'" aria-hidden="true">
                <div class="modal-dialog modal-dialog modal-dialog-centered">
                    <div class="modal-content text-white" style="background-color: rgba(10, 9, 45, 0.9);">
                        <div class="modal-header">
                            <h5 class="modal-title" :id="'userProfilemd' + userStore.user._id + 'Label'">
                                Confirm password
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex justify-content-center flex-column align-items-center">
                            <label for="updateUserConfirmPass" class="py-2">Type your password to update your
                                infomation</label>
                            <span class="w-100" style="border: 2px solid #016386 !important; box-shadow: none !important;">
                                <input id="updateUserConfirmPass" type="password"
                                    class="w-100 p-1 border-none bg-transparent transparentInput" style="box-shadow: none; "
                                    v-model="updateUserConfirmPass" @keyup="checkKeyCode">
                            </span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal"
                                class="rounded btn text-gray confirmDeleteButton btn-success" style="opacity: 0.9;"
                                ref="updateUserInfoButton"
                                @click="confirmUpdatePass(userStore.user.email, updateUserConfirmPass)">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div v-else-if="userStore.isAuthorized == false" class="row text-center pt-4">
        <h2>
            Authentication required
        </h2>
    </div>
</template>
<script>
// import { ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

import { storage } from "../config/firebase.config.js"

import { useUserStore } from '../stores/userStore'
import { useSongStore } from "../stores/songStore"
import { useArtistStore } from "../stores/artistStore"
import { useGenreStore } from "../stores/genreStore"
import { usePlaylistStore } from "../stores/playlistStore"

// import $ from 'jquery'

export default {
    setup() {
        const songStore = useSongStore()
        const userStore = useUserStore()
        const artistStore = useArtistStore()
        const genreStore = useGenreStore()
        const playlistStore = usePlaylistStore()
        return { userStore, songStore, artistStore, genreStore, playlistStore }
    },
    watch: {
        'updateDetail.userName': function () {
            this.validateUsername()
            this.validateEmail()
            this.validatePassword()
            this.validateCountry()
            this.validateDoB()
            // console.log("name", this.validatedName, "email", this.validatedEmail, "password", this.validatedPassword, "Country", this.validatedCountry, "DoB", this.validatedDoB);
        },
        'updateDetail.password': function () {
            this.validatePassword()
            this.validateUsername()
            this.validateEmail()
            this.validateCountry()
            this.validateDoB()
            // console.log("name", this.validatedName, "email", this.validatedEmail, "password", this.validatedPassword, "Country", this.validatedCountry, "DoB", this.validatedDoB);
        },
        'updateDetail.country': function () {
            this.validateCountry()
            this.validatePassword()
            this.validateUsername()
            this.validateEmail()
            this.validateDoB()
            // console.log("name", this.validatedName, "email", this.validatedEmail, "password", this.validatedPassword, "Country", this.validatedCountry, "DoB", this.validatedDoB);
        },
        'updateDetail.DoB': function () {
            this.validateDoB()
            this.validateCountry()
            this.validatePassword()
            this.validateUsername()
            this.validateEmail()
            // console.log("name", this.validatedName, "email", this.validatedEmail, "password", this.validatedPassword, "Country", this.validatedCountry, "DoB", this.validatedDoB);
        }
    },
    data() {
        return {
            updateUserConfirmPass: '',
            updateDetail: {
                userName: "",
                email: "",
                password: "",
                DoB: null,
                country: ''
            },
            country_list: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
            msg: {
                name: "",
                email: "",
                password: "",
                DoB: '',
                country: ''
            },
            validatedName: false,
            validatedEmail: true,
            validatedPassword: false,
            validatedCountry: false,
            validatedDoB: false,
            imageData: null,
            imagePreview: null
        }
    },
    methods: {
        async deleteUserSongs(userId, songId) {
            let songName = ''
            let playlistId = []
            let genreId = []
            for (let index in this.songStore.songs) {
                if (this.songStore.songs[index]._id === songId) {
                    songName = this.songStore.songs[index].name
                }
            }

            // push the playlist id, which contain the song we want to delelte
            for (const playlistIndex in this.playlistStore.playlists) {
                for (const index in this.playlistStore.playlists[playlistIndex].songs) {
                    if (this.playlistStore.playlists[playlistIndex].songs[index] == songId) {
                        playlistId.push(this.playlistStore.playlists[playlistIndex]._id)
                    }
                }
            }

            // push the genre id, which contain the song we want to delelte
            for (const genreIndex in this.genreStore.genres) {
                for (const index in this.genreStore.genres[genreIndex].songs) {
                    if (this.genreStore.genres[genreIndex].songs[index] == songId) {
                        genreId.push(this.genreStore.genres[genreIndex]._id)
                    }
                }
            }
            // console.log(playlistId, "playlist contain song");
            // console.log(genreId, "genre contain song");

            // let songThumbnailRef = ref(storage, `img/songs/${songName}${this.userStore.user._id}`);
            // let songFileRef = ref(storage, `mp3/${songName}${this.userStore.user._id}`);

            // deleteObject(songThumbnailRef).then(() => {
            //     console.log("thumbnail firebase deleted");
            // }).catch((error) => {
            //     console.log(error, "thumbnail delete wasn't")
            // });

            // deleteObject(songFileRef).then(() => {
            //     console.log("song file firebase deleted");
            // }).catch((error) => {
            //     console.log(error, "songfile delete wasn't")
            // });

            let songDeleted = null
            let userSongDeleted = null
            let artistSongDeleted = null
            let playlistSongDeleted = null
            let genreSongDeleted = null

            songDeleted = await this.songStore.deleteSong(songId)
            if (songDeleted) {
                userSongDeleted = await this.userStore.removeUserSongs(userId, songId)
                if (userSongDeleted) {
                    artistSongDeleted = await this.artistStore.removeArtistSongs(this.userStore.user.artistId, songId)
                    if (artistSongDeleted) {
                        if (Object.keys(playlistId).length > 0) {
                            for (const key in playlistId) {
                                playlistSongDeleted = await this.playlistStore.removeSongFromPlaylist(playlistId[key], songId)
                            }
                            if (playlistSongDeleted) {
                                if (Object.keys(genreId).length > 0) {
                                    for (const genreKey in genreId) {
                                        genreSongDeleted = await this.genreStore.removeSongFromGenres(genreId[genreKey], songId)
                                    }
                                    if (genreSongDeleted) {
                                        this.$toast.success(`${songName} has been deleted`)
                                        // console.log('Song has been deleted')
                                    }
                                }
                            }
                        } else {
                            if (Object.keys(genreId).length > 0) {
                                for (const genreKey in genreId) {
                                    genreSongDeleted = await this.genreStore.removeSongFromGenres(genreId[genreKey], songId)
                                }
                                if (genreSongDeleted) {
                                    this.$toast.success(`${songName} has been deleted`)
                                    // console.log('Song has been deleted')
                                }
                            } else {
                                this.$toast.success(`${songName} has been deleted`)
                                // console.log('Song has been deleted')
                            }
                        }
                    } else {
                        // console.log("artist song error");
                        this.$toast.error("Can't delete song")
                    }
                } else {
                    // console.log("user song error");
                    this.$toast.error("Can't delete song")
                }
            } else {
                // console.log("song delete error");
                this.$toast.error("Can't delete song")
            }

        },
        async userProfileDeletePlaylist(userId, playlistId) {
            let playlisName = ''
            this.playlistStore.playlists.forEach(playlist => {
                if (playlist._id === playlistId) {
                    playlisName = playlist.name
                }
            })
            let playlistDeleted = await this.playlistStore.deletePlaylist(playlistId)
            let userPlaylistUpdated = await this.userStore.updateUserPlaylists(userId, playlistId)
            if (userPlaylistUpdated && playlistDeleted) {
                this.$toast.success(`${playlisName} has been deleted`)
            } else {
                this.$toast.error("Can't delete playlist")
            }
        },
        async userProfileFav(userId, songId) {
            let songName = ''
            this.songStore.songs.forEach(song => {
                if (song._id === songId) {
                    songName = song.name
                }
            })
            let addedFav = await this.userStore.updateFavorites(userId, songId)
            if (addedFav == 2) {
                this.$toast.success(`${songName} has been removed from favorites`)
            } else if (addedFav == 0) {
                this.$toast.error("Can't removed")
            }
        },
        validateUsername() {
            if (this.updateDetail.userName == "") {
                this.updateDetail.userName = this.userStore.user.userName
                this.msg.name = ""
                this.validatedName = true
            } else {
                this.msg.name = ""
                this.validatedName = true
            }
        },
        validateEmail() {
            this.updateDetail.email = this.userStore.user.email
            this.msg.email = ""
            this.validatedEmail = true
        },
        validatePassword() {
            const RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            if (this.updateDetail.password == "") {
                this.validatedPassword = true
                this.msg.password = ""
            } else if (this.updateDetail.password.match(RegExp)) {
                this.msg.password = ""
                this.validatedPassword = true
            } else if (this.updateDetail.password.length < 8) {
                this.msg.password = "Minimum eight characters";
                this.validatedPassword = false
            } else {
                this.msg.password = "At least one letter, one number and one special character";
                this.validatedPassword = false
            }
        },
        validateCountry() {
            if (!this.updateDetail.country) {
                this.updateDetail.country = this.userStore.user.country
                this.validatedCountry = true
                this.msg.country = ""
            } else {
                this.msg.country = ""
                this.validatedCountry = true
            }
        },
        validateDoB() {
            if (!this.updateDetail.DoB) {
                const indexOfT = this.userStore.user.DoB.indexOf('T')
                this.updateDetail.DoB = this.userStore.user.DoB.slice(0, indexOfT)
                this.msg.DoB = ''
                this.validatedDoB = true
            } else {
                this.msg.DoB = ""
                this.validatedDoB = true
            }
        },
        checkKeyCode(e) {
            if (e.keyCode == 13) {
                this.$refs.updateUserInfoButton.click()
            }
        },
        async confirmUpdatePass(email, password) {
            let user = {
                email: email,
                password: password
            }
            let confirmed = await this.userStore.confirmPass(user)
            console.log("confirmed", confirmed);
            if (confirmed == true) {
                if (this.updateDetail.password == '') {
                    let us = {
                        userName: this.updateDetail.userName,
                        DoB: this.updateDetail.DoB,
                        country: this.updateDetail.country
                    }
                    this.updateUserInfo(us)
                } else if (this.updateDetail.password != '') {
                    this.updateUserInfoPassword(this.updateDetail)
                }
            } else {
                this.$toast.error("Password incorrect")
            }
        },
        updateUserInfoPassword(user) {
            let artistInfo = {
                name: this.updateDetail.userName
            }
            let userInfoUpdated = this.userStore.updateUserInfoPassword(this.userStore.user._id, user)
            let artistInfoUpdated = false
            if (userInfoUpdated) {
                artistInfoUpdated = this.artistStore.updateArtistInfo(this.userStore.user.artistId, artistInfo)
                if (artistInfoUpdated) {
                    // console.log("User and artist relative updated");
                    this.$toast.success("Your infomation has been updated")
                } else {
                    // console.log("Cant update your infomation");
                    this.$toast.error("Cant update your infomation")
                }
            } else {
                // console.log("Cant update your infomation");
                this.$toast.error("Cant update your infomation")
            }
        },
        updateUserInfo(user) {
            let artistInfo = {
                name: this.updateDetail.userName
            }
            let userInfoUpdated = this.userStore.updateUserInfo(this.userStore.user._id, user)
            let artistInfoUpdated = false
            if (userInfoUpdated) {
                artistInfoUpdated = this.artistStore.updateArtistInfo(this.userStore.user.artistId, artistInfo)
                if (artistInfoUpdated) {
                    // console.log("User and artist relative updated");
                    this.$toast.success("Your infomation has been updated")
                } else {
                    // console.log("Cant update your infomation");
                    this.$toast.error("Cant update your infomation")
                }
            } else {
                // console.log("Cant update your infomation");
                this.$toast.error("Cant update your infomation")
            }
        },

        async removeSongFromUserPlaylist(songId, playlistId) {
            let songName = ''
            let playlistName = ''
            this.songStore.songs.forEach(song => {
                if (song._id === songId) {
                    songName = song.name
                }
            });
            this.playlistStore.playlists.forEach(playlist => {
                if (playlist._id === playlistId) {
                    playlistName = playlist.name
                }
            });
            let res = await this.playlistStore.removeSongFromPlaylist(playlistId, songId)
            if (res) {
                // console.log("Song was removed from playlist");
                this.$toast.success(`${songName} was removed from "${playlistName}"`)
            } else {
                // console.log("Can't remove song from playlist");
                this.$toast.error(`Can't remove ${songName} from ${playlistName}`)
            }
        },
        clickToChangeAv() {
            this.$refs.userAvatarInput.click()
        },
        previewChangeAvatar(event) {
            this.$refs.changeAvatarButton.click()
            this.imageData = event.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(this.imageData)
            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }
        },
        changeAvatar() {
            const avatarStorageRef = ref(storage, `img/users/${this.userStore.user.userName}${Date.now()}`);

            const imageUploadTask = uploadBytesResumable(avatarStorageRef, this.imageData)
            imageUploadTask.on('state_changed',
                (snapshot) => {
                    // console.log('avatar uploading ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '%');
                    switch (snapshot.state) {
                        case 'paused':
                            // console.log('avatar upload is paused');
                            break;
                        case 'running':
                            // console.log('avatar upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(imageUploadTask.snapshot.ref)
                        .then((avatarDownloadURL) => {
                            // console.log('avatar available at', avatarDownloadURL);
                            // console.log("Avatar changed");
                            this.userStore.changeUserAvatar(this.userStore.user._id, avatarDownloadURL)
                            this.artistStore.updateArtistAvatar(this.userStore.user.artistId, avatarDownloadURL)
                            this.$toast.success("Avatar has been changed")
                        })
                })
        }
    },
    created() {
    },
    mounted() {
        // if (this.userStore.isAuthorized === false) {
        //     this.$router.push("/home")
        //     this.$toast.warning("Authentication required")
        // }
    },
    updated() {
    }
}
</script>
<style scoped>
.confirmDeleteButton:hover {
    color: white !important;
    opacity: 1 !important;
}

.profileUserAvatar {
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 5px 5px 10px #0E3343, -5px -5px 10px #0E3343
}

.userChangeSection {
    border: 2px solid #015D7D !important;
    border-radius: 5px;
}

.userChangeInput {
    box-shadow: none !important;
    border-radius: 5px;
}

.userChangeInput {
    box-shadow: none !important;
    color: white;
}

.userChangeInput:placeholder-shown {
    color: #D3D3D3;
}

.userChangeInfoButton:hover {
    color: white;
    background-color: #0D6539 !important;
}

.userChangeInput:focus {
    outline: none;
    color: white;
}

::-webkit-calendar-picker-indicator {
    filter: invert(1);
    font-size: 1.2rem;
}
</style>