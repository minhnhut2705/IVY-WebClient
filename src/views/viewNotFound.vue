<template>
    <div class="row container-fluid bg-light-ocean-gradient h-100 w-100 mx-0 px-0">
        <div class="h-100 w-100 m-6 col-12 " style="font-size: 10rem; ">
            <div class="h-100 w-100 row d-flex flex-row justify-content-center align-items-center align-content-center">
                <div class="opacity-25 col-4" style="transform: rotate(10deg);">
                    <span >
                        404
                    </span>
                </div>
                <div class="col-6 text-white">
                    <span style="font-size: 6rem;">Oops !</span>
                    <h2>
                        The page you're looking for isn't here !!!
                    </h2>
                    <router-link to="/">
                        <h4 class="text-white py-3">
                            <span class="heart">
                                Go to home 
                                <font-awesome-icon icon="fa-solid fa-arrow-right" />
                            </span>
                        </h4>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    setup() {
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {

    },
    updated() {

    }
};
</script>
<style>

</style>