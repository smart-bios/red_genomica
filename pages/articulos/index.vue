<template>
  <div class="container mt-3">
    <!-- Page Heading/Breadcrumbs -->
    <h2>Articles</h2>
    <hr>
    <b-alert show>En desarrollo...</b-alert>
    <div class="row">
      <div class="col-md-8">
            <div class="d-flex justify-content-center mb-3">
              <b-spinner label="Loading..." v-if="show"></b-spinner>
            </div>  
        <div v-for="articulo in articulos" :key="articulo.key">
          <div class="card mb-4">
            <!--<img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">-->
            <div class="card-body">
              <h3 class="card-title">{{articulo.title}}</h3>
              <p class="card-text">{{articulo.body}}</p>
              <nuxt-link :to="`/articulos/${articulo.id}`" class="btn btn-primary">Read More</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mt-3 mb-4">
          <h5 class="card-header">Search</h5>
          <div class="card-body">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for..." />
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                show: true,
                articulos: []
            }
        },
        async created(){
            try {
                await this.$axios.get("https://jsonplaceholder.typicode.com/posts?_limit=20")
                .then(res => {
                  this.show = false
                  this.articulos = res.data
                  //console.log(res.data)
                })
                .catch(error => {
                  //console.log("Error axios",error)
                })
                
            } catch (error) {
                //console.log("Error trt",error)
            }
        }
    }
</script>

<style scoped>

</style>