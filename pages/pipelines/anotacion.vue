<template>
    <div class="container mt-3">
         <h2>Functional Annotation</h2>
         <hr>
         <b-card class="mb-3">
             <p>La anotación funcional es similar a la de genomas, asignando anotaciones a todas las secuencias predichas y generando tablas resumen con la distribución de genes por proceso biológico o localización subcelular</p>
         </b-card>
         <b-card no-body>
             <b-tabs card>
                 <b-tab title="eggNOG" active>
                    <p>Tool for fast functional annotation of novel sequences. It uses precomputed orthologous groups and phylogenies from the eggNOG database to transfer functional information from fine-grained orthologs only.</p>
                    <b-card>
                        <b-card-text>
                            <i>Jaime Huerta-Cepas, Kristoffer Forslund, Luis Pedro Coelho, Damian Szklarczyk, Lars Juhl Jensen, Christian von Mering, Peer Bork</i>, <b>Fast Genome-Wide Functional Annotation through Orthology Assignment by eggNOG-Mapper</b>, Molecular Biology and Evolution, Volume 34, Issue 8, August 2017, Pages 2115–2122, <a href="https://doi.org/10.1093/molbev/msx148" target="_blank">https://doi.org/10.1093/molbev/msx148</a>
                        </b-card-text>
                    </b-card>                    
                    <hr>
                    <eggNOG />
                 </b-tab>

             </b-tabs>
         </b-card>
    </div>
</template>

<script>
import eggNOG from '@/components/bioinfotmatic/eggNOG'
    export default {
        middleware: 'auth',
        components: {
           eggNOG
        }
    }

</script>

<style scoped>

</style>