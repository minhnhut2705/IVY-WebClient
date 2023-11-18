import { defineStore } from 'pinia'
import userService from '../services/user.service'
import router from '../router/index'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        users: null,
        token: null,
        isAuthorized: false
    }),
    actions: {
        async fetchUser(token) {
            let response = await userService.getUserData(token)
            if (response) {
                this.user = response.data.user;
            } else {
                console.log("Something Went Wrong");
            }
        },
        async loadUsers() {
            let response = await userService.getAll()
            if (response) {
                this.users = response.data.users;
            } else {
                console.log("Something Went Wrong");
            }
        },
        async register(user) {
            let response = await userService.register(user)
            if (response.data.success) {
                let token = response.data.token;
                this.token = token
                router.push("/")
                localStorage.setItem("jwt", token);
                // console.log("Registration Was successful");
                return "registered"
            } else {
                // console.log(response.data.error);
                return response.data.error
            }
        },
        async login(user) {
            try {
                let response = await userService.login(user)
                let token = response.data.token
                if (response.data.success) {
                    this.token = response.data.token
                    localStorage.setItem("jwt", token)
                    router.push("/")
                    // console.log(response.data.token);
                    return 'logged'
                } else {
                    console.log(response.data.error);
                }
            } catch (error) {
                // console.log(response.data.error);
                return 'Login failed! Your email or password is incorrect!'
            }
        },
        async confirmPass(user) {
            try {
                let response = await userService.fakeLogin(user)
                console.log(response.data.msg, response.data.success);
                return response.data.success
            } catch (error) {
                return false
            }
        },
        updateFavorites(userId, songId) {
            try {
                let fav = [...this.user.favorites]
                if (!fav.includes(songId)) {
                    fav.push(songId)
                    let favorites = {favorites: fav}
                    this.user.favorites = [...fav]
                    userService.updateFavorites(userId, favorites)
                    return 1
                } else {
                    let songIndex = fav.indexOf(songId)
                    if (songIndex > -1) {
                        fav.splice(songIndex, 1)
                        let favorites = {favorites: fav}
                        this.user.favorites = [...fav]
                        userService.updateFavorites(userId, favorites)
                        return 2
                    }
                }
            } catch (error) {
                console.log(error);
                return 0
            }
        },
        async updateUserPlaylists(userId, playlistId) {
            try {
                let Plls = [...this.user.playlists]
                if (!Plls.includes(playlistId)) {
                    Plls.push(playlistId)
                    let playlists = {playlists: Plls}
                    this.user.playlists = [...Plls]
                    let responseUpdated = await userService.updatePlaylists(userId, playlists)
                    if (responseUpdated.data.success) {
                        this.user = await responseUpdated.data.user
                        console.log("playlists updated ", Plls);
                        return true
                    }
                } else {
                    let playlistIndex = Plls.indexOf(playlistId)
                    if (playlistIndex > -1) {
                        Plls.splice(playlistIndex, 1)
                        let playlists = {playlists: Plls}
                        this.user.playlists = [...Plls]
                        let responseUpdated = await userService.updatePlaylists(userId, playlists)
                        if (responseUpdated.data.success) {
                            this.user = responseUpdated.data.user
                            console.log("playlists updated ", Plls);
                            return true
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async updateUserInfo(userId, user) {
            try {
                let responseUpdate = await userService.updateUserInfo(userId, user)
                if (responseUpdate.data.success) {
                    this.user = responseUpdate.data.user
                    console.log(this.user);
                    return true
                } else {
                    return false
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async updateUserInfoPassword(userId, user) {
            try {
                let responseUpdate = await userService.updateUserInfoPassword(userId, user)
                if (responseUpdate.data.success) {
                    this.user = responseUpdate.data.user
                    console.log(this.user);
                    return true
                } else {
                    return false
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async deleteUserPlaylist(userId, playlistId) {
            try {
                if (!this.user.playlists.includes(playlistId)) {
                    console.log("Cant find pll index");
                    return false
                } else {
                    let Plls = [...this.user.playlists]
                    let playlistIndex = Plls.indexOf(playlistId)
                    if (playlistIndex > -1) {
                        Plls.splice(playlistIndex, 1)
                        let playlists = {playlists: Plls}
                        this.user.playlists = [...Plls]
                        let responseDeleted = await userService.updatePlaylists(userId, playlists)
                        if (responseDeleted.data.success) {
                            this.user = responseDeleted.data.user
                            console.log("User playlist updated ", Plls);
                            return true
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        
        async deleteUser(userId) {
            try {
                let responseDeleted = await userService.deleteOne(userId)
                if (responseDeleted.data.success) {
                    console.log("User was deleted ", this.users);
                    this.loadUsers()
                    return true
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async deleteUserPlaylistByAdmin(userId, playlistId) {
            try {
                for (const index in this.users) {
                    if (this.users[index]._id === userId) {
                        if (!this.users[index].playlists.includes(playlistId)) {
                            console.log("Cant find pll index");
                            return false
                        } else {
                            let Plls = [...this.users[index].playlists]
                            let playlistIndex = Plls.indexOf(playlistId)
                            if (playlistIndex > -1) {
                                Plls.splice(playlistIndex, 1)
                                let playlists = {playlists: Plls}
                                this.user.playlists = [...Plls]
                                let responseDeleted = await userService.updatePlaylists(userId, playlists)
                                if (responseDeleted.data.success) {
                                    this.users[index] = responseDeleted.data.user
                                    console.log("User playlist updated ", Plls);
                                    return true
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        signOut() {
            this.user = null
            this.token = null
            router.push('/home');
            this.isAuthorized = false
            localStorage.removeItem('jwt')
        },
        async addUserSongs(userId, songId) {
            try {
                let Songs = [...this.user.songs]
                if (!Songs.includes(songId)) {
                    Songs.push(songId)
                    let songAdd = {songs: Songs}
                    this.user.songs = [...Songs]
                    let responseUpdate = await userService.updateSongs(userId, songAdd)
                    if (responseUpdate.data.success) {
                        this.user = await responseUpdate.data.user
                        console.log("Song added to user songs", this.user.songs);
                        return true
                    }
                } else {
                    return false
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async deleteUserSongs(userId, songId) {
            try {
                if (!this.user.songs.includes(songId)) {
                    return false
                } else {
                    let Songs = [...this.user.songs]
                    let songIndex = Songs.indexOf(songId)
                    if (songIndex > -1) {
                        Songs.splice(songIndex, 1)
                        let songsUpdate = {songs: Songs}
                        this.user.songs = [...Songs]
                        let responseDeleted = await userService.updateSongs(userId, songsUpdate)
                        if (responseDeleted.data.success) {
                            this.user = responseDeleted.data.user
                            console.log("User songs deleted ", this.user);
                            return true
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async removeUserSongs(userId, songId) {
            try {
                if (!this.user.songs.includes(songId)) {
                    return false
                } else {
                    let Songs = [...this.user.songs]
                    let songIndex = Songs.indexOf(songId)
                    if (songIndex > -1) {
                        Songs.splice(songIndex, 1)
                        let songsUpdate = {songs: Songs}
                        this.user.songs = [...Songs]
                        let responseDeleted = await userService.updateSongs(userId, songsUpdate)
                        if (responseDeleted.data.success) {
                            this.user = responseDeleted.data.user
                            console.log("User songs deleted ", this.user);
                            return true
                        } else {
                            return false
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async removeUserSongsByAdmin(userId, songId) {
            try {
                for (const key in this.users) {
                    if (this.users[key]._id == userId) {
                        let Songs = [...this.users[key].songs]
                        let songIndex = Songs.indexOf(songId)
                        if (songIndex > -1) {
                            Songs.splice(songIndex, 1)
                            let songsUpdate = {songs: Songs}
                            this.users[key].songs = [...Songs]
                            let responseUpdate = await userService.updateSongs(userId, songsUpdate)
                            if (responseUpdate.data.success) {
                                this.users[key] = await responseUpdate.data.user
                                console.log("song was remove from user songs by admin", this.users[key].songs);
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async changeUserAvatar(userId, pathTo){
            let avatar = {avatar: pathTo}
            this.user.avatar = pathTo
            let responseUpdate = await userService.updateUserAvatar(userId, avatar)
            if (responseUpdate.data.success) {
                this.user = responseUpdate.data.user
                console.log("User avatar changed");
                return true
            } else {
                console.log("Cant upload avatar");
            }
        },
        async checkExistEmail(email){
            let response = await userService.checkExistEmail(email);
            return response.data.success
        }

    },
});
