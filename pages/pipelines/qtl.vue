<template>
    <div class="container mt-3">
         <h2>QTL mapping</h2>
         <hr>
         <b-card class="mb-3">
             <p>El mapeo de QTLs por sí sólo es una herramienta muy útil para mejoramiento genético, ya que permite identificar los marcadores moleculares (loci) que afectan un carácter cuantitativo de interés.</p>
         </b-card>
         <b-card no-body>
             <b-tabs card>
                 <b-tab title="FlexQTL" active>
                    <p>FlexQTL is a software package for Quantitative Trait Loci (QTL) analysis with an emphasis on the known pedigree of a population. Such a population may comprise a single bi-parental mapping population up to complex multi-generations pedigrees. FlexQTL for QTL analysis in pedigreed populations is a software package developed in a collaboration between Biometris and Plant Breeding.</p>
                    <!-- <b-card>
                        <b-card-text>
                            <i>Jaime Huerta-Cepas, Kristoffer Forslund, Luis Pedro Coelho, Damian Szklarczyk, Lars Juhl Jensen, Christian von Mering, Peer Bork</i>, <b>Fast Genome-Wide Functional Annotation through Orthology Assignment by eggNOG-Mapper</b>, Molecular Biology and Evolution, Volume 34, Issue 8, August 2017, Pages 2115–2122, <a href="https://doi.org/10.1093/molbev/msx148" target="_blank">https://doi.org/10.1093/molbev/msx148</a>
                        </b-card-text>
                    </b-card>   -->                  
                    <hr>
                    <b-alert show> En desarrollo</b-alert>
                 </b-tab>
                 <b-tab title="RV-NPQTL">
                    <p> <a href="https://github.com/percylinhai/rvnpqtl">https://github.com/percylinhai/rvnpqtl</a> </p>
                    <!-- <b-card>
                        <b-card-text>
                            <i>Jaime Huerta-Cepas, Kristoffer Forslund, Luis Pedro Coelho, Damian Szklarczyk, Lars Juhl Jensen, Christian von Mering, Peer Bork</i>, <b>Fast Genome-Wide Functional Annotation through Orthology Assignment by eggNOG-Mapper</b>, Molecular Biology and Evolution, Volume 34, Issue 8, August 2017, Pages 2115–2122, <a href="https://doi.org/10.1093/molbev/msx148" target="_blank">https://doi.org/10.1093/molbev/msx148</a>
                        </b-card-text>
                    </b-card>   -->                  
                    <hr>
                    <b-alert show> En desarrollo</b-alert>
                 </b-tab>

             </b-tabs>
         </b-card>
    </div>
</template>

<script>
    export default {
        middleware: 'auth',
        components: {
        }
    }

</script>

<style scoped>

</style>