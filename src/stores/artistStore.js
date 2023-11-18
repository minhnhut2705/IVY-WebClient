import { defineStore } from 'pinia'
import ArtistService from "../services/artist.service";

export const useArtistStore = defineStore('artists', {
    state: () => ({
        artists: [],
        currentArtistStream: 0
    }),
    actions: {
        async loadArtists() {
            try {
                let response = await ArtistService.getAll()
                if (response.success) {
                    this.artists = []
                    response.artists.forEach(element => {
                        this.artists.push(element)
                    });
                    this.BubbleSort(this.artists)
                }
            } catch (err) {
                // console.log("Something Went Wrong");
                console.log(err.response);
            }
        },
        BubbleSort(artists) {
            for (let i = 0; i < Object.keys(artists).length; i++) {
                for (let x = 0; x < Object.keys(artists).length - 1 - i; x++) {
                    if (Object.keys(artists[x].songs).length < Object.keys(artists[x + 1].songs).length) {
                        [artists[x], artists[x + 1]] = [artists[x + 1], artists[x]];
                    }
                }
            }
        },
        async deleteArtistSongs(songArt, songId) {
            try {
                let returnVal = false
                for (const songArtId in songArt) {
                    for (const artistIndex in this.artists) {
                        if (songArt[songArtId] === this.artists[artistIndex]._id) {
                            if (!this.artists[artistIndex].songs.includes(songId)) {
                                returnVal = false
                            } else {
                                let songIndex = this.artists[artistIndex].songs.indexOf(songId)
                                if (songIndex > -1) {
                                    this.artists[artistIndex].songs.splice(songIndex, 1)
                                    let responseDeleted = await ArtistService.update(songArt[songArtId], this.artists[artistIndex])
                                    if (responseDeleted.success) {
                                        this.artists[artistIndex] = responseDeleted.artist
                                        // console.log("Artist songs deleted ", this.artists[artistIndex].songs)
                                        returnVal = true
                                    }
                                }
                            }
                        }
                    }
                }
                await this.loadArtists()
                return returnVal
            } catch (error) {
                // console.log(error);
                return false
            }
        },
        async createArtist(artist) {
            try {
                let response = await ArtistService.create(artist)
                if (response.success) {
                    // console.log("artist created in artist store", response.artist);
                    return response.artist
                } else return false
            } catch (error) {
                // console.log(error)
                return false
            }
        },
        async addArtistSongs(artistId, songId) {
            for (const index in this.artists) {
                if (this.artists[index]._id === artistId) {
                    try {
                        if (!this.artists[index].songs.includes(songId)) {
                            this.artists[index].songs.push(songId)
                            let responseUpdate = await ArtistService.update(artistId, this.artists[index])
                            if (responseUpdate.success) {
                                this.artists[index] = responseUpdate.artist
                                // console.log("artist song added ", this.artists[index].songs);
                                return true
                            } else {
                                return false
                            }
                        } else {
                            return false
                        }
                    } catch (error) {
                        // console.log(error);
                        return false
                    }
                }
            }
        },
        async removeArtistSongs(artistId, songId) {
            for (const index in this.artists) {
                if (this.artists[index]._id === artistId) {
                    try {
                        let songIndex = this.artists[index].songs.indexOf(songId)
                        if (songIndex > -1) {
                            this.artists[index].songs.splice(songIndex, 1)
                            let responseUpdate = await ArtistService.update(artistId, this.artists[index])
                            if (responseUpdate.success) {
                                this.artists[index] = responseUpdate.artist
                                // console.log("artist song deleted", this.artists[index].songs);
                                return true
                            }
                        } else {
                            return false
                        }
                    } catch (error) {
                        // console.log(error);
                        return false
                    }
                }
            }
        },
        async updateArtistInfo(artistId, artist) {
            for (const index in this.artists) {
                if (this.artists[index]._id === artistId) {
                    try {
                        let responseUpdate = await ArtistService.update(artistId, artist)
                        if (responseUpdate.success) {
                            this.artists[index] = responseUpdate.artist
                            // console.log("Artist infor was updated", this.artists[index]);
                            return true
                        } else {
                            return false
                        }
                    } catch (error) {
                        // console.log(error);
                        return false
                    }
                }
            }
        },
        async deleteArtist(artistId) {
            try {
                let response = await ArtistService.deleteOne(artistId)
                if (response.success) {
                    await this.loadArtists()
                    // console.log(response);
                    return true
                } else {
                    return false
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async updateArtistAvatar(artistId, avtUrl) {
            var res = this.artists.find((artist) => {
                return artist._id === artistId
            })
            res.avatar = avtUrl
            await ArtistService.update(artistId, res)
            console.log(res);
        }
    },
});

