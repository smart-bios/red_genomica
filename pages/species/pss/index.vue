<template>
    <div class="container mt-3">
        <h2><i>Pseudomonas syringae pv syringae</i></h2>          
        <hr>    
        <b-card no-body>
            <b-tabs pills card vertical>

                <b-tab title="Description" active>
                    <b-card-text>
                        <h4>Description</h4>
                        <hr>
                        <p class="text-justify"><b><i>Pseudomonas  syringae </i></b> es  una  bacteria  Gram-negativa,  patógena  de  plantas,  que  se  clasifica  en  patovares  según su especificidad de hospedador. <i>P. syringae</i> está vinculada al ciclo del agua pudiendo alcanzar la superficie de la hojas a través de precipitaciones. Una vez en la superficie de la hoja puede sobrevivir epifíticamente o penetrar en su interior a través de aperturas naturales como estomas o heridas, y crecer activamente en el apoplasto, causando en  este  caso  enfermedad.  La  infección  por  este  patógeno determina perdidas económicas importantes pudiendo afectar gravemente tanto a la producción neta como a la calidad. Las estrategias de prevención habituales, a menudo insuficientes, poco eficientes y/o contaminantes, consisten en el uso de tratamientos químicos con base de cobre, el uso de material vegetal libre de patógeno, la rotación de cultivos, y en el cultivo de variedades tradicionalmente más resistentes.</p>
                        
                        <p class="text-justify">Desde el punto de vista del manejo fitosanitario, una de las enfermedades que mayormente inciden en el cultivo del cerezo, es el <b>Cáncer Bacterial</b>, causado por <b><i>Pseudomonas syringae pv. syringae</i></b>. Los síntomas pueden aparecer a los pocos meses de la plantación, localizándose en el tronco, desde el cuello hasta el nacimiento de las ramas principales, o bien en las axilas de las mismas (Pinilla et al., 2010). Es una enfermedad muy importante en árboles nuevos, de difícil control, la que en cierta medida ha limitado el desarrollo de esta especie frutal en Chile (Latorre, 2008).</p>
                    </b-card-text>
                </b-tab>
                
                <b-tab title="Genomes">
                    <b-card-text>
                        <h4>Genomes</h4>
                        <hr>
                        <p>Whole Genome Sequences and Annotations for <i>Pseudomonas syringae pv syringae</i> </p>
                        <ul>
                            <li v-for="genoma in genomas" :key="genoma.name">
                                <nuxt-link :to="'/species/'+genoma._id">{{genoma.name}} {{genoma.version}} </nuxt-link>
                            </li>
                        </ul>
                    </b-card-text>
                </b-tab>          
                
                
                <b-tab title="Downloads">
                    <b-card-text>
                        <h4>Download</h4>
                        <hr>
                        <p>All assembly and annotation files are available for download by selecting the desired data type in the left-hand "Resources" side bar.  Each data type page will provide a description of the available files and links to download.  Alternatively, you can browse all available files on the 
                        <a  href="ftp://localhost/">FTP repository.</a> </p>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                genomas: [],
                tipo: 'pss'
            }
        },
        async created(){
            try {
                const res = await this.$axios.get(`/genome/search/${this.tipo}`);
                this.genomas = res.data.genomas
            } catch (error) {
                console.log(error)
            }
        }
    }
</script>