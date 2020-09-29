<template>
    <div class="container mt-3">
        <h2>Meloidogyne</h2>
        <hr>
        <b-card no-body>
            <b-tabs pills card vertical>
                <b-tab title="Description" active>
                    <b-card-text>
                        <h4>Description</h4>
                        <hr>
                        <p class="text-justify">
                            Meloidogyne es un género de nematodos inductores de agallas que habitan en casi todas las regiones templadas y cálidas del mundo; son parásitos internos de las raíces de cientos de especies vegetales, incluyendo muchas plantas de importancia agrícola.</p>
                        <p class="text-justify">
                        <i>Meloidogyne</i> spp. es uno de los géneros de nematodos más importantes debido a las pérdidas que produce en los cultivos, ya que induce alteraciones en las raíces provocando agallas. Para esto, rompe las células de la planta, disuelve las paredes celulares o indu-ce cambios fisiológicos en los tejidos radicales como resultado de la inyección de sustancias fitotóxicas a través de su estilete. Estas afecciones provocan una predisposición de la planta al ataque de otros microorganismos patógenos como hongos, bacterias y virus que penetran la planta a través de las heridas ocasionadas por el nematodo. Se trata de especies endoparásitas obligadas, capaces de adaptarse a una gran cantidad de plantas huéspedes y con una elevada tasa de reproducción con varias generaciones por año.</p>
                    </b-card-text>
                </b-tab>
                <b-tab title="Genomes">
                    <b-card-text>
                        <h4>Genomes</h4>
                        <hr>
                        <p>Whole Genome Sequences and Annotations for <i> Meloidogyne sp.</i>generated in <b>Instituto de Investigaciones Agropecuarias.</b> </p>
                        <ul>
                            
                        </ul>
                        <h5><b>Representative genome</b></h5>
                        <ul>
                            <li><i><a href="https://www.ncbi.nlm.nih.gov/genome/281">Meloidogyne incognita</a></i></li>
                        </ul>
                    </b-card-text>
                </b-tab>          
                
                <b-tab title="Downloads">
                    <b-card-text>
                        <h4>Download</h4>
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>