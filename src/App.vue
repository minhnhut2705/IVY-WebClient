<template>
  <!-- <PageLoader></PageLoader> -->
  <router-view></router-view>
</template>

<script>
import PageLoader from "./components/compLoader.vue"
// import { useUserStore } from './stores/userStore'

export default {
  name: 'App',
  components: {
    PageLoader
  },
  setup() {
    // const userStore = useUserStore()
    // return { userStore }
  },
  created() {

  },
  mounted() {
    // window.addEventListener('beforeunload', (event) => {
    //   event.preventDefault()
    //   event.returnValue("adas")
    // });
  },
  methods: {
  }
}
</script>

<style></style>
