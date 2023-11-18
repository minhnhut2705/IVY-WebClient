<template>
    <div class="row">
        <h1 class="col-12 p-4 text-center fw-bold">
            All artists we have
        </h1>
        <div class="col-12 pt-4">
            <div class="row mx-1 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
                <template v-for="artist in artistStore.artists" :key="artist">
                    <span v-if="artist" class="col">
                        <span
                            class="col p-3 mb-4 rounded d-flex flex-column bg-light-ocean-gradient-to-bottom border-bottom">
                            <router-link :to="{
                                name: 'artist',
                                params: { id: artist._id }
                            }">
                                <span class="artistsItem hoverPointerWhite">
                                    <img class="rounded w-100 artistsItemThumbnail" :src="artist.avatar" alt=""
                                        style="aspect-ratio: 1/1;">
                                </span>
                            </router-link>
                            <router-link :to="{
                                name: 'artist',
                                params: { id: artist._id }
                            }">
                                <span class="pt-3 mb-2 text-white w-100 ellipsisContent">
                                    <span class=" underlineHoverEffect hoverPointerWhite fw-semi-bold fs-6">
                                        {{ artist.name }}
                                    </span>
                                </span>
                            </router-link>
                            <span class="fs-6 text-gray">
                                <span class="ellipsisContent">
                                    {{ new Date(artist.createdAt).getDate() + " " + new
        Date(artist.createdAt).toLocaleString('default', { month: 'long' }) + " " + new
            Date(artist.createdAt).getFullYear()
                                    }}
                                </span>
                            </span>
                        </span>
                    </span>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { useArtistStore } from '../stores/artistStore'

export default {
    setup() {
        const artistStore = useArtistStore()
        return { artistStore }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {

    }
}
</script>
<style scoped>

.artistsItem:hover .artistsItemThumbnail {
    opacity: 0.6;
}

</style>