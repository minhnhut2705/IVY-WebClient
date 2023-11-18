<template>
  <div
    class="register position-relative row d-flex justify-content-center bg-light-ocean-gradient container-fluid mx-0 px-0 vh-100">
    <div class="col-lg-5 col-sm-10 ">
      <form id="registerForm" ref="registerForm" @submit.prevent="register" class="text-center row">
        <h2 class="mb-4 mt-3 col-12 fw-bold">
          Register
        </h2>
        <div class="mb-5 pb-1 position-relative col-12">
          <input name="name" type="text" id="name" class="form-control bg-transparent registerInput"
            placeholder="Your full name" v-model="registerDetail.userName" required />
          <span class="mt-1 position-absolute ms-2" style="left: 0;" v-if="msg.name">
            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
            {{ msg.name }}
          </span>
        </div>
        <div class="mb-5 pb-1 position-relative col-12">
          <input name="email" type="email" id="email" class="form-control bg-transparent registerInput"
            placeholder="Your email" v-model="registerDetail.email" required />
          <span class="mt-1 position-absolute ms-2" style="left: 0;" v-if="msg.email">
            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
            {{ msg.email }}
          </span>
        </div>
        <div class="mb-5 pb-1 position-relative col-6">
          <div class="d-flex border row form-control mx-0 bg-transparent" style="border-radius: 5px; ">
            <input name="password" type="password" id="password" ref="password"
              class="border-none bg-transparent registerInput col-12" placeholder="Your password"
              v-model="registerDetail.password" required />
          </div>
          <span class="my-1 position-absolute ms-2" style="left: 0;" v-if="msg.password">
            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
            {{ msg.password }}
          </span>
        </div>
        <div class="mb-5 pb-1 position-relative col-6">
          <input name="passwordConfirm" type="password" id="passwordConfirm" ref="passwordConfirm"
            class="form-control bg-transparent registerInput" placeholder="Confirm your password"
            v-model="registerDetail.passwordConfirm" required />
          <span class="mt-1 position-absolute ms-2" style="left: 0;" v-if="msg.passwordConfirm">
            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
            {{ msg.passwordConfirm }}
          </span>
        </div>
        <div class="mb-3 pb-1 position-relative col-6">
          <select name="country" id="country" class="form-control bg-transparent registerInput text-gray"
            v-model="registerDetail.country">
            <option value="" class="bg-light-ocean text-white">Choose your country</option>
            <template v-for="country in country_list" :key="country">
              <option class="bg-light-ocean text-white" :value="country">{{ country }}</option>
            </template>
          </select>
          <span class="mt-1 position-absolute ms-2" style="left: 0;" v-if="msg.country">
            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
            {{ msg.country }}
          </span>
        </div>
        <div class="mb-2 pb-1 position-relative col-6" v-tooltip="'Your birthday'">
          <input name="DoB" type="date" id="DoB" class="form-control bg-transparent registerInput text-gray"
            v-model="registerDetail.DoB" max="2004-01-01" />
          <span class="mt-1 position-absolute ms-2" style="left: 0;" v-if="msg.DoB">
            <font-awesome-icon class="px-1" icon="fa-solid fa-triangle-exclamation" style="color: yellow;" />
            {{ msg.DoB }}
          </span>
        </div>

        <p>
          <input type="checkbox" @click="check" ref="checkAgree">
          I agree with
          <router-link to="/termsandconditions" class="heart fw-bold">
            terms and conditions
          </router-link>
        </p>
        <p>
          Already have an account ? <router-link to="/login" class="heart fw-bold">Log In</router-link> OR
          <button class="fw-bold btn btn-block mx-2 text-gray bg-transparent logInButton border-light-ocean" type="button"
            @click="logInWithGooglePopup()" style="background-color: #204244; width: 15%;">
            <img src="../assets/Logo/GoogleLogo.png" class="" style="width: 32px; height: 32px;" alt="">
          </button>
          <button class="fw-bold btn btn-block mx-2 text-gray bg-transparent logInButton border-light-ocean" type="button"
            @click="logInWithFacebookPopup()" style="background-color: #204244; width: 15%;">
            <img src="../assets/Logo/FacebookLogo.png" class="" style="width: 32px; height: 32px;" alt="">
          </button>
          <button class="fw-bold btn btn-block w-75 mt-5 text-gray registerButton bg-transparent border-light-ocean"
            ref="registerButton" type="submit" style="background-color: #204244;">
            Register
          </button>
        </p>
        <!-- <p class="opacity-75 fs-8 heart fw-bold">
          <font-awesome-icon icon="fa-solid fa-copyright" /> IVY 2023 | All Rights Reversed
        </p> -->
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
import { useUserStore } from "../stores/userStore";
import { useSongStore } from "../stores/songStore";
import { useArtistStore } from "../stores/artistStore";
import { useGenreStore } from "../stores/genreStore";
import { usePlaylistStore } from "../stores/playlistStore";

import { auth, signInWithPopup, googleProvider, facebookProvider } from "../config/firebase.config";

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
    'registerDetail.userName': function () {
      this.validateUsername()
    },
    'registerDetail.email': function () {
      this.validateEmail()
    },
    'registerDetail.password': function () {
      this.validatePassword()
    },
    'registerDetail.passwordConfirm': function () {
      this.validateConfirmPassword()
    },
    'registerDetail.country': function () {
      this.validateCountry()
    },
    'registerDetail.DoB': function () {
      this.validateDoB()
    }
  },
  data() {
    return {
      registerDetail: {
        userName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        DoB: null,
        country: '',
        artistId: ''
      },
      country_list: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
      msg: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        DoB: '',
        country: ''
      },
      validatedName: false,
      validatedEmail: false,
      validatedPassword: false,
      validatedPasswordConfirm: false,
      validatedCountry: false,
      validatedDoB: false,
      agreeChecked: false,
      validated: false
    };
  },
  methods: {
    async register() {
      if (this.validatedName && this.validatedEmail && this.validatedPassword && this.validatedPasswordConfirm && this.validatedCountry && this.validatedDoB && this.agreeChecked) {
        // console.log(this.validated);
        let artistPost = {
          name: this.registerDetail.userName,
        }
        let artist = await this.artistStore.createArtist(artistPost)
        if (artist) {
          this.registerDetail.artistId = artist._id
          let registered = await this.userStore.register(this.registerDetail)
          if (registered == "registered") {
            this.$toast.success("Welcome to IVY");
            this.songStore.isPlaying = false;
          } else {
            this.artistStore.deleteArtist(artist._id);
            this.$toast.error(registered);
          }
        } else {
          this.$toast.error("Can't register with your infomation, refresh page and try again");
        }
      } else {
        this.$toast.error("Can't register with your infomation, refresh page and try again");
      }
    },
    validateUsername() {
      if (this.registerDetail.userName == "") {
        this.msg.name = "Please enter your full name";
        this.validatedName = false
      } else {
        this.msg.name = ""
        this.validatedName = true
      }
    },
    validateEmail() {
      const RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (this.registerDetail.email == "") {
        this.msg.email = "Please enter email";
        this.validatedEmail = false
      } else if (this.registerDetail.email.match(RegExp)) {
        this.msg.email = ""
        this.validatedEmail = true
      } else {
        this.msg.email = "Please enter valid email"
        this.validatedEmail = false
      }
    },
    validatePassword() {
      const RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      if (this.registerDetail.password == "") {
        this.msg.password = "Please enter password";
        this.validatedPassword = false
      } else if (this.registerDetail.password.match(RegExp)) {
        this.msg.password = ""
        this.validatedPassword = true
      } else if (this.registerDetail.password.length < 8) {
        this.msg.password = "Minimum eight characters";
        this.validatedPassword = false
      } else {
        this.msg.password = "At least one letter, one number and one special character";
        this.validatedPassword = false
      }
    },
    validateConfirmPassword() {
      if (!this.registerDetail.passwordConfirm) {
        this.msg.passwordConfirm = 'Please enter the password again'
        this.validatedPasswordConfirm = false
      } else if (this.registerDetail.password !== this.registerDetail.passwordConfirm) {
        this.msg.passwordConfirm = 'Password does not match'
        this.validatedPasswordConfirm = false
      } else {
        this.msg.passwordConfirm = ""
        this.validatedPasswordConfirm = true
      }
    },
    validateCountry() {
      if (!this.registerDetail.country) {
        this.msg.country = 'Please choose country'
        this.validatedCountry = false
      } else {
        this.msg.country = ""
        this.validatedCountry = true
      }
    },
    validateDoB() {
      if (!this.registerDetail.DoB) {
        this.msg.DoB = 'Please choose your birthday'
        this.validatedDoB = false
      } else {
        this.msg.DoB = ""
        this.validatedDoB = true
      }
    },
    check() {
      this.agreeChecked = this.$refs.checkAgree.checked
      console.log(this.agreeChecked);
    },
    async logInWithGooglePopup() {
      let res = await signInWithPopup(auth, googleProvider)
      let user = res.user
      let existEmail = await this.userStore.checkExistEmail({ email: user.email })
      if (existEmail) {
        const result = await this.userStore.login({ email: user.email, password: user.uid })
        if (result != 'logged') {
          this.logInStatus = result
          this.$toast.error("Login failed. This email is already registered with us!")
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
          } else {
            this.artistStore.deleteArtist(artist._id);
            this.$toast.error(registered);
          }
        } else {
          this.$toast.error("Can't register with your infomation, refresh page and try again");
        }
      }
    },
    async logInWithFacebookPopup() {
      let res = await signInWithPopup(auth, facebookProvider)
      let user = res.user;

      let existEmail = await this.userStore.checkExistEmail({ email: user.email })
      if (existEmail) {
        const result = await this.userStore.login({ email: user.email, password: user.uid })
        if (result != "logged") {
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
          } else {
            this.artistStore.deleteArtist(artist._id);
            this.$toast.error(registered);
          }
        } else {
          this.$toast.error("Can't register with your infomation, refresh page and try again");
        }
      }
      // console.log(user);
    }
  },
  computed: {
  },
  created() {
  },
  updated() {
  }
};
</script>
<style scoped>
.register::before {
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

.registerButton:hover {
  color: white;
  background-color: #0F3343 !important;
  border: 2px solid #FD841F !important;
  box-shadow: none !important;
}

.registerInput {
  border-radius: 5px !important;
}

.registerInput,
.registerInput:valid,
.registerInput:invalid {
  box-shadow: none !important;
}

.registerInput {
  box-shadow: none !important;
  color: #D3D3D3;
}

.registerInput:placeholder-shown {
  color: #D3D3D3;
}

.registerInput:focus {
  outline: none;
  color: white;
}

.registerInput:placeholder-shown {
  color: #D3D3D3;
}

select {
  color: #D3D3D3;
  opacity: 0.7;
}

select:valid {
  color: white;
  opacity: 1;
}

select option {
  color: black;
}

::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>