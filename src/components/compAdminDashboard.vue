<template>
    <div class="row" style="margin-top: 12px;" v-if="userStore.user && userStore.isAuthorized && userStore.user.role == 'admin'">
        <h3 class="col-12 my-4 text-white">
            Dashboard
        </h3>
        <div class="col-12 mb-4">
            <div class="row justify-content-center">
                <span class="col-lg-3 col-6 text-end mb-lg-0 mb-2">
                    <div class="row w-100 p-2 m-0 border-light-ocean" style="border-radius: 5px 5px 0px 0px">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                Total users
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ Object.keys(userStore.users).length - 1 }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(95,91,204, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-user-group" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end mb-lg-0 mb-2">
                    <div class="row w-100 p-2 m-0 border-light-ocean" style="border-radius: 5px 5px 0px 0px">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                Total song
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ Object.keys(songStore.songs).length }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(251, 223, 7, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-music" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end">
                    <div class="row w-100 p-2 m-0 border-light-ocean" style="border-radius: 5px 5px 0px 0px">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                Total playlist
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ Object.keys(playlistStore.playlists).length }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(56, 229, 77, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-rectangle-list" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end">
                    <div class="row w-100 p-2 m-0 border-light-ocean" style="border-radius: 5px 5px 0px 0px">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                Total stream
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ totalStream }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(0, 245, 255, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-play" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end py-2">
                    <div class="row w-100 p-2 m-0 border-light-ocean">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                            The most listened
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ listenTheMost.name }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(248, 6, 204, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-headphones-simple" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end py-2">
                    <div class="row w-100 p-2 m-0 border-light-ocean">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                The most contributed
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ theMostContributed.userName }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(229, 186, 115, 0.8)">
                                <font-awesome-icon icon="fa-solid fa-user" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end py-2">
                    <div class="row w-100 p-2 m-0 border-light-ocean">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                The best artist
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ theBestArtist.name }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(249, 74, 41, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-user-astronaut" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
                <span class="col-lg-3 col-6 text-end py-2">
                    <div class="row w-100 p-2 m-0 border-light-ocean">
                        <span class="col-9  text-start">
                            <span class="row text-white fw-semi-bold opacity-75">
                                Latest user
                            </span>
                            <span class="row fw-semi-bold text-white heart ellipsisContent text-start">
                                {{ latestUser.userName }}
                            </span>
                        </span>
                        <span class="col-3 text-end px-0">
                            <span
                                class="w-100 d-flex justify-content-center align-items-center d-block text-white rounded-4 h-100"
                                style="background-color: rgba(22, 242, 12, 0.8);">
                                <font-awesome-icon icon="fa-solid fa-user-clock" class="fs-5" />
                            </span>
                        </span>
                    </div>
                </span>
            </div>
        </div>
        <div class="col-12 mb-2">
            <div class="row w-100 mx-0 text-white bg-light-ocean-gradient-to-bottom" style="border-radius: 5px;">
                <div class="p-2 col-12">
                    <div class="row justify-content-between align-items-center">
                        <h5 class="col-md-10 col-8 mb-0">
                            User details
                        </h5>
                        <div class="col-md-2 col-4 text-end btn border-none text-white px-5" data-bs-toggle="collapse"
                            data-bs-target="#userManage" aria-expanded="false" aria-controls="userManage">
                            <span class="hoverPointerWhite">
                                <font-awesome-icon icon="fa-solid fa-list-check" />
                            </span>
                        </div>
                    </div>
                </div>
                <div id="userManage" class="col-12 collapse show" aria-labelledby="userManage">
                    <template v-for="user in userStore.users" :key="user">
                        <div class="row border-bottom" v-if="user.role != 'admin'">
                            <div class="col-1 d-none d-md-flex justify-content-center my-2 rounded-circle">
                                <img :src="user.avatar" alt="" class="w-75 rounded-circle" style="aspect-ratio: 1/1;">
                            </div>
                            <div class="col-5 d-flex flex-column justify-content-center my-2">
                                <div class="fs-6 fw-semi-bold ellipsisContent">
                                    {{ user.userName }}
                                </div>
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Country:
                                    </span> {{ user.country }}
                                </div>
                            </div>
                            <div class="col-5 d-flex flex-column justify-content-center my-2">
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Email:
                                    </span>
                                    {{ user.email }}
                                </div>
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        DoB:
                                    </span>
                                    {{ new Date(user.DoB).getDate() + " " + new
                                            Date(user.DoB).toLocaleString('default', { month: 'long' }) + " " + new
                                                Date(user.DoB).getFullYear()
                                    }}
                                </div>
                            </div>
                            <div class="col-md-1 col-2 d-flex flex-column justify-content-center my-2">
                                <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                    data-bs-toggle="modal" :data-bs-target="'#dashboardmd' + user._id" />
                            </div>
                            <!-- Delete user modal -->
                            <div class="modal fade" :id="'dashboardmd' + user._id" :ref="user._id" tabindex="-1"
                                :aria-labelledby="'dashboardmd' + user._id + 'Label'" aria-hidden="true">
                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                    <div class="modal-content text-white"
                                        style="background-color: rgba(0, 54, 74, 0.9);">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="'dashboardmd' + user._id + 'Label'">Delete
                                                confirmation</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div
                                            class="modal-body d-flex justify-content-center flex-column align-items-center ">
                                            <font-awesome-icon class="p-1" icon="fa-solid fa-triangle-exclamation"
                                                style="color: red;" />
                                            <p>
                                                You want to delete user <strong>"{{ user.userName }}"</strong>. Which
                                                means that the songs and
                                                related playlists will also be deleted
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" :class="'btclose' + user._id"
                                                class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" data-bs-dismiss="modal"
                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                style="opacity: 0.8;" @click="deleteUser(user)">
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
        </div>
        <div class="col-12 mb-2">
            <div class="row w-100 mx-0 text-white bg-light-ocean-gradient-to-bottom" style="border-radius: 5px;">
                <div class="p-2 col-12">
                    <div class="row justify-content-between align-items-center">
                        <h5 class="col-md-10 col-8 mb-0">
                            Playlist details
                        </h5>
                        <div class="col-md-2 col-4 text-end btn border-none text-white px-5" data-bs-toggle="collapse"
                            data-bs-target="#playlistManage" aria-expanded="false" aria-controls="playlistManage">
                            <span class="hoverPointerWhite">
                                <font-awesome-icon icon="fa-solid fa-list-check" />
                            </span>
                        </div>
                    </div>
                </div>
                <div id="playlistManage" class="col-12 collapse" aria-labelledby="playlistManage">
                    <template v-for="playlist in playlistStore.playlists" :key="playlist">
                        <div class="row border-bottom">
                            <div class="col-1 d-none d-md-flex justify-content-center my-2">
                                <img :src="playlist.thumbnail" alt="" class="w-100 border"
                                    style="aspect-ratio: 1/1; border-radius: 5px;">

                            </div>
                            <div class="col-5 d-flex flex-column justify-content-center my-2">
                                <router-link :to="{
                                    name: 'playlist',
                                    params: { id: playlist._id }
                                }">
                                    <div class="fs-6 text-white ellipsisContent">
                                        <span class="hoverPointerWhite underlineHoverEffect w-auto fw-semi-bold">
                                            {{ playlist.name }}
                                        </span>
                                    </div>
                                </router-link>
                                <div>
                                    <template v-for="user in userStore.users" :key="user">
                                        <span class="text-gray ellipsisContent" v-if="user._id === playlist.creator">
                                            Creator:
                                            <span class="text-white">
                                                {{ user.userName }}
                                            </span>
                                        </span>
                                    </template>
                                </div>
                            </div>
                            <div class="col-5 d-flex flex-column justify-content-center my-2">
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Songs:
                                    </span>
                                    {{ Object.keys(playlist.songs).length }}
                                </div>
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Created:
                                    </span>
                                    {{ new Date(playlist.createdAt).getDate() + " " + new
                                            Date(playlist.createdAt).toLocaleString('default', { month: 'long' }) + " " + new
                                                Date(playlist.createdAt).getFullYear()
                                    }}
                                </div>
                            </div>
                            <div class="col-md-1 col-2 d-flex flex-column justify-content-center my-2">
                                <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                    data-bs-toggle="modal" :data-bs-target="'#dashboardmd' + playlist._id" />
                            </div>
                            <!-- Delete user modal -->
                            <div class="modal fade" :id="'dashboardmd' + playlist._id" :ref="playlist._id" tabindex="-1"
                                :aria-labelledby="'dashboardmd' + playlist._id + 'Label'" aria-hidden="true">
                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                    <div class="modal-content text-white"
                                        style="background-color: rgba(0, 54, 74, 0.9);">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="'dashboardmd' + playlist._id + 'Label'">Delete
                                                confirmation</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div
                                            class="modal-body d-flex justify-content-center flex-column align-items-center ">
                                            <font-awesome-icon class="p-1" icon="fa-solid fa-triangle-exclamation"
                                                style="color: red;" />
                                            <p>
                                                You want to delete playlist <strong>"{{ playlist.name }}"</strong>. It
                                                can't be recovered.
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" :class="'btclose' + playlist._id"
                                                class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" data-bs-dismiss="modal"
                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                style="opacity: 0.8;"
                                                @click="deleteUserPlaylistDashboard(playlist._id, playlist.creator)">
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
        </div>
        <div class="col-12 mb-2">
            <div class="row w-100 mx-0 text-white bg-light-ocean-gradient-to-bottom" style="border-radius: 5px;">
                <div class="p-2 col-12">
                    <div class="row justify-content-between align-items-center">
                        <h5 class="col-md-10 col-8 mb-0">
                            Genre details
                        </h5>
                        <div class="col-md-2 col-4 text-end btn border-none text-white px-5" data-bs-toggle="collapse"
                            data-bs-target="#genreManage" aria-expanded="false" aria-controls="genreManage">
                            <span class="hoverPointerWhite">
                                <font-awesome-icon icon="fa-solid fa-list-check" />
                            </span>
                        </div>
                    </div>
                </div>
                <div id="genreManage" class="col-12 collapse" aria-labelledby="genreManage" style="background-color: rgba(57, 62, 70, 0.5); border-radius: 5px;">
                    <template v-for="genre in genreStore.genres" :key="genre">
                        <div class="row border-bottom">
                            <div class="col-5 d-flex flex-column justify-content-center my-2">
                                <router-link :to="{
                                    name: 'genre',
                                    params: { id: genre._id }
                                }">
                                    <div class="fs-5 text-white ellipsisContent">
                                        <span class="hoverPointerWhite underlineHoverEffect w-auto fw-semi-bold">
                                            {{ genre.name }}
                                        </span>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-3 d-flex flex-column justify-content-center my-2">
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Songs:
                                    </span>
                                    {{ Object.keys(genre.songs).length }}
                                </div>
                            </div>
                            <div class="col-md-3 col-2 d-flex justify-content-end align-items.center my-2"
                                data-bs-toggle="collapse" :data-bs-target="'#genreclldb' + genre._id"
                                aria-expanded="false" :aria-controls="'genreclldb' + genre._id">
                                <div class="ellipsisContent my-auto">
                                    <span class=" hoverPointerWhite underlineHoverEffect">
                                        View all
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-1 col-2 d-flex flex-column justify-content-center my-2">
                                <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                    data-bs-toggle="modal" :data-bs-target="'#dashboardgenremd' + genre._id" />
                            </div>
                            <!-- Delete user modal -->
                            <div class="modal fade" :id="'dashboardgenremd' + genre._id" :ref="genre._id" tabindex="-1"
                                :aria-labelledby="'dashboardgenremd' + genre._id + 'Label'" aria-hidden="true">
                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                    <div class="modal-content text-white"
                                        style="background-color: rgba(0, 54, 74, 0.9);">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="'dashboardgenremd' + genre._id + 'Label'">
                                                Delete
                                                confirmation</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div
                                            class="modal-body d-flex justify-content-center flex-column align-items-center ">
                                            <font-awesome-icon class="p-1" icon="fa-solid fa-triangle-exclamation"
                                                style="color: red;" />
                                            <p>
                                                You want to delete genre <strong>"{{ genre.name }}"</strong>. It
                                                can't be recovered.
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" :class="'btclose' + genre._id"
                                                class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" data-bs-dismiss="modal"
                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                style="opacity: 0.8;" @click="deleteGenre(genre._id)">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="collapse col-12 bg-light-ocean" :id="'genreclldb' + genre._id"
                                style="border-radius: 5px;">
                                <template v-for="songId in genre.songs" :key="songId">
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
                                                    <template v-for="artist in artistStore.artists" :key="artist">
                                                        <div class="col-12" v-if="artist._id === song.artist[0]">
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
                                                    :data-bs-target="'#delGenreSongmd' + song._id + genre._id" />
                                            </div>
                                            <!-- Delete Song modal -->
                                            <div class="modal fade" :id="'delGenreSongmd' + song._id + genre._id"
                                                :ref="song._id" tabindex="-1"
                                                :aria-labelledby="'delGenreSongmd' + song._id + genre._id + 'Label'"
                                                aria-hidden="true">
                                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                                    <div class="modal-content text-white"
                                                        style="background-color: rgba(10, 9, 45, 0.9);">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title"
                                                                :id="'delGenreSongmd' + song._id + genre._id + 'Label'">
                                                                Delete
                                                                confirmation</h5>
                                                            <button type="button" class="btn-close"
                                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body d-flex flex-column align-items-center">
                                                            <font-awesome-icon class="px-1"
                                                                icon="fa-solid fa-triangle-exclamation"
                                                                style="color: red;" />
                                                            <span>
                                                                You want to remove "{{ song.name }}" from {{
                                                                        genre.name
                                                                }}
                                                            </span>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button"
                                                                :class="'delPlaylistSongbtclose' + song._id"
                                                                class="rounded btn btn-secondary"
                                                                data-bs-dismiss="modal">Close</button>
                                                            <button type="button" data-bs-dismiss="modal"
                                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                                style="opacity: 0.8;"
                                                                @click="removeSongFromGenre(genre._id, song._id)">
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
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="col-12 mb-2">
            <div class="row w-100 mx-0 text-white bg-light-ocean-gradient-to-bottom" style="border-radius: 5px;">
                <div class="p-2 col-12">
                    <div class="row justify-content-between align-items-center">
                        <h5 class="col-md-10 col-8 mb-0">
                            Song details
                        </h5>
                        <div class="col-md-2 col-4 text-end btn border-none text-white  px-5" data-bs-toggle="collapse"
                            data-bs-target="#songManage" aria-expanded="false" aria-controls="songManage">
                            <span class="hoverPointerWhite">
                                <font-awesome-icon icon="fa-solid fa-list-check" />
                            </span>
                        </div>
                    </div>
                </div>
                <div id="songManage" class="col-12 collapse" aria-labelledby="songManage">
                    <template v-for="song in songStore.songs" :key="song">
                        <div class="row border-bottom">
                            <div
                                class="col-lg-1 col-3 col-md-2 d-flex justify-content-center my-2 position-relative manageItem hoverPointerWhite">
                                <img :src="song.thumbnail" alt="" class="w-100 border manageItemThumbnail"
                                    style="aspect-ratio: 1/1; border-radius: 5px;">
                                <div class="d-flex align-items-center manageSongThumbnailOverlay">
                                    <font-awesome-icon
                                        v-if="song._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                                        icon="fa-solid fa-circle-pause" class="hoverPointerWhite fs-4"
                                        @click="pauseSong()" />
                                    <font-awesome-icon v-else icon="fa-solid fa-circle-play"
                                        class="hoverPointerWhite fs-4" @click="setCurrentSong(song._id)" />
                                </div>
                            </div>
                            <div class="col-md-5 col-7 d-flex flex-column justify-content-center my-2">
                                <div class="">

                                    <router-link :to="{
                                        name: 'song',
                                        params: { id: song._id }
                                    }">
                                        <span class="fs-6 text-white">
                                            <span
                                                class="fw-semi-bold ellipsisContent">
                                                <span class="hoverPointerWhite underlineHoverEffect ">
                                                    {{ song.name }}

                                                </span>
                                            </span>
                                        </span>
                                    </router-link>
                                </div>
                                <div>
                                    <span class="text-gray ellipsisContent">
                                        Artist:
                                        <template v-for="(artistId, index) in song.artist" :key="artistId">
                                            <template v-for="artist in artistStore.artists" :key="artist">
                                                <span
                                                    v-if="artistId === artist._id && index === Object.keys(song.artist).length - 1 && Object.keys(song.artist).length === 1"
                                                    class="text-white">
                                                    <router-link class="w-auto" :to="{
                                                        name: 'artist',
                                                        params: { id: artist._id }
                                                    }">
                                                        <span class="text-white">
                                                            <span class="hoverPointerWhite underlineHoverEffect">
                                                                {{ artist.name }}
                                                            </span>
                                                        </span>
                                                    </router-link>
                                                </span>
                                                <span
                                                    v-else-if="artistId === artist._id && index < Object.keys(song.artist).length - 1 && index === 0"
                                                    class="text-white">

                                                    <router-link class="w-auto" :to="{
                                                        name: 'artist',
                                                        params: { id: artist._id }
                                                    }">
                                                        <span class="text-white">
                                                            <span class="hoverPointerWhite underlineHoverEffect">
                                                                {{ artist.name }}
                                                            </span>
                                                        </span>
                                                    </router-link>
                                                </span>
                                                <span
                                                    v-else-if="artistId === artist._id && index < Object.keys(song.artist).length - 1 && index > 0"
                                                    class="text-white">

                                                    <router-link class="w-auto" :to="{
                                                        name: 'artist',
                                                        params: { id: artist._id }
                                                    }">
                                                        <span class="text-white">
                                                            <span class="hoverPointerWhite underlineHoverEffect">
                                                                , {{ artist.name }}
                                                            </span>
                                                        </span>
                                                    </router-link>
                                                </span>
                                                <span
                                                    v-else-if="artistId === artist._id && index === Object.keys(song.artist).length - 1"
                                                    class="text-white">
                                                    <router-link class="w-auto" :to="{
                                                        name: 'artist',
                                                        params: { id: artist._id }
                                                    }">
                                                        <span class="text-white hoverPointerWhite underlineHoverEffect">
                                                            <span class="hoverPointerWhite underlineHoverEffect">
                                                                , {{ artist.name }}
                                                            </span>
                                                        </span>
                                                    </router-link>
                                                </span>
                                            </template>
                                        </template>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-5 col-4 d-none d-md-flex flex-column justify-content-center my-2">
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Streams:
                                    </span>
                                    {{ song.stream }}
                                </div>
                                <div class="ellipsisContent">
                                    <span class="text-gray">
                                        Created:
                                    </span>
                                    {{ new Date(song.createdAt).getDate() + " " + new
                                            Date(song.createdAt).toLocaleString('default', { month: 'long' }) + " " + new
                                                Date(song.createdAt).getFullYear()
                                    }}
                                </div>
                            </div>
                            <div class="col-md-1 col-2 d-flex flex-column justify-content-center my-2">
                                <font-awesome-icon icon="fa-solid fa-trash" class="fs-4 hoverPointerWhite"
                                    data-bs-toggle="modal" :data-bs-target="'#dashboardmd' + song._id" />
                            </div>
                            <!-- Delete Song modal -->
                            <div class="modal fade" :id="'dashboardmd' + song._id" :ref="song._id" tabindex="-1"
                                :aria-labelledby="'dashboardmd' + song._id + 'Label'" aria-hidden="true">
                                <div class="modal-dialog modal-dialog modal-dialog-centered">
                                    <div class="modal-content text-white"
                                        style="background-color: rgba(0, 54, 74, 0.9);">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="'dashboardmd' + song._id + 'Label'">Delete
                                                confirmation</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation"
                                                style="color: red;" />
                                            You want to delete <strong>"{{ song.name }}"</strong>. It can't be recovered
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" :class="'btclose' + song._id"
                                                class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" data-bs-dismiss="modal"
                                                class="rounded btn text-gray confirmDeleteButton bg-danger"
                                                style="opacity: 0.8;" @click="deleteUserSongs(song._id)">
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
        </div>
    </div>
    <div v-else-if="userStore.isAuthorized == false" class="row text-center pt-4">
        <h2>
            Authentication required
        </h2>
    </div>
    <div v-else-if="userStore.user.role !== 'admin'" class="row text-center pt-4">
        <h2>
            Permission denied
        </h2>
    </div>
</template>
<script>
// import { ref, deleteObject } from 'firebase/storage'
// import { storage } from "../config/firebase.config.js"

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
            listenTheMost: {},
            totalStream: 0,
            theMostContributed: {},
            theBestArtist: {},
            latestUser: {}
        }
    },
    methods: {
        loadTotalStream() {
            const sum = this.songStore.songs.reduce((accumulator, object) => {
                return accumulator + object.stream;
            }, 0);
            // console.log(sum);
            this.totalStream = sum
            // return sum
        },
        loadListenTheMost(){
            let max = Math.max(...this.songStore.songs.map(o => o.stream))
            var result = this.songStore.songs.filter(obj => {
                return obj.stream === max
            })       
            // console.log(result);
            this.listenTheMost = result[0]                  
        },
        loadTheMostContributed(){
            let max = -Infinity
            let maxIndex = null
            this.userStore.users.forEach((item, index) => {
                if(item.songs.length > max && item.userName != "ADMIN"){
                    max = item.songs.length
                    maxIndex = index
                }
            })
            this.theMostContributed =  this.userStore.users[maxIndex]               
        },
        loadTheBestArtist(){
            let max = -Infinity
            let maxIndex = null
            this.artistStore.artists.forEach((item, index) => {
                if(item.songs.length > max && item.name != "ADMIN"){
                    max = item.songs.length
                    maxIndex = index
                }
            })
            this.theBestArtist =  this.artistStore.artists[maxIndex] 
        },
        loadLatestUser(){
            let max = -Infinity
            let maxIndex = null
            this.userStore.users.forEach((item, index) => {
                if(new Date(item.createdAt) > max){
                    max = new Date(item.createdAt)
                    maxIndex = index
                    
                }
            })
            this.latestUser = this.userStore.users[maxIndex]
        },
        async setCurrentSong(songId) {
            await this.songStore.setCurrentSong(songId)
        },
        pauseSong() {
            this.songStore.isPlaying = false
        },
        async deleteUserSongs(songId) {
            // let songName = ''
            let songType = ''
            let songArtist = []
            let playlistId = []
            let member = null
            let userId = ''

            for (const index in this.songStore.songs) {
                if (this.songStore.songs[index]._id === songId) {
                    // songName = this.songStore.songs[index].name
                    songType = this.songStore.songs[index].type
                    this.songStore.songs[index].artist.forEach(songArt => {
                        songArtist.push(songArt)
                    });
                }
            }

            for (const index in this.userStore.users) {
                for (const key in this.userStore.users[index].songs) {
                    if (this.userStore.users[index].songs[key] == songId) {
                        userId = this.userStore.users[index]._id
                        member = this.userStore.users[index]
                    }
                }
            }

            for (const playlistIndex in this.playlistStore.playlists) {
                for (const index in this.playlistStore.playlists[playlistIndex].songs) {
                    if (this.playlistStore.playlists[playlistIndex].songs[index] == songId) {
                        playlistId.push(this.playlistStore.playlists[playlistIndex]._id)
                    }
                }
            }

            // if (songType === 'member') {
            //     let songThumbnailRef = ref(storage, `img/songs/${songName}${userId}`);
            //     let songFileRef = ref(storage, `mp3/${songName}${userId}`);

            //     deleteObject(songThumbnailRef).then(() => {
            //         console.log("thumbnail firebase deleted");
            //     }).catch((error) => {
            //         console.log(error, "thumbnail delete wasn't")
            //     });

            //     deleteObject(songFileRef).then(() => {
            //         console.log("song file firebase deleted");
            //     }).catch((error) => {
            //         console.log(error, "songfile delete wasn't")
            //     });
            // }

            // console.log(playlistId, "playlist contain song");
            // console.log(member, "member has song");
            // console.log(userId, "UserId has song");

            let songDeleted = null
            let userSongDeleted = null
            let artistSongDeleted = null
            let playlistSongDeleted = null

            songDeleted = await this.songStore.deleteSong(songId)
            if (songDeleted) {
                if (songType === 'member') {
                    userSongDeleted = await this.userStore.removeUserSongsByAdmin(userId, songId)
                    if (userSongDeleted) {
                        artistSongDeleted = await this.artistStore.removeArtistSongs(member.artistId, songId)
                        if (artistSongDeleted) {
                            for (const key in playlistId) {
                                playlistSongDeleted = await this.playlistStore.removeSongFromPlaylist(playlistId[key], songId)
                            }
                            if (playlistSongDeleted) {
                                this.$toast.success('Song has been deleted')
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
                    for (const artistInSong in songArtist) {
                        artistSongDeleted = await this.artistStore.removeArtistSongs(songArtist[artistInSong], songId)
                    }
                    if (artistSongDeleted) {
                        for (const key in playlistId) {
                            playlistSongDeleted = await this.playlistStore.removeSongFromPlaylist(playlistId[key], songId)
                        }
                        if (playlistSongDeleted) {
                            this.$toast.success('Song has been deleted')
                        }
                    } else {
                        // console.log("artist song error");
                        this.$toast.error("Can't delete song")
                    }
                }

            } else {
                // console.log("song delete error");
                this.$toast.error("Can't delete song")
            }
        },
        async deleteUser(user) {
            // let songName = ''
            // let deleteCondition = false
            // if (Object.keys(user.songs).length > 0) {
            //     for (const index in user.songs) {
            //         for (const songIdx in this.songStore.songs) {
            //             if (user.songs[index] === this.songStore.songs[songIdx]._id) {
            //                 songName = this.songStore.songs[songIdx].name

            //                 let songThumbnailRef = ref(storage, `img/songs/${songName}${user._id}`);
            //                 let songFileRef = ref(storage, `mp3/${songName}${user._id}`);

            //                 deleteObject(songThumbnailRef).then(() => {
            //                     console.log("thumbnail firebase deleted");
            //                 }).catch((error) => {
            //                     console.log(error, "thumbnail delete wasn't")
            //                 });
            //                 deleteObject(songFileRef).then(() => {
            //                     console.log("song file firebase deleted");
            //                 }).catch((error) => {
            //                     console.log(error, "songfile delete wasn't")
            //                 });
            //             }
            //         }
            //     }
            // }
            let userDeleted = await this.userStore.deleteUser(user._id)
            let userSongsDeleted = null
            let userPlaylistsDeleted = null
            let userArtistsDeleted = null
            if (userDeleted) {
                if (Object.keys(user.playlists).length > 0) {
                    for (const index in user.playlists) {
                        userPlaylistsDeleted = await this.playlistStore.deletePlaylist(user.playlists[index])
                    }
                } else {
                    userPlaylistsDeleted = true
                }
                if (Object.keys(user.songs).length > 0) {
                    for (const index in user.songs) {
                        userSongsDeleted = await this.songStore.deleteSong(user.songs[index])
                    }
                } else {
                    userSongsDeleted = true
                }

                userArtistsDeleted = await this.artistStore.deleteArtist(user.artistId)


                if (userDeleted && userSongsDeleted && userPlaylistsDeleted && userArtistsDeleted) {
                    this.$toast.success('User has been deleted')
                } else {
                    this.$toast.error("Can't delete user")
                }
            }
        },
        async deleteUserPlaylistDashboard(playlistId, userId) {
            let playlistDeleted = false
            let UserPlaylistDeleted = false

            UserPlaylistDeleted = await this.userStore.deleteUserPlaylistByAdmin(userId, playlistId)
            if (UserPlaylistDeleted) {
                playlistDeleted = await this.playlistStore.deletePlaylist(playlistId)
            }

            if (playlistDeleted && UserPlaylistDeleted) {
                this.$toast.success('Playlist has been deleted')
            } else {
                this.$toast.error("Can't delete playlist")
            }
        },
        deleteGenre(genreId) {
            let deletedGenre = this.genreStore.deleteGenre(genreId)
            if (deletedGenre) {
                console.log("genre was deleted");
            } else {
                console.log("can't delete genre");
            }
        },
        removeSongFromGenre(genreId, songId) {
            let deletedSongGenre = this.genreStore.removeSongFromGenres(genreId, songId)
            if (deletedSongGenre) {
                console.log("song was delete from genre");
            }
        }
    },
    created() {
    },
    mounted() {
        this.loadListenTheMost()
        this.loadTotalStream()
        this.loadTheMostContributed()
        this.loadTheBestArtist()
        this.loadLatestUser()
    },
    updated() {

    }
}
</script>
<style scoped>
.manageItemThumbnail {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
}

.manageSongThumbnailOverlay {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.manageItem:hover .manageSongThumbnailOverlay {
    opacity: 1;
}

.confirmDeleteButton:hover {
    opacity: 1 !important;
    color: white;
}

.manageItem:hover .manageItemThumbnail {
    opacity: 0.6;
}
</style>