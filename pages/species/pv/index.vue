<template>
    <div class="container mt-3">
        <h2><i>Pseudomonas viridiflava</i></h2>          
        <hr>    
        <b-card no-body>
            <b-tabs pills card vertical>
                <b-tab title="Description" active>
                    <b-card-text>
                        <h4>Description</h4>
                        <hr>
                        <p class="text-justify"><b><i>Pseudomonas viridiflava </i></b> is a fluorescent, Gram-negative, soil bacterium that is pathogenic to plants. It was originally isolated from the dwarf or runner bean, in Switzerland. Based on 16S rRNA analysis, P. viridiflava has been placed in the P. syringae group.Following ribotypical analysis misidentified strains of Pseudomonas syringae pv. ribicola (which infects Ribes aureum) and Pseudomonas syringae pv. primulae (which infects Primula species) were incorporated into this species.This pathogen causes bacterial blight of Kiwifruit. </p>
                    </b-card-text>
                </b-tab>
                <b-tab title="Genomas">
                    <b-card-text>
                        <h4>Genomas</h4>
                        <hr>
                        <p>Genomas secuenciados y anotados de <i>Pseudomonas viridiflava,</i>generados en <b>Instituto de Investigaciones Agropecuarias.</b></p>
                        <ul>
                            <li v-for="genoma in genomas" :key="genoma.name">
                                <nuxt-link :to="'/species/'+genoma._id">{{genoma.name}} {{genoma.version}} </nuxt-link>
                            </li>
                        </ul>
                        <h5><b>Genoma de referencia</b></h5>
                        <ul>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/11288" target="blank_">Pseudomonas viridiflava</a></i></li>
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
                tipo: 'pv'
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
