<template>
    <div class="container mt-3">
        <h2>Genomic Prediction/ Annotation</h2>
        <hr>
        <b-card class="mb-3">
            <p>La anotación del genoma es el proceso de identificar características de interés en un conjunto de secuencias de ADN genómico y etiquetarlas con información útil.</p>
        </b-card>
        
        <b-card no-body>
            <b-tabs card>

                <b-tab title="Prokka" active>
                    <p>Prokka is a software tool to annotate bacterial, archaeal and viral genomes quickly and produce standards-compliant output files.</p>
                    <b-card>
                        <b-card-text>
                           <i>Seemann T.</i> <b>Prokka: rapid prokaryotic genome annotation</b> Bioinformatics 2014 Jul 15;30(14):2068-9. <a href="http://www.ncbi.nlm.nih.gov/pubmed/24642063" target="_blank">PMID:24642063</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <Prokka />
                </b-tab>
                <b-tab title="DFAST" >
                    <p>DFAST is a flexible and customizable pipeline for prokaryotic genome annotation as well as data submission to the INSDC.</p>
                    <b-card>
                        <b-card-text>
                            <i>Yasuhiro Tanizawa, Takatomo Fujisawa, Yasukazu Nakamura</i>, <b>DFAST: a flexible prokaryotic genome annotation pipeline for faster genome</b> publication, Bioinformatics, Volume 34, Issue 6, 15 March 2018, Pages 1037–1039, <a href="https://doi.org/10.1093/bioinformatics/btx713" target="_blank">https://doi.org/10.1093/bioinformatics/btx713</a>                            
                        </b-card-text>
                    </b-card>                    
                    <hr>
                    <Dfast />
                </b-tab>                
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Prokka from '@/components/bioinfotmatic/prokka'
import Dfast from '@/components/bioinfotmatic/dfast'
    export default {
        middleware: 'auth',
        components: {
            Prokka,
            Dfast
        }

    }
</script>

<style>

</style>