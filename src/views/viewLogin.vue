<template>
  <div
    class="login position-relative row d-flex justify-content-center bg-light-ocean-gradient container-fluid mx-0 px-0 vh-100">
    <div class="col-lg-5 col-sm-10 my-auto">
      <form action="" @submit.prevent="login" class="text-center">
        <h2 class="mb-5 mt-3 fw-bold">
          Log In
        </h2>
        <input type="text" id="email" class="form-control mb-5 bg-transparent logInInput" placeholder="Email"
          v-model="loginDetail.email" />
        <input type="password" id="password" class="form-control mb-4 bg-transparent logInInput" placeholder="Password"
          v-model="loginDetail.password" />
        <p class="my-0">
          Don't have an account ? <router-link to="/register" class="heart fw-bold"> Register</router-link>
        </p>
        <p class="my-0">
          OR
        </p>
        <p class="my-0">
          Login with
        </p>
        <p class="my-0">
          <button class="fw-bold btn btn-block m-3 text-gray bg-transparent logInButton border-light-ocean" type="button"
            @click="logInWithGooglePopup()" style="background-color: #204244; width: 15%;">
            <img src="../assets/Logo/GoogleLogo.png" class="" style="width: 32px; height: 32px;" alt="">
          </button>
          <button class="fw-bold btn btn-block m-3 text-gray bg-transparent logInButton border-light-ocean" type="button"
            @click="logInWithFacebookPopup()" style="background-color: #204244; width: 15%;">
            <img src="../assets/Logo/FacebookLogo.png" class="" style="width: 32px; height: 32px;" alt="">
          </button>
        </p>
        <button class="fw-bold btn btn-block w-75 my-3 text-gray logInButton bg-transparent border-light-ocean"
          type="submit" style="background-color: #204244;">
          Log In
        </button>
      </form>
    </div>
    <span class="position-absolute top-0 fs-4 my-3 px-3">
      <router-link to="/">
        <span class="text-white hoverPointerWhite">
          <font-awesome-icon icon="fa-solid fa-house-chimney" class="hoverPointerWhite" />
        </span>
      </router-link>
    </span>
  </div>
</template>
<script>
import { useUserStore } from '../stores/userStore'
import { useArtistStore } from "../stores/artistStore"
import { auth, signInWithPopup, googleProvider, facebookProvider } from "../config/firebase.config"

export default {
  setup() {
    const userStore = useUserStore();
    const artistStore = useArtistStore();
    return { userStore, artistStore };
  },
  data() {
    return {
      loginDetail: {
        email: "",
        password: ""
      },
      logInStatus: '',
    };
  },
  methods: {
    async login() {
      const result = await this.userStore.login(this.loginDetail)
      if (result != 'logged') {
        this.logInStatus = result
        this.$toast.error("Login failed. Please try again!");
      } else {
        this.$toast.success("Welcome back");
      }
    },
    async logInWithGooglePopup() {
      let res = await signInWithPopup(auth, googleProvider)
      let user = res.user;

      let existEmail = await this.userStore.checkExistEmail({ email: user.email })
      if (existEmail) {
        const result = await this.userStore.login({ email: user.email, password: user.uid })
        if (result != 'logged') {
          this.logInStatus = result
          this.$toast.error("Login failed. This email is already registered with us!");
        } else {
          this.$toast.success("Welcome back");
        }
      } else {
        let artistPost = {
          name: user.displayName
        }
        let artist = await this.artistStore.createArtist(artistPost)
        if (artist) {
          let registered = await this.userStore.register(
            {
              userName: user.displayName,
              email: user.email,
              password: user.uid,
              passwordConfirm: user.uid,
              DoB: user.metadata.creationTime,
              country: "Việt Nam",
              role: "partner",
              artistId: artist._id
            }
          )
          if (registered == "registered") {
            this.$toast.success("Welcome to IVY");
            // this.songStore.isPlaying = false;
          } else {
            this.artistStore.deleteArtist(artist._id);
            this.$toast.error(registered);
          }
        } else {
          this.$toast.error("Can't register with your infomation, refresh page and try again");
        }
      }
      console.log(user);

    },
    async logInWithFacebookPopup() {
      let res = await signInWithPopup(auth, facebookProvider)
      let user = res.user;

      let existEmail = await this.userStore.checkExistEmail({ email: user.email })
      if (existEmail) {
        const result = await this.userStore.login({ email: user.email, password: user.uid })
        if (result != 'logged') {
          this.logInStatus = result
          this.$toast.error("Login failed. This email is already registered with us!");
        } else {
          this.$toast.success("Welcome back");
        }
      } else {
        let artistPost = {
          name: user.displayName
        }
        let artist = await this.artistStore.createArtist(artistPost)
        if (artist) {
          let registered = await this.userStore.register(
            {
              userName: user.displayName,
              email: user.email,
              password: user.uid,
              passwordConfirm: user.uid,
              DoB: user.metadata.creationTime,
              country: "Việt Nam",
              role: "partner",
              artistId: artist._id
            }
          )
          if (registered == "registered") {
            this.$toast.success("Welcome to IVY");
            // this.songStore.isPlaying = false;
          } else {
            this.artistStore.deleteArtist(artist._id);
            this.$toast.error(registered);
          }
        } else {
          this.$toast.error("Can't register with your infomation, refresh page and try again");
        }
      }
      console.log(user);

    }
  },
  computed: {

  },
  updated() {

  }
};
</script>
<style>
.login::before {
  content: "";
  background-image: url("https://firebasestorage.googleapis.com/v0/b/athena-4d002.appspot.com/o/img%2Fbackground%2Frecord-player-1851576.jpg?alt=media&token=cbe3603f-609f-4e2f-ba09-f08f56097827");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-position: 60% 60%;
  opacity: 0.3;
}

.logInButton:hover {
  color: white;
  background-color: #015D7D !important;
  border: 2px solid #FD841F !important;
  box-shadow: none !important;
}


.logInInput,
.logInInput:valid,
.logInInput:invalid {
  box-shadow: none !important;
}

.logInInput {
  box-shadow: none !important;
  color: #D3D3D3;
}

.logInInput:placeholder-shown {
  color: #D3D3D3;
}

.logInInput:focus {
  outline: none;
  color: white;
}

.logInInput:placeholder-shown {
  color: #D3D3D3;
}
</style>