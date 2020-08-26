<template>
    <div class="container mt-3">
        <div class="col-md-8">
            <div class="d-flex justify-content-center mb-3">
                <b-spinner label="Loading..." v-if="show"></b-spinner>
            </div> 
            <h1 class="mt-4">{{articulo.title}}</h1>
            <!-- Author -->
            <p class="lead">by {{articulo.userId}}</p>
            <hr>
            <p>{{articulo.body}}</p>
            <nuxt-link to="/articulos" class="btn btn-outline-primary">Atras</nuxt-link>
        </div>
        <div class="col-md-4">

        </div>
        <!--<h1>Artículo número: {{$route.params.id}}</h1>-->
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return {
                show: true,
                articulo: []
            }
        },
        async created(){
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`);
                this.show = false
                console.log(res.data);
                this.articulo = res.data

            } catch (error) {
                
            }
        }
    }
</script>

<style scoped>

</style>