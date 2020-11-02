<template>
  <b-container class="mt-3">
    <b-card 
      bg-variant="ligth" 
      text-variant="dark"
      class="portada1"
    >
      <b-card-text>
        <h3> <b>Red Genómica y Bioinformática INIA</b></h3>
        <hr>
        <h5>Plataforma bioinformática con datos genómicos y herramientas de análisis para estudiar la variabilidad genética de las poblaciones de nematodos agalladores (<i>Meloidogyne spp</i>) y <i>Pseudomonas syringea</i> que afectan los frutales de Prunus en Chile, para facilitar el desarrollo de herramientas de identificación de variantes (y/o especies) y facilitar estudios epidemiológicos para su control.</h5>

        <div class="imagenes mt-4">
          <b-row>
          <b-col>
            <b-img thumbnail fluid src="https://www.sciadnewswire.com/sites/default/files/images/slideshow/iStock_000019077670Medium.jpg" alt="Image 3"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://salud.ideal.es/wp-content/images/noticias/bioinfo.jpg" alt="Image 2"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://www.bbva.com/wp-content/uploads/2017/08/iStock-664868402-1024x683.jpg" alt="Image 3"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://www.cabecera.mx/wp-content/uploads/2017/03/d66e89a1d1214ea7700754049bad4795.jpg" alt="Image 1"></b-img>
          </b-col>
        </b-row>
        </div>
        
      </b-card-text>
    </b-card>
    <div class="portada2">
      <b-alert show>En desarrollo...</b-alert>
    </div>

  </b-container>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
.portada1{
    background-color: whitesmoke;
   
}

.portada2{
    height: 300px;
    padding: 2%;
   
}
</style>