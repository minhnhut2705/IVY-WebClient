<template>
  <div class="row h-auto" style="padding-top: 12px;">
    <div class="col-lg-8 col-12 h-auto d-flex flex-column justify-content-between ">
      <div id="bannerCarousel" class="carousel slide carousel-fade border-dark-ocean rounded" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item position-relative active" data-bs-interval="3000" v-if="songStore.songs[7]">
            <img class="bannerImage d-block w-100" style="border: 1px solid #003245;" :src="songStore.songs[7].banner"
              alt="" />
            <span class="rounded position-absolute w-100 h-100 bottom-0 d-flex flex-column justify-content-end "
              style="background-image: linear-gradient(90deg, #032838, transparent );">
              <span class="w-50" style="left: 2%; bottom: 5%;">
                <h5 class="ellipsisContent text-white ">
                  <router-link :to="{
                    name: 'song',
                    params: { id: songStore.songs[7]._id }
                  }">
                    <span class="underlineHoverEffect fw-bold hoverPointerWhite">
                      {{ songStore.songs[7].name }}
                    </span>
                  </router-link>
                </h5>
                <template v-for="(artistId, index) in songStore.songs[7].artist" :key="artistId">
                  <template v-for="artist in artistStore.artists" :key="artist">
                    <router-link :to="{
                      name: 'artist',
                      params: { id: artist._id }
                    }">
                      <span v-if="artistId === artist._id && index < Object.keys(songStore.songs[7].artist).length - 1"
                        class="underlineHoverEffect hoverPointerWhite">
                        {{ artist.name }},
                      </span>
                      <span
                        v-else-if="artistId === artist._id && index === Object.keys(songStore.songs[7].artist).length - 1"
                        class="underlineHoverEffect hoverPointerWhite">
                        {{ artist.name }}
                      </span>
                    </router-link>
                  </template>
                </template>
                <span class="ellipsisContent mb-2">
                  {{ songStore.songs[7].stream }}
                  streams
                </span>
                <button @click="setCurrentSong(songStore.songs[7]._id, songStore.songs, 'songsIVY')"
                  class="bannerSliderPlayButton w-75 p-1 border-none rounded-pill fw-bold text-gray hoverPointerWhite">
                  Play
                </button>
              </span>
            </span>
          </div>
          <template v-for="item in 4" :key="item">
            <div class="carousel-item position-relative" data-bs-interval="3000" v-if="songStore.songs[item + 8]">
              <img class="bannerImage d-block w-100" style="border: 1px solid #003245; aspect-ratio: 1/1;"
                :src="songStore.songs[item + 8].banner" alt="" />
              <span class="rounded position-absolute w-100 h-100 bottom-0 d-flex flex-column justify-content-end "
                style="background-image: linear-gradient(90deg, #032838, transparent );">
                <span class="w-50" style="left: 2%; bottom: 5%;">
                  <h5 class="ellipsisContent text-white">
                    <router-link :to="{
                      name: 'song',
                      params: { id: songStore.songs[item + 8]._id }
                    }">
                      <span class="underlineHoverEffect fw-bold hoverPointerWhite">
                        {{ songStore.songs[item + 8].name }}
                      </span>
                    </router-link>
                  </h5>
                  <template v-for="(artistId, index) in songStore.songs[item + 8].artist" :key="artistId">
                    <template v-for="artist in artistStore.artists" :key="artist">
                      <router-link :to="{
                        name: 'artist',
                        params: { id: artist._id }
                      }">
                        <span
                          v-if="artistId === artist._id && index < Object.keys(songStore.songs[item + 8].artist).length - 1">
                          <span class="underlineHoverEffect hoverPointerWhite">
                            {{ artist.name }}
                          </span>
                          <span>
                            ,
                          </span>
                        </span>
                        <span class="underlineHoverEffect hoverPointerWhite"
                          v-else-if="artistId === artist._id && index === Object.keys(songStore.songs[item + 8].artist).length - 1">
                          {{ artist.name }}
                        </span>
                      </router-link>
                    </template>
                  </template>
                  <span class="ellipsisContent mb-2">
                    {{ songStore.songs[item + 8].stream }}
                    streams
                  </span>
                  <button @click="setCurrentSong(songStore.songs[item + 8]._id, songStore.songs, 'songsIVY')"
                    class="bannerSliderPlayButton w-75 p-1 border-none rounded-pill fw-bold text-gray hoverPointerWhite">
                    Play
                  </button>
                </span>
              </span>
            </div>
          </template>
        </div>
      </div>
      <div
        class="row mt-3 mb-lg-0 mb-3 h-auto border-dark-ocean justify-content-evenly bg-light-ocean-gradient-to-bottom px-0 mx-0 rounded">
        <div class="col-12 p-1">
          <div class="row p-2 w-100 mx-0 px-2">
            <h5 class="p-1 col-12 fw-semi-bold">
              Top Artists
            </h5>
          </div>
        </div>
        <template v-for="artist in 5" :key="artist">
          <div class="col-2 mb-2 position-relative" v-if="artistStore.artists[artist]">
            <router-link :to="{
              name: 'artist',
              params: { id: artistStore.artists[artist]._id }
            }">
              <div class="w-100">
                <img :src="artistStore.artists[artist].avatar" class="w-100 artistImage artistAvatarBackground" alt=""
                  style="aspect-ratio: 1/1;">
                <div class="artistAvatarBubble position-absolute">
                  <img :src="artistStore.artists[artist].avatar" class="w-100 artistImage" alt=""
                    style="aspect-ratio: 1/1;">
                </div>
              </div>
            </router-link>
            <div class="sectionArtistName text-center mt-2 ellipsisContent">
              <router-link :to="{
                name: 'artist',
                params: { id: artistStore.artists[artist]._id }
              }">
                <span class="ellipsisContent text-gray fw-semi-bold fs-6">
                  <span class=" hoverPointerWhite">
                    {{ artistStore.artists[artist].name }}
                  </span>
                </span>
              </router-link>
            </div>
          </div>
        </template>

      </div>
    </div>
    <div class="col-lg-4 col-12 ps-lg-0 h-auto">
      <div class="row rounded h-100 bg-light-ocean-gradient-to-bottom mx-0 border-dark-ocean rounded">
        <div class="col-12">
          <div class="row p-2">
            <h5 class="p-1 col-12 fw-semi-bold my-auto">
              Top Songs
            </h5>
          </div>
        </div>
        <template v-for="index in 8" :key="index">
          <div class="col-12 overflow-auto">
            <div class="row h-100 py-1 d-flex align-items-center" v-if="songStore.songs[index - 1]"
              :class="{ 'bg-light-ocean': songStore.songs[index - 1]._id === songStore.songs[songStore.currentSong]._id }">
              <div class="col-2 position-relative topSongItem hoverPointerWhite">
                <img class="w-100 topSongItemThumbnail" :src="songStore.songs[index - 1].thumbnail" alt=""
                  style="aspect-ratio: 1/1;">
                <div class="d-flex align-items-center topSongThumbnailOverlay">
                  <font-awesome-icon
                    v-if="songStore.songs[index - 1]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                    icon="fa-solid fa-circle-pause" class="hoverPointerWhite fs-4" @click="pauseSong()" />
                  <font-awesome-icon v-else icon="fa-solid fa-circle-play" class="hoverPointerWhite fs-4"
                    @click="setCurrentSong(songStore.songs[index - 1]._id, songStore.songs, 'songsIVY')" />
                </div>
              </div>
              <div class="col-lg-8 col-7 px-0 ">
                <span class="w-100 ellipsisContent d-flex flex-column justify-content-lg-between justify-content-evenly">
                  <div class="position-relative ellipsisContent ">
                    <router-link :to="{
                      name: 'song',
                      params: { id: songStore.songs[index - 1]._id }
                    }">
                      <span class="hoverPointerWhite w-auto underlineHoverEffect fs-6 fw-semi-bold">
                        {{ songStore.songs[index - 1].name }}
                      </span>
                    </router-link>
                  </div>
                  <template v-for="artist in artistStore.artists" :key="artist">
                    <div class="fs-8 ps-1 " v-if="artist._id === songStore.songs[index - 1].artist[0]">

                      <router-link :to="{
                        name: 'artist',
                        params: { id: artist._id }
                      }">
                        <span class="underlineHoverEffect hoverPointerWhite">
                          {{ artist.name }}
                        </span>
                      </router-link>
                    </div>
                  </template>
                </span>
              </div>
              <div
                class="col-lg-2 col-3 text-end d-flex align-items-center justify-content-lg-center justify-content-evenly">
                <span v-if="userStore.isAuthorized">
                  <font-awesome-icon class="fs-4 hoverPointerWhite d-lg-none d-block" icon="fa-solid fa-heart"
                    @click="favorite(userStore.user._id, songStore.songs[index - 1]._id)"
                    :class="{ 'heart': userStore.user.favorites.includes(songStore.songs[index - 1]._id) }" />
                </span>
                <span v-else>
                  <router-link to="/login">
                    <font-awesome-icon class="fs-4 hoverPointerWhite d-lg-none d-block" icon="fa-solid fa-heart" />
                  </router-link>
                </span>

                <span class="" style="opacity: 1;">
                  <font-awesome-icon class="fs-4 hoverPointerWhite d-lg-none d-sm-block d-none my-auto"
                    icon="fa-solid fa-square-plus" data-bs-toggle="modal"
                    :data-bs-target="'#tsongmd' + songStore.songs[index - 1]._id" />
                  <div class="modal fade" :id="'tsongmd' + songStore.songs[index - 1]._id" tabindex="-1"
                    :aria-labelledby="'tsongmd' + songStore.songs[index - 1]._id + 'Label'" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered">
                      <div class="modal-content text-white" style="background-color: rgba(0, 54, 74, 0.9);">
                        <div class="modal-header">
                          <h5 class="modal-title" :id="'tsongmd' + songStore.songs[index - 1]._id + 'Label'">
                            Your playlists
                          </h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body row mx-auto py-0 w-100 justify-content-center"
                          v-if="userStore.isAuthorized === true">
                          <template v-for="playlist in playlistStore.playlists" :key="playlist">
                            <div v-if="userStore.user._id === playlist.creator" class="col-12 p-0 w-100 addPlaylistItem">
                              <div class="w-100 row p-2 m-0  border-bottom"
                                @click="addSongToPlaylist(songStore.songs[index - 1]._id, playlist._id)">
                                <div class="col-9 text-start">
                                  {{ playlist.name }}
                                </div>
                                <div class="col-3 text-end">
                                  {{ Object.keys(playlist.songs).length }} songs
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="col-12 p-0 w-100">
                            <div class="w-100 row py-2 px-0 m-0  border-bottom">
                              <div class="col-12 text-center fs-4 text-gray">
                                <font-awesome-icon class="hoverPointerWhite" icon="fa-solid fa-square-plus"
                                  data-bs-toggle="collapse" data-bs-target="#createPlaylist" aria-expanded="false"
                                  aria-controls="createPlaylist" />
                              </div>
                              <div class="collapse col-12 px-0" id="createPlaylist" style="border-radius: 5px;">
                                <!-- @click="createAndAddSongToPlaylist(userStore.user._id, song._id)" -->
                                <div class="d-flex justify-content-between">
                                  <input class="border-light-ocean w-0 p-1 playlistNameCreate bg-transparent" type="text"
                                    placeholder="Type playlist name" v-model="playlistName">
                                  <button type="button" class="rounded btn btn-dark-green-blue"
                                    @click="createAndAddSongToPlaylist(userStore.user._id, songStore.songs[index - 1]._id)">
                                    Create
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div class="modal-body row mx-auto py-0 w-100 justify-content-center" v-else>
                          <div class="col-12 p-0 w-100">
                            <div class="w-100 row p-2 m-0 text-center">
                              <div class="col-12">
                                <router-link to="/login">
                                  <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                    Login
                                  </strong>
                                </router-link>
                                or
                                <router-link to="/register">
                                  <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                    Register
                                  </strong>
                                </router-link>
                                to get your playlist
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>

                <font-awesome-icon
                  v-if="songStore.songs[index - 1]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                  icon="fa-solid fa-circle-pause" class="hoverPointerWhite fs-4" @click="pauseSong()" />
                <font-awesome-icon v-else icon="fa-solid fa-circle-play" class="hoverPointerWhite fs-4"
                  @click="setCurrentSong(songStore.songs[index - 1]._id, songStore.songs, 'songsIVY')" />
              </div>

            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="row my-3 w-100 bg-light-ocean-gradient-to-bottom genreContent rounded mx-0 border-dark-ocean">
    <div class="col-12">
      <div class="row w-100 mx-0 py-2">
        <h5 class="p-1 col-12 fw-semi-bold my-auto">
          Genres
        </h5>
      </div>
      <div class="row mx-0 pb-2 genreSection">
        <template v-for="genre in genreStore.genres" :key="genre._id">
          <span v-if="genre.songs.length > 0"
            class="align-items-center flex-nowrap justify-content-center d-flex col rounded p-3 d-inline-block m-1 text-center text-white"
            style="background-color: #1C6758;">
            <router-link :to="{
              name: 'genre',
              params: { id: genre._id }
            }">
              <span class="my-auto underlineHoverEffect hoverPointerWhite genreName">
                {{ genre.name }}
              </span>
            </router-link>
          </span>
        </template>
      </div>
    </div>
  </div>
  <div class="row mx-0 justify-content-between" style="padding-bottom: 12px;">
    <div class="border-dark-ocean bg-light-ocean-gradient-to-bottom rounded pb-lg-1 pb-4 w-lg-49 w-100"
      v-if="songStore.recent">
      <h5 class="p-2 fw-bold row">
        Recently played
      </h5>
      <div class="row">
        <div class="col-12">
          <template v-for="(item) in songStore.recent" :key="item">
            <template v-for="song in songStore.songs" :key="song">
              <div class="row py-1 d-flex justify-content-between" style="border-bottom: 1px solid #5A8E99;"
                v-if="(song._id === item)">
                <span class="col-1 px-0 ms-2 d-flex align-items-center text-gray">
                  <div class="position-relative NUItem hoverPointerWhite">
                    <img class="w-100 border border-1 NUItemThumbnail" :src="song.thumbnail" alt=""
                      style="aspect-ratio: 1/1;" @click="setCurrentSong(song._id, songStore.songs, 'songsIVY')">
                    <div class="d-flex align-items-center NUThumbnailOverlay">
                      <font-awesome-icon
                        v-if="song._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                        icon="fa-solid fa-circle-pause" class="fs-4" @click="pauseSong()" />
                      <font-awesome-icon v-else icon="fa-solid fa-circle-play" class="fs-4"
                        @click="setCurrentSong(song._id, songStore.songs, 'songsIVY')" />
                    </div>
                  </div>
                </span>
                <span
                  class="col-7 text-gray justify-content-lg-between justify-content-md-evenly justify-content-between d-flex flex-column">
                  <span class="ellipsisContent row">
                    <router-link :to="{
                      name: 'song',
                      params: { id: song._id }
                    }">
                      <span class="underlineHoverEffect hoverPointerWhite fs-lg-5 fs-6 fw-semi-bold ">
                        {{ song.name }}
                      </span>
                    </router-link>
                  </span>
                  <template v-for="artist in artistStore.artists" :key="artist._id">
                    <!-- v-if="song.artist[0] === artist._id" -->
                    <span class="row" v-if="song.artist[0] === artist._id">
                      <span class="col-12 ellipsisContent">
                        <router-link :to="{
                          name: 'artist',
                          params: { id: artist._id }
                        }">
                          <span class="underlineHoverEffect hoverPointerWhite fs-6">
                            {{ artist.name }}
                          </span>
                        </router-link>
                      </span>
                    </span>
                  </template>
                </span>
                <span class="col-3 d-flex justify-content-between align-items-center text-gray">
                  <span v-if="userStore.isAuthorized">
                    <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-heart"
                      @click="favorite(userStore.user._id, song._id)"
                      :class="{ 'heart': userStore.user.favorites.includes(song._id) }" />
                  </span>
                  <span v-else>
                    <router-link to="/login">
                      <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-heart" />
                    </router-link>
                  </span>
                  <span>
                    <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-square-plus"
                      data-bs-toggle="modal" :data-bs-target="'#nupllmd' + song._id" />
                    <div class="modal fade" :id="'nupllmd' + song._id" tabindex="-1"
                      :aria-labelledby="'nupllmd' + song._id + 'Label'" aria-hidden="true">
                      <div class="modal-dialog modal-dialog modal-dialog-centered">
                        <div class="modal-content text-white" style="background-color: rgba(0, 54, 74, 0.9);">
                          <div class="modal-header">
                            <h5 class="modal-title" :id="'nupllmd' + song._id + 'Label'">
                              Your playlists
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                </div>
                              </div>
                            </template>
                            <div class="col-12 p-0 w-100">
                              <div class="w-100 row py-2 px-0 m-0  border-bottom">
                                <div class="col-12 text-center fs-4 text-gray">
                                  <font-awesome-icon class="hoverPointerWhite" icon="fa-solid fa-square-plus"
                                    data-bs-toggle="collapse" data-bs-target="#createPlaylist" aria-expanded="false"
                                    aria-controls="createPlaylist" />
                                </div>
                                <div class="collapse col-12 px-0" id="createPlaylist" style="border-radius: 5px;">
                                  <!-- @click="createAndAddSongToPlaylist(userStore.user._id, song._id)" -->
                                  <div class="d-flex justify-content-between">
                                    <input class="border-light-ocean w-0 p-1 playlistNameCreate bg-transparent"
                                      type="text" placeholder="Type playlist name" v-model="playlistName">
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
                            <div class="col-12 p-0 w-100">
                              <div class="w-100 row p-2 m-0 text-center">
                                <div class="col-12">
                                  <router-link to="/login">
                                    <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                      Login
                                    </strong>
                                  </router-link>
                                  or
                                  <router-link to="/register">
                                    <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                      Register
                                    </strong>
                                  </router-link>
                                  to get your playlist
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                  <span>
                    <font-awesome-icon
                      v-if="song._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                      class="fs-4 hoverPointerWhite" icon="fa-solid fa-circle-pause" @click="pauseSong()" />
                    <font-awesome-icon v-else class="fs-4 hoverPointerWhite" icon="fa-solid fa-circle-play"
                      @click="setCurrentSong(song._id, songStore.songs, 'songsIVY')" />
                  </span>
                </span>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div class="border-dark-ocean bg-light-ocean-gradient-to-bottom rounded w-lg-49 w-100">
      <h5 class="p-2 fw-bold row">
        Next up
      </h5>
      <div class="row">
        <div class="col-12">
          <template v-for="item in 10" :key="item">
            <div class="row py-1 d-flex justify-content-between" style="border-bottom: 1px solid #5A8E99;"
              v-if="(songStore.songs[item + songStore.currentSong - 1] && songStore.currentSong <= Object.keys(songStore.songs).length - 10)"
              :class="{ 'bg-light-ocean': songStore.songs[item + songStore.currentSong - 1]._id === songStore.songs[songStore.currentSong]._id }">
              <span class="col-1 px-0 ms-2 d-flex align-items-center text-gray">
                <div class="position-relative NUItem hoverPointerWhite">
                  <img class="w-100 border border-1 NUItemThumbnail"
                    :src="songStore.songs[item + songStore.currentSong - 1].thumbnail" alt=""
                    @click="setCurrentSong(songStore.songs[item + songStore.currentSong - 1]._id, songStore.songs, 'songsIVY')"
                    style="aspect-ratio: 1/1;">
                  <div class="d-flex align-items-center NUThumbnailOverlay">
                    <font-awesome-icon
                      v-if="songStore.songs[item + songStore.currentSong - 1]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                      icon="fa-solid fa-circle-pause" class="fs-4" @click="pauseSong()" />
                    <font-awesome-icon v-else icon="fa-solid fa-circle-play" class="fs-4"
                      @click="setCurrentSong(songStore.songs[item + songStore.currentSong - 1]._id, songStore.songs, 'songsIVY')" />
                  </div>
                </div>
              </span>
              <span
                class="col-7 text-gray justify-content-lg-between justify-content-md-evenly justify-content-between d-flex flex-column">
                <span class="ellipsisContent row">
                  <router-link :to="{
                    name: 'song',
                    params: { id: songStore.songs[item + songStore.currentSong - 1]._id }
                  }">
                    <span class="underlineHoverEffect hoverPointerWhite fs-lg-5 fs-6 fw-semi-bold ">
                      {{ songStore.songs[item + songStore.currentSong - 1].name }}
                    </span>
                  </router-link>
                </span>
                <template v-for="artist in artistStore.artists" :key="artist._id">
                  <!-- v-if="songStore.songs[item + songStore.currentSong - 1].artist[0] === artist._id" -->
                  <span class="row" v-if="songStore.songs[item + songStore.currentSong - 1].artist[0] === artist._id">
                    <span class="col-12 ellipsisContent">
                      <router-link :to="{
                        name: 'artist',
                        params: { id: artist._id }
                      }">
                        <span class="underlineHoverEffect hoverPointerWhite fs-6">
                          {{ artist.name }}
                        </span>
                      </router-link>
                    </span>
                  </span>
                </template>
              </span>
              <span class="col-3 d-flex justify-content-between align-items-center text-gray">
                <span v-if="userStore.isAuthorized">
                  <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-heart"
                    @click="favorite(userStore.user._id, songStore.songs[item + songStore.currentSong - 1]._id)"
                    :class="{ 'heart': userStore.user.favorites.includes(songStore.songs[item + songStore.currentSong - 1]._id) }" />
                </span>
                <span v-else>
                  <router-link to="/login">
                    <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-heart" />
                  </router-link>
                </span>
                <span>
                  <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-square-plus" data-bs-toggle="modal"
                    :data-bs-target="'#nupllmd' + songStore.songs[item + songStore.currentSong - 1]._id" />
                  <div class="modal fade" :id="'nupllmd' + songStore.songs[item + songStore.currentSong - 1]._id"
                    tabindex="-1"
                    :aria-labelledby="'nupllmd' + songStore.songs[item + songStore.currentSong - 1]._id + 'Label'"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered">
                      <div class="modal-content text-white" style="background-color: rgba(0, 54, 74, 0.9);">
                        <div class="modal-header">
                          <h5 class="modal-title"
                            :id="'nupllmd' + songStore.songs[item + songStore.currentSong - 1]._id + 'Label'">
                            Your playlists
                          </h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body row mx-auto py-0 w-100 justify-content-center"
                          v-if="userStore.isAuthorized === true">
                          <template v-for="playlist in playlistStore.playlists" :key="playlist">
                            <div v-if="userStore.user._id === playlist.creator" class="col-12 p-0 w-100 addPlaylistItem">
                              <div class="w-100 row p-2 m-0  border-bottom"
                                @click="addSongToPlaylist(songStore.songs[item + songStore.currentSong - 1]._id, playlist._id)">
                                <div class="col-9">
                                  {{ playlist.name }}
                                </div>
                                <div class="col-3 text-end">
                                  {{ Object.keys(playlist.songs).length }} songs
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="col-12 p-0 w-100">
                            <div class="w-100 row py-2 px-0 m-0  border-bottom">
                              <div class="col-12 text-center fs-4 text-gray">
                                <font-awesome-icon class="hoverPointerWhite" icon="fa-solid fa-square-plus"
                                  data-bs-toggle="collapse" data-bs-target="#createPlaylist" aria-expanded="false"
                                  aria-controls="createPlaylist" />
                              </div>
                              <div class="collapse col-12 px-0" id="createPlaylist" style="border-radius: 5px;">
                                <!-- @click="createAndAddSongToPlaylist(userStore.user._id, song._id)" -->
                                <div class="d-flex justify-content-between">
                                  <input class="border-light-ocean w-0 p-1 playlistNameCreate bg-transparent" type="text"
                                    placeholder="Type playlist name" v-model="playlistName">
                                  <button type="button" class="rounded btn btn-dark-green-blue"
                                    @click="createAndAddSongToPlaylist(userStore.user._id, songStore.songs[item + songStore.currentSong - 1]._id)">
                                    Create
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div class="modal-body row mx-auto py-0 w-100 justify-content-center" v-else>
                          <div class="col-12 p-0 w-100">
                            <div class="w-100 row p-2 m-0 text-center">
                              <div class="col-12">
                                <router-link to="/login">
                                  <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                    Login
                                  </strong>
                                </router-link>
                                or
                                <router-link to="/register">
                                  <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                    Register
                                  </strong>
                                </router-link>
                                to get your playlist
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="rounded btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
                <span>
                  <font-awesome-icon
                    v-if="songStore.songs[item + songStore.currentSong - 1]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                    class="fs-4 hoverPointerWhite" icon="fa-solid fa-circle-pause" @click="pauseSong()" />
                  <font-awesome-icon v-else class="fs-4 hoverPointerWhite" icon="fa-solid fa-circle-play"
                    @click="setCurrentSong(songStore.songs[item + songStore.currentSong - 1]._id, songStore.songs, 'songsIVY')" />
                </span>
              </span>
            </div>
            <template v-if="(songStore.currentSong + item > Object.keys(songStore.songs).length)">
              <template v-for="(item1, index1) in (10 - item)" :key="index1">
                <div class="row py-1 d-flex justify-content-between" style="border-bottom: 1px solid #5A8E99;"
                  v-if="(songStore.songs[item1] && songStore.currentSong + item - 1 > Object.keys(songStore.songs).length)"
                  :class="{ 'bg-light-ocean': songStore.songs[item1]._id === songStore.songs[songStore.currentSong]._id }">
                  <span class="col-1 px-0 ms-2 d-flex align-items-center text-gray">
                    <div class="position-relative NUItem hoverPointerWhite">
                      <img class="w-100 border border-1 NUItemThumbnail" :src="songStore.songs[item1].thumbnail" alt=""
                        @click="setCurrentSong(songStore.songs[item1]._id, songStore.songs, 'songsIVY')"
                        style="aspect-ratio: 1/1;">
                      <div class="d-flex align-items-center NUThumbnailOverlay">
                        <font-awesome-icon
                          v-if="songStore.songs[item1]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                          icon="fa-solid fa-circle-pause" class="fs-4" @click="pauseSong()" />
                        <font-awesome-icon v-else icon="fa-solid fa-circle-play" class="fs-4"
                          @click="setCurrentSong(songStore.songs[item1]._id, songStore.songs, 'songsIVY')" />
                      </div>
                    </div>
                  </span>
                  <span
                    class="col-7 text-gray justify-content-lg-between justify-content-md-evenly justify-content-between d-flex flex-column">
                    <span class="ellipsisContent row">
                      <router-link :to="{
                        name: 'song',
                        params: { id: songStore.songs[item1]._id }
                      }">
                        <span class="underlineHoverEffect hoverPointerWhite fs-lg-5 fs-6 fw-semi-bold ">
                          {{ songStore.songs[item1].name }}
                        </span>
                      </router-link>
                    </span>
                    <template v-for="artist in artistStore.artists" :key="artist._id">
                      <!-- v-if="songStore.songs[item1].artist[0] === artist._id" -->
                      <span class="row" v-if="songStore.songs[item1].artist[0] === artist._id">
                        <span class="col-12 ellipsisContent">
                          <router-link :to="{
                            name: 'artist',
                            params: { id: artist._id }
                          }">
                            <span class="underlineHoverEffect hoverPointerWhite fs-6">
                              {{ artist.name }}
                            </span>
                          </router-link>
                        </span>
                      </span>
                    </template>
                  </span>
                  <span class="col-3 d-flex justify-content-between align-items-center text-gray">
                    <span v-if="userStore.isAuthorized">
                      <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-heart"
                        @click="favorite(userStore.user._id, songStore.songs[item1]._id)"
                        :class="{ 'heart': userStore.user.favorites.includes(songStore.songs[item1]._id) }" />
                    </span>
                    <span v-else>
                      <router-link to="/login">
                        <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-heart" />
                      </router-link>
                    </span>
                    <span>
                      <font-awesome-icon class="fs-4 hoverPointerWhite" icon="fa-solid fa-square-plus"
                        data-bs-toggle="modal" :data-bs-target="'#nupllmd' + songStore.songs[item1]._id" />
                      <div class="modal fade" :id="'nupllmd' + songStore.songs[item1]._id" tabindex="-1"
                        :aria-labelledby="'nupllmd' + songStore.songs[item1]._id + 'Label'" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                          <div class="modal-content text-white" style="background-color: rgba(0, 54, 74, 0.9);">
                            <div class="modal-header">
                              <h5 class="modal-title" :id="'nupllmd' + songStore.songs[item1]._id + 'Label'">
                                Your playlists
                              </h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body row mx-auto py-0 w-100 justify-content-center"
                              v-if="userStore.isAuthorized === true">
                              <template v-for="playlist in playlistStore.playlists" :key="playlist">
                                <div v-if="userStore.user._id === playlist.creator"
                                  class="col-12 p-0 w-100 addPlaylistItem">
                                  <div class="w-100 row p-2 m-0  border-bottom"
                                    @click="addSongToPlaylist(songStore.songs[item1]._id, playlist._id)">
                                    <div class="col-9">
                                      {{ playlist.name }}
                                    </div>
                                    <div class="col-3 text-end">
                                      {{ Object.keys(playlist.songs).length }} songs
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <div class="col-12 p-0 w-100">
                                <div class="w-100 row py-2 px-0 m-0  border-bottom">
                                  <div class="col-12 text-center fs-4 text-gray">
                                    <font-awesome-icon class="hoverPointerWhite" icon="fa-solid fa-square-plus"
                                      data-bs-toggle="collapse" data-bs-target="#createPlaylist" aria-expanded="false"
                                      aria-controls="createPlaylist" />
                                  </div>
                                  <div class="collapse col-12 px-0" id="createPlaylist" style="border-radius: 5px;">
                                    <!-- @click="createAndAddSongToPlaylist(userStore.user._id, song._id)" -->
                                    <div class="d-flex justify-content-between">
                                      <input class="border-light-ocean w-0 p-1 playlistNameCreate bg-transparent"
                                        type="text" placeholder="Type playlist name" v-model="playlistName">
                                      <button type="button" class="rounded btn btn-dark-green-blue"
                                        @click="createAndAddSongToPlaylist(userStore.user._id, songStore.songs[item1]._id)">
                                        Create
                                      </button>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div class="modal-body row mx-auto py-0 w-100 justify-content-center" v-else>
                              <div class="col-12 p-0 w-100">
                                <div class="w-100 row p-2 m-0 text-center">
                                  <div class="col-12">
                                    <router-link to="/login">
                                      <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                        Login
                                      </strong>
                                    </router-link>
                                    or
                                    <router-link to="/register">
                                      <strong class="hoverPointerWhite fs-5" data-bs-dismiss="modal">
                                        Register
                                      </strong>
                                    </router-link>
                                    to get your playlist
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="rounded btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                    <span>
                      <font-awesome-icon
                        v-if="songStore.songs[item1]._id === songStore.songs[songStore.currentSong]._id && songStore.isPlaying === true"
                        class="fs-4 hoverPointerWhite" icon="fa-solid fa-circle-pause" @click="pauseSong()" />
                      <font-awesome-icon v-else class="fs-4 hoverPointerWhite" icon="fa-solid fa-circle-play"
                        @click="setCurrentSong(songStore.songs[item1]._id, songStore.songs, 'songsIVY')" />
                    </span>
                  </span>
                </div>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
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
    }
  },
  methods: {
    // async setCurrentSong(songId) {
    //   await this.songStore.setCurrentSong(songId)
    // },
    async setCurrentSong(songId, songs, songsID) {
      let songIDs = [...songs.map((song) => {
        return song._id
      })]
      // console.log("songs: ", songIDs);
      this.songStore.setPlayingSongs(songIDs, songsID)
      await this.songStore.setCurrentSong(songId)
    },
    toggleControls() {
      this.songStore.isPlaying = !this.songStore.isPlaying
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
        songs: [songId],
        creator: userId,
        stream: 0
      }
      let playlistCreated = await this.playlistStore.createAndAddSongToPlaylist(playlist)
      let userUpdated = await this.userStore.updateUserPlaylists(userId, playlistCreated._id)
      if (playlistCreated && userUpdated) {
        this.$toast.success(`Playlist ${this.playlistName} has been created`);
      } else {
        this.$toast.error(`Playlist ${this.playlistName} can't be create`);
      }
    },
    favorite(userId, songId) {
      this.userStore.updateFavorites(userId, songId)
    },
    pauseSong() {
      this.songStore.isPlaying = false
    }
  },
  created() {
  },
  mounted() {
  },
  beforeUpdate() {
  }
}
</script>
<style scoped>
.artistImage {
  border-radius: 5%;
}

.playlistNameCreate {
  box-shadow: none !important;
  color: white;
  border:2px solid #015D7D !important;
}

.playlistNameCreate:placeholder-shown {
  color: #D3D3D3;
}
.playlistNameCreate::placeholder {
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

hr {
  margin: 0;
}

a {
  color: #D3D3D3;
  transition: all .2s ease-in-out;
}

a:hover {
  scale: 1.2;
  color: white;
}

.artistAvatarBubble {
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #003245;
  border-radius: 5%;
}

.artistAvatarBubble:hover .artistAvatarBackground,
.artistAvatarBubble:hover {
  opacity: 0.4;
}

.artistAvatarBackground {
  opacity: 0.4;
  border-bottom: 1px solid;
}

.topSongItemThumbnail {
  border-radius: 5%;
}

.NUItemThumbnail,
.MFYItemThumbnail,
.topSongItemThumbnail {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.NUThumbnailOverlay,
.MFYThumbnailOverlay,
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

.NUItem:hover .NUThumbnailOverlay,
.MFYItem:hover .MFYThumbnailOverlay,
.topSongItem:hover .topSongThumbnailOverlay {
  opacity: 1;
}

.NUItem:hover .NUItemThumbnail,
.topSongItem:hover .topSongItemThumbnail,
.MFYItem:hover .MFYItemThumbnail {
  opacity: 0.6;
}

.bannerSliderPlayButton {
  background-image: linear-gradient(90deg, #01688C, #003446);
}

.bannerSliderPlayButton:hover {
  background-image: linear-gradient(90deg, #003446, #01688C);
}

.ellipsisContent {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis
}

.bannerImage {
  /* border-radius: 48px 10px; */
  border-radius: 4px;
  height: 250px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  object-fit: cover;
  object-position: 25% 25%;
}
</style>