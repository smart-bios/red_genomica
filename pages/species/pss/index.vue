<template>
    <div class="container mt-3">
        <h2><i>Pseudomonas syringae pv syringae</i></h2>          
        <hr>    
        <b-card no-body>
            <b-tabs pills card vertical>

                <b-tab title="Descripción" active>
                    <b-card-text>
                        <h4>Description</h4>
                        <hr>
                        <p class="text-justify"><b><i>Pseudomonas  syringae </i></b> es  una  bacteria  Gram-negativa,  patógena  de  plantas,  que  se  clasifica  en  patovares  según su especificidad de hospedador. <i>P. syringae</i> está vinculada al ciclo del agua pudiendo alcanzar la superficie de la hojas a través de precipitaciones. Una vez en la superficie de la hoja puede sobrevivir epifíticamente o penetrar en su interior a través de aperturas naturales como estomas o heridas, y crecer activamente en el apoplasto, causando en  este  caso  enfermedad.  La  infección  por  este  patógeno determina perdidas económicas importantes pudiendo afectar gravemente tanto a la producción neta como a la calidad. Las estrategias de prevención habituales, a menudo insuficientes, poco eficientes y/o contaminantes, consisten en el uso de tratamientos químicos con base de cobre, el uso de material vegetal libre de patógeno, la rotación de cultivos, y en el cultivo de variedades tradicionalmente más resistentes.</p>
                        
                        <p class="text-justify">Desde el punto de vista del manejo fitosanitario, una de las enfermedades que mayormente inciden en el cultivo del cerezo, es el <b>Cáncer Bacterial</b>, causado por <b><i>Pseudomonas syringae pv. syringae</i></b>. Los síntomas pueden aparecer a los pocos meses de la plantación, localizándose en el tronco, desde el cuello hasta el nacimiento de las ramas principales, o bien en las axilas de las mismas (Pinilla et al., 2010). Es una enfermedad muy importante en árboles nuevos, de difícil control, la que en cierta medida ha limitado el desarrollo de esta especie frutal en Chile (Latorre, 2008).</p>
                    </b-card-text>
                </b-tab>
                
                <b-tab title="Genomas">
                    <b-card-text>
                        <h4>Genomas</h4>
                        <hr>
                        <p>Genomas secuenciados y anotados de <i>Pseudomonas syringae pv syringae,</i> generados en  <b> Instituto de Investigaciones Agropecuarias. (INIA)</b></p>
                        <ul>
                            <li v-for="genoma in genomas" :key="genoma.name">
                                <nuxt-link :to="'/species/'+genoma._id">{{genoma.name}} {{genoma.version}} </nuxt-link>
                            </li>
                        </ul>
                        <hr>
                        <p>Genomas de referencia - <b>Pseudomonas syringae group</b></p>
                        <ul>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/185" target="blank_">Pseudomonas syringae</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/2506" target="blank_">Pseudomonas amygdali</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/2253" target="blank_">Pseudomonas syringae group genomosp. 3</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/2258" target="blank_">Pseudomonas savastanoi</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/2255" target="blank_">Pseudomonas coronafaciens</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/12979" target="blank_">Pseudomonas fuscovaginae</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/12999" target="blank_">Pseudomonas avellanae</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/11288" target="blank_">Pseudomonas viridiflava</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/40797" target="blank_">Pseudomonas syringae group genomosp. 7</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/36890" target="blank_">Pseudomonas syringae pv. coryli</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/30960" target="blank_">Pseudomonas cichorii</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/16535" target="blank_">Pseudomonas cannabina</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/54890" target="blank_">Pseudomonas caspiana</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/50719" target="blank_">Pseudomonas asturiensis</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/40798" target="blank_">Pseudomonas tremae</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/40796" target="blank_">Pseudomonas ficuserectae</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/40794" target="blank_">Pseudomonas caricapapayae</a></i></li>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/36383" target="blank_">Pseudomonas meliae</a></i></li>                            
                        </ul>
                    </b-card-text>
                </b-tab>          
                
                
                <b-tab title="Descargar">
                    <b-card-text>
                        <h4>Descargar</h4>
                        <hr>
                        <p>All assembly and annotation files are available for download by selecting the desired data type in the left-hand "Resources" side bar.  Each data type page will provide a description of the available files and links to download.  Alternatively, you can browse all available files on the 
                        <a  :href="`ftp://${host}/`">FTP repository.</a> </p>
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
               //host: 'localhost',
                host: '192.168.22.26',
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
