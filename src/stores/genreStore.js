import { defineStore } from 'pinia'
import GenreService from "../services/genre.service";
// import SongService from "../services/song.service";
// import ArtistService from "../services/artist.service";

export const useGenreStore = defineStore('genres', {
    state: () => ({
        genres: [],
        singleGenre: [],
        sameSongs: []
    }),
    getters: {
        getGenres: (state) => state.genres,
    },
    actions: {
        async loadGenres() {
            try {
                let response = await GenreService.getAll()
                if (response.success) {
                    this.genres = []
                    response.genres.forEach(element => {
                        this.genres.push(element)
                    });
                }
            } catch (err) {
                // console.log("Something Went Wrong");
                console.log(err);
            }
        },
        // async loadSingleGenre() {
        //     try {
        //         const genres = await GenreService.getAll()
        //         const songs = await SongService.getAll()
        //         const artists = await ArtistService.getAll()
        //         if (genres.success && artists.success && songs.success) {
        //             this.singleGenre = []
        //             for (let genre in genres.genres) {
        //                 for (let songId in genres.genres[genre].songs) {
        //                     for (let song in songs.songs) {
        //                         for (let artist in artists.artists) {
        //                             if (genres.genres[genre].songs[songId] === songs.songs[song]._id) {
        //                                 if (songs.songs[song].artist[0] === artists.artists[artist]._id) {
        //                                     this.singleGenre.push({
        //                                         songThumbnail: songs.songs[song].thumbnail,
        //                                         songName: songs.songs[song].name,
        //                                         songId: songs.songs[song]._id,
        //                                         songArtist: artists.artists[artist].name,
        //                                         songArtistId: artists.artists[artist]._id,
        //                                         genreName: genres.genres[genre].name,
        //                                         genreId: genres.genres[genre]._id
        //                                     })
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //         console.log(this.singleGenre);
        //     } catch (err) {
        //         // console.log("Something Went Wrong");
        //         // console.log(err.response);
        //     }
        // },
        async addSongToGenres(songId, genreId) {
            try {
                for (const index in this.genres) {
                    if (this.genres[index]._id === genreId) {
                        if (!this.genres[index].songs.includes(songId)) {
                            this.genres[index].songs.push(songId)
                            let responseUpdate = await GenreService.update(genreId, this.genres[index])
                            if (responseUpdate.success) {
                                this.genres[index] = responseUpdate.genre
                                // console.log("song add to genre", this.genres[index].songs);
                                return true
                            }
                        } else {
                            let songIndex = this.genres[index].songs.indexOf(songId)
                            if (songIndex > -1) {
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
        async removeSongFromGenres(genreId, songId) {
            try {
                for (const index in this.genres) {
                    if (this.genres[index]._id === genreId) {
                        let songIndex = this.genres[index].songs.indexOf(songId)
                        if (songIndex > -1) {
                            this.genres[index].songs.splice(songIndex, 1)
                            let responseUpdate = await GenreService.update(genreId, this.genres[index])
                            if (responseUpdate.success) {
                                this.genres[index] = responseUpdate.genre
                                // console.log("song was remove from genre");
                                return true
                            }
                        } else {
                            // console.log("Can't remove song from genre");
                            return false

                        }
                    }
                }

            } catch (error) {
                // console.log(error);
                return false
            }
        },
        async deleteGenre(genreId) {
            try {
                let response = await GenreService.deleteOne(genreId)
                if (response.success) {
                    this.loadGenres()
                    return true
                } else {
                    return false
                }
            } catch (error) {
                // console.log(error);
                return false
            }
        },
        getSameSongs(songId) {
            this.sameSongs = []
            this.genres.forEach((genre) => {
                genre.songs.forEach((songGenre) => {
                    if (songId === songGenre && Object.keys(genre.songs).length <= 5) {
                        genre.songs.forEach((song) => {
                            if (!this.sameSongs.includes(song)) {
                                this.sameSongs.push(song)
                            }
                        })
                    }else if(songId === songGenre){
                        for (let index = 0; index < 6; index++) {
                            if (!this.sameSongs.includes(genre.songs[index])) {
                                this.sameSongs.push(genre.songs[index])
                            }
                        }
                    }
                })

            })
            // console.log(this.sameSongs);
        },
    },
});

