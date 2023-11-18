<template>
  <div class="col-12 bg-light-ocean-gradient py-1"
    v-if="songStore.playing[songStore.currentSong] && songStore.playing.length > 0" style="z-index: 2000;">
    <div class="row">
      <div class="songDetail col-3 my-auto pr-0">
        <div class="row overflow-hidden">
          <div class="col-5 d-md-block d-none my-auto">
            <div class="position-relative w-100">
              <img :class="{ 'leftRotating': songStore.isPlaying }"
                class="thumbnailBackground w-100 rounded-pill opacity-50"
                :src="songStore.playing[songStore.currentSong].thumbnail" alt="" style="aspect-ratio: 1/1;">
              <div class="shadow-lg thumbnailBubble position-absolute border rounded-pill">
                <img :class="{ 'rightRotating': songStore.isPlaying }" class="w-100 rounded-pill"
                  :src="songStore.playing[songStore.currentSong].thumbnail" alt="" style="aspect-ratio: 1/1;">
              </div>
            </div>
          </div>
          <div class="col-md-7 col-12 my-auto ps-md-0">
            <div class="row py-2 pe-0 me-2 overflow-hidden">
              <router-link :to="{
                name: 'song',
                params: { id: songStore.playing[songStore.currentSong]._id }
              }">
                <span class="songName text-white">
                  <span class=" hoverPointerWhite underlineHoverEffect fw-bolder">
                    {{ songStore.playing[songStore.currentSong].name }}
                  </span>
                </span>
              </router-link>
            </div>
            <div class="row py-2 me-2 pe-0 overflow-hidden">
              <router-link :to="{
                name: 'artist',
                params: { id: songStore.playing[songStore.currentSong].artist[0] }
              }">
                <span class="text-white songArtist">
                  <span class=" hoverPointerWhite underlineHoverEffect fw-bolder">
                    {{ artistActive }}
                  </span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="songControls mx-lg-0 px-0 mx-auto col-lg-7 col-8">
        <div class="row w-100 py-3 ms-0 justify-content-between align-items-center">
          <div v-if="userStore.user" class="col-1 px-md-12 px-0 playerIcon hoverPointerWhite"
            @click="favorite(userStore.user._id, songStore.playing[songStore.currentSong]._id)"
            :class="{ 'heart': userStore.user.favorites.includes(songStore.playing[songStore.currentSong]._id) }">
            <font-awesome-icon class="d-inline" icon="fa-solid fa-heart" />
          </div>
          <div v-else class="col-1 px-md-12 px-0 hoverPointerWhite" @click="$router.push('/login')">
            <font-awesome-icon class="d-inline" icon="fa-solid fa-heart" />
          </div>
          <div class="col-1 px-md-12 px-0 hoverPointerWhite" @click="downloadSong">
            <font-awesome-icon class="d-inline" icon="fa-solid fa-download" />
          </div>
          <div class="col-md-3 col-2 d-flex justify-content-end">
            <div class="row">
              <div class="col-auto px-lg-4 hoverPointerWhite" @click="previousSong" ref="previousButton">
                <font-awesome-icon icon="fa-solid fa-backward-step" />
              </div>
              <div class="col-auto d-none d-md-block px-lg-4 hoverPointerWhite" @click="seekBack">
                <font-awesome-icon icon="fa-solid fa-backward" />
              </div>
            </div>
          </div>
          <div class="colltrollers col-2 d-flex justify-content-center">
            <div class="row">
              <div class="col-auto d-flex align-items-center px-lg-4 hoverPointerWhite" @click="toggleControls">
                <font-awesome-icon :class="{ 'd-none': songStore.isPlaying }" class="p-2" icon="fa-solid fa-play" />
                <font-awesome-icon :class="{ 'd-none': !songStore.isPlaying }" class="p-2" icon="fa-solid fa-pause" />
                <audio controls :src="songStore.playing[songStore.currentSong].songURL" @timeupdate="onTimeUpdate"
                  @loadedmetadata="onLoadedMetaData" ref="audio" class="d-none"></audio>
                <a :href="songStore.playing[songStore.currentSong].songURL"
                  :download="songStore.playing[songStore.currentSong].name" ref="downloadButton" class="d-none"></a>
                <!-- <span tabindex="-1" class="d-none" ref="spaceBar" @keypress.space="toggleControls"></span> -->
                <!-- <input tabindex="-1" class="d-none" @keyup.space="toggleControls"/> -->
              </div>
            </div>
          </div>
          <div class="col-md-3 col-2">
            <div class="row">
              <div class="col-auto d-none d-md-block px-lg-4 hoverPointerWhite">
                <font-awesome-icon icon="fa-solid fa-forward" @click="seekNext" />
              </div>
              <div class="col-auto px-lg-4 hoverPointerWhite" @click="nextSong" ref="nextButton">
                <font-awesome-icon icon="fa-solid fa-forward-step" />
              </div>
            </div>
          </div>
          <div class="col-1 px-md-12 px-0 text-start hoverPointerWhite" @click="shuffleSong"
            :class="{ 'heart': isShuffle }">
            <font-awesome-icon icon="fa-solid fa-shuffle" />
          </div>
          <div class="col-1 px-md-12 px-0 text-end hoverPointerWhite" @click="repeatSong" :class="{ 'heart': isRepeat }">
            <font-awesome-icon icon="fa-solid fa-repeat" />
          </div>
        </div>
        <div class="row w-100 mx-0">
          <input type="range" class="form-range progress px-0 col-12 w-100 range" @change="changeSongCurrentTime"
            @mouseup="changeSongCurrentTime" ref="songCurrentTimeRange" value="0" min="0" max="100" step="1"
            style="height: 5px; " id="songCurrentTimeRange">
          <div class="col-12 d-flex justify-content-between pt-1 px-0">
            <span>
              {{ songCurrentTime }}
            </span>
            <span>
              {{ songDuration }}
            </span>
          </div>
        </div>

      </div>
      <div class="songVolume col-2 d-none d-lg-flex align-items-center">
        <div class="row w-100 justify-content-between">
          <span class="col-3 hoverPointerWhite" @click="muted">
            <font-awesome-icon :class="{ 'd-none': isMuted }" icon="fa-solid fa-volume-high" />
            <font-awesome-icon :class="{ 'd-none': !isMuted }" icon="fa-solid fa-volume-xmark" />
          </span>
          <input type="range" class="form-range progress col-8 range my-auto" @change="changeVolume"
            @mouseup="changeVolume" v-model="volumeValue" ref="playerVolume" min="0" max="100" step="1"
            style="height: 5px !important; width: 70%;" id="volumeRange">
        </div>
      </div>
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
      artistActive: '',
      isShuffle: false,
      isRepeat: false,
      volumeValue: 100,
      isMuted: false,
      songCurrentTime: "00:00",
      songDuration: "00:00"
    }
  },
  methods: {
    toggleControls() {
      this.songStore.isPlaying = !this.songStore.isPlaying
    },
    convertTime(time) {
      var minutes = Math.floor(time / 60)
      minutes = (minutes >= 10) ? minutes : "0" + minutes
      var seconds = Math.floor(time % 60)
      seconds = (seconds >= 10) ? seconds : "0" + seconds

      return minutes + ':' + seconds
    },
    onTimeUpdate() {
      this.songCurrentTime = this.convertTime(this.$refs.audio.currentTime)
      this.$refs.songCurrentTimeRange.value = this.$refs.audio.currentTime
    },
    onLoadedMetaData() {
      this.$refs.songCurrentTimeRange.max = this.$refs.audio.duration
      this.songDuration = this.convertTime(this.$refs.audio.duration)
    },
    changeVolume() {
      if (this.isMuted) {
        this.isMuted = !this.isMuted
      }
      if (this.volumeValue / 100 == 0) {
        this.isMuted = true
      }
      this.$refs.audio.volume = this.volumeValue / 100
    },
    changeSongCurrentTime() {
      this.$refs.audio.currentTime = this.$refs.songCurrentTimeRange.value
    },
    muted() {
      this.isMuted = !this.isMuted
      if (this.isMuted) {
        this.$refs.audio.volume = 0
      } else {
        this.changeVolume()
      }
    },
    repeatSong() {
      this.isRepeat = !this.isRepeat
    },
    shuffleSong() {
      this.isShuffle = !this.isShuffle
    },
    previousSong() {
      if (this.isShuffle) {
        this.songStore.currentSong = Math.floor(Math.random() * (Object.keys(this.songStore.playing).length - 1))
        this.songStore.setSongStream(this.songStore.playing[this.songStore.currentSong]._id)
        // console.log(this.songStore.playing);
      } else {
        this.songStore.currentSong > 0 ? this.songStore.currentSong -= 1 : this.songStore.currentSong = (Object.keys(this.songStore.playing).length - 1)
        this.songStore.setSongStream(this.songStore.playing[this.songStore.currentSong]._id)
        // console.log(this.songStore.playing, this.songStore.currentSong);

      }
    },
    nextSong() {
      if (this.isShuffle) {
        this.songStore.currentSong = Math.floor(Math.random() * (Object.keys(this.songStore.playing).length - 1))
        this.songStore.setSongStream(this.songStore.playing[this.songStore.currentSong]._id)
      } else {
        this.songStore.currentSong < Object.keys(this.songStore.playing).length - 1 ? this.songStore.currentSong += 1 : this.songStore.currentSong = 0
        this.songStore.setSongStream(this.songStore.playing[this.songStore.currentSong]._id)
      }
    },
    seekBack() {
      this.$refs.audio.currentTime -= 10
    },
    seekNext() {
      this.$refs.audio.currentTime += 10
    },
    downloadSong() {
      this.$refs.downloadButton.click()
    },
    favorite(userId, songId) {
      this.userStore.updateFavorites(userId, songId)
      // this.isFavorite = fav
    },
    getCurrentArtist() {
      for (var i = 0; i < this.artistStore.artists.length; i++) {
        if (this.artistStore.artists[i]._id === this.songStore.playing[this.songStore.currentSong].artist[0]) {
          this.artistActive = this.artistStore.artists[i].name
          break
        }
      }
    }
  },
  computed: {
  },
  watch: {
    songCurrentTime() {
      if (this.songCurrentTime == this.songDuration) {
        if (this.isRepeat) {
          this.songCurrentTime = '00:00'
          // console.log(this.songCurrentTime);
          this.$refs.audio.play()
        } else {
          this.$refs.nextButton.click()
        }
      }
    },
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    // window.addEventListener('keypress', (event) => {
    //   if (event.keyCode === 32) {
    //     event.preventDefault();
    //     this.toggleControls()
    //     return false;
    //   }
    // });

  },
  beforeUpdate() {
    this.getCurrentArtist()
  },
  updated() {
    this.songStore.isPlaying === true ? this.$refs.audio.play() : this.$refs.audio.pause()
  },

}
</script>

<style scoped>
.songName,
.songArtist {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis
}

.playerIcon:hover {
  color: white;
}

.color-red {
  color: red;
}

.range {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.range:hover {
  opacity: 1;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  color: #FD841F;
  background: #FD841F;
  margin-top: -3.6px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: -407px 0 0 400px #FD841F;

  border: 1px solid #053a5f;
}

.range::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #FD841F;
  cursor: pointer;
}

/* .range {
  width: 400px;
  height: 15px;
  -webkit-appearance: none;
  background: #111;
  outline: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 1);
} */

.range::-webkit-slider-thumb {}




.thumbnailBubble {
  width: 80%;
  left: 50%;
  top: 50%;
  border-color: #FD841F;
  transform: translate(-50%, -50%);
}

.rightRotating {
  -webkit-animation: rightRotating 12s linear infinite;
  -moz-animation: rightRotating 12s linear infinite;
  -ms-animation: rightRotating 12s linear infinite;
  -o-animation: rightRotating 12s linear infinite;
  animation: rightRotating 12s linear infinite;
}

.leftRotating {
  -webkit-animation: leftRotating 12s linear infinite;
  -moz-animation: leftRotating 12s linear infinite;
  -ms-animation: leftRotating 12s linear infinite;
  -o-animation: leftRotating 12s linear infinite;
  animation: leftRotating 12s linear infinite;
}

@keyframes rightRotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes leftRotating {
  from {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }

  to {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
</style>