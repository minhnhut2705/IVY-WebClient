import { defineStore } from 'pinia'
import PlaylistService from "../services/playlist.service";

export const usePlaylistStore = defineStore('playlist', {
    state: () => ({
        playlists: [],
    }),
    actions: {
        async loadPlaylists() {
            try {
                let response = await PlaylistService.getAll()
                if (response.success) {
                    this.playlists = []
                    response.playlists.forEach(element => {
                        this.playlists.push(element)
                    });
                }
            } catch (err) {
                // console.log("Something Went Wrong");
                // console.log(err.response);
            }
        },
        async addSongToPlaylist(songId, playlistId) {
            try {
                for (const index in this.playlists) {
                    if (this.playlists[index]._id === playlistId) {
                        if (!this.playlists[index].songs.includes(songId)) {
                            this.playlists[index].songs.push(songId)
                            let responseUpdate = await PlaylistService.update(playlistId, this.playlists[index])
                            if (responseUpdate.success) {
                                this.playlists[index] = responseUpdate.playlist
                                // console.log(this.playlists[index].songs);
                                return 1
                            }
                        } else {
                            let songIndex = this.playlists[index].songs.indexOf(songId)
                            if (songIndex > -1) {
                                return 2
                            }
                        }
                    }
                }

            } catch (error) {
                // console.log(error);
                return 0
            }
        },
        async createAndAddSongToPlaylist(playlist) {
            try {
                let responseCreate = await PlaylistService.create(playlist)
                if (responseCreate.success) {
                    this.loadPlaylists()
                    // console.log(responseCreate.playlist);
                    return responseCreate.playlist
                }
            } catch (error) {
                // console.log(error);
                return false
            }
        },
        async deletePlaylist(playlistId) {
            try {
                let responseDeleted = await PlaylistService.deleteOne(playlistId)
                if (responseDeleted.success) {
                    this.loadPlaylists()
                    // console.log(responseDeleted.playlist);
                    return true
                }
            } catch (error) {
                // console.log(error);
                return false
            }
        },
        async removeSongFromPlaylist(playlistId, songId) {
            try {
                for (const index in this.playlists) {
                    if (this.playlists[index]._id === playlistId) {
                        let songIndex = this.playlists[index].songs.indexOf(songId)
                        if (songIndex > -1) {
                            this.playlists[index].songs.splice(songIndex, 1)
                            let responseUpdate = await PlaylistService.update(playlistId, this.playlists[index])
                            if (responseUpdate.success) {
                                this.playlists[index] = responseUpdate.playlist
                                // console.log("song was removed from playlist", this.playlists[index].songs);
                                return true
                            } else {
                                // console.log("cant delete song from playlist");
                                return false
                            }
                        }
                    }
                }
            } catch (error) {
                // console.log(error);
                return false
            }
        },
    },
});

