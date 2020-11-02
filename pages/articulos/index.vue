<template>
  <div class="container mt-3">
    <!-- Page Heading/Breadcrumbs -->
    <h2>Articulos de interes</h2>
    <hr>
    <b-alert show>En desarrollo...</b-alert>
    <div class="row">
      <div class="col-md-8">
            <div class="d-flex justify-content-center mb-3"> <b-spinner label="Loading..." v-if="show"></b-spinner></div>
            <div class="card mb-4">
              <img class="card-img-top" src="~/assets/img/FIC-30474707-0_1.png" alt="Card image cap">
              <div class="card-body">
                <h3 class="card-title"><b>Caracterización del agente causal del cáncer bacterial en cerezo</b></h3>
                <p class="card-text text-justify">El uso intensivo de formulaciones de cobre no solo favorece la aparición de bacterias resistentes, sino que dañan la microbiota del suelo. En la Región de O´Higgins, la población bacteriana asociada al Cáncer Bacterial presenta alta resistencia a cobre (Cu+2). Un nuevo método de identificación molecular desarrollado por INIA, permite detectar y discriminar las variantes genéticas de la bacteria causante del cáncer bacterial en cerezo</p>
                <a href="https://www.redagricola.com/cl/caracterizacion-del-agente-causal-del-cancer-bacterial-cerezo/" target="_blank" class="btn btn-primary">Read More</a>
              </div>
              <div class="card-footer text-muted">Noviembre 2019  by<a href="https://www.redagricola.com/cl/" target="__blank"> Redagricola</a></div>
            </div>

            <div class="card mb-4">
              <img class="card-img-top" src="~/assets/img/FIC-30474707-0_3.png" alt="Card image cap">
              <div class="card-body">
                <h3 class="card-title"><b>INIA Rayentué realiza un día de campo para conocer las estrategias de control de Cáncer Bacteriano en huertos de cerezos</b></h3>
                <p class="card-text text-justify">En esta actividad, enmarcada en el proyecto “Transferencia Control Cáncer Bacteriano en Huertos de Cerezos”, que ejecuta el mencionado Centro Regional, con el financiamiento del Fondo de Innovación para la Competitividad FIC – R 2016 y el gobierno Regional de O’Higgins, el foco estuvo puesto en dar a conocer los resultados preliminares que se han obtenido en los ensayos de investigación realizados durante este año, dando una idea inicial de la severidad con la que está actuando esta enfermedad en la Región y como optimizar las aplicaciones y/o métodos de control en sus campos.</p>
                <a href="https://www.redagricola.com/cl/inia-rayentue-realizo-dia-campo-control-cancer-bacteriano-huertos-cerezos/" target="_blank" class="btn btn-primary">Read More</a>
              </div>
              <div class="card-footer text-muted">Noviembre 2017  by<a href="https://www.redagricola.com/cl/" target="__blank"> Redagricola</a></div>
            </div>
        <!-- <div v-for="articulo in articulos" :key="articulo.key">
          <div class="card mb-4">
            <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
            <div class="card-body">
              <h3 class="card-title">{{articulo.title}}</h3>
              <p class="card-text">{{articulo.body}}</p>
              <nuxt-link :to="`/articulos/${articulo.id}`" class="btn btn-primary">Read More</nuxt-link>
            </div>
          </div>
        </div> -->
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