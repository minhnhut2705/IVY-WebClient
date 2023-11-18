import { defineStore } from 'pinia'
import songService from '../services/song.service'
// import router from '../router/index'

export const useSongStore = defineStore('songs', {
    state: () => ({
        songs: [],
        currentSong: 0,
        isPlaying: false,
        streams: {
            stream: 0
        },
        recent: [],
        playing: [],
        songListId: []
    }),
    actions: {
        async loadSongs() {
            try {
                let response = await songService.getAll()
                if (response.success) {
                    this.songs = []

                    response.songs.forEach(element => {
                        this.songs.push(element)
                    });
                    this.songs.sort((a, b) => parseInt(b.stream) - parseInt(a.stream))
                }
            } catch (err) {
                // console.log("Something Went Wrong");
                // console.log(err.response);
            }
        },
        async setCurrentSong(songId) {
            try {
                if (localStorage.getItem("recent")) {
                    this.recent = JSON.parse(localStorage.getItem("recent"))
                    if (this.playing != []) {
                        for (const song in this.playing) {
                            if (this.playing[song]._id === songId) {
                                this.currentSong = parseInt(song)
                                this.isPlaying = true
                                this.streams.stream = this.playing[song].stream + 1
                                if (Object.keys(this.recent).length < 10) {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.push(songId)
                                        localStorage.setItem("recent", JSON.stringify(this.recent))
                                    }
                                } else {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.splice(0, 1)
                                        this.recent.push(songId)
                                        localStorage.setItem("recent", JSON.stringify(this.recent))
                                    }
                                }
                                await songService.update(songId, this.streams)
                                break
                            }
                        }
                    }
                } else {
                    if (this.playing != []) {
                        for (const song in this.playing) {
                            if (this.playing[song]._id === songId) {
                                this.currentSong = parseInt(song)
                                this.isPlaying = true
                                this.streams.stream = this.playing[song].stream + 1
                                if (Object.keys(this.recent).length < 10) {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.push(songId)
                                        localStorage.setItem("recent", JSON.stringify(this.recent))
                                    }
                                } else {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.splice(0, 1)
                                        this.recent.push(songId)
                                        localStorage.setItem("recent", JSON.stringify(this.recent))
                                    }
                                }
                                await songService.update(songId, this.streams)
                                break
                            }
                        }
                    }
                }
                
            } catch (error) {
                // console.log("Something Went Wrong");
                // console.log(error.response);
            }
        },
        async createSong(song) {
            try {
                let response = await songService.create(song)
                if (response.success) {
                    await this.loadSongs()
                    return response.song
                }
            } catch (error) {
                // console.log(error);
                return false
            }
        },
        async deleteSong(songId) {
            try {
                let response = await songService.deleteOne(songId)
                if (response.success) {
                    this.loadSongs()
                    return true
                } else {
                    return false
                }
            } catch (error) {
                // console.log(error);
                return false
            }
        },
        async setSongStream(songId) {
            try {
                if (localStorage.getItem("recent")) {
                    this.recent = JSON.parse(localStorage.getItem("recent"))
                    if (this.songs != []) {
                        for (const song in this.songs) {
                            if (this.songs[song]._id === songId) {
                                this.streams.stream = this.songs[song].stream + 1
                                if (Object.keys(this.recent).length < 10) {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.push(songId)
                                        localStorage.setItem("recent", JSON.stringify(this.recent))
                                    }
                                } else {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.splice(0, 1)
                                        this.recent.push(songId)
                                        localStorage.setItem("recent", JSON.stringify(this.recent))
                                    }
                                }
                                await songService.update(songId, this.streams)
                                break
                            }
                        }
                    }
                } else {
                    if (this.songs != []) {
                        for (const song in this.songs) {
                            if (this.songs[song]._id === songId) {
                                this.streams.stream = this.songs[song].stream + 1
                                if (Object.keys(this.recent).length < 10) {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.push(songId)
                                    }
                                } else {
                                    if (!this.recent.includes(songId)) {
                                        this.recent.splice(0, 1)
                                        this.recent.push(songId)
                                    }
                                }
                                await songService.update(songId, this.streams)
                                break
                            }
                        }
                    }
                }
            } catch (error) {
                // console.log("Something Went Wrong");
                // console.log(error.response);
            }
        },
        setPlayingSongs(songList, songListID){
            if(this.songListId.toString() === songListID.toString()){
                console.log("Existed");
            } else {
                var playing = []
                this.songListId = songListID

                songList.forEach((songId) => {
                    var res = this.songs.find(song => {
                        return song._id == songId
                    }) 
                    playing.push(res)
                })
                this.playing = [...playing]
                console.log("New");
            }
        }
        ,
        getRecent(){
            if (localStorage.getItem("recent")) {
                this.recent = JSON.parse(localStorage.getItem("recent"))
                this.setCurrentSong(this.recent[0]);
            }
        }
    },
});

