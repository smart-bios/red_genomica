<template>
    <div class="container mt-3">
        <h2>Primer3</h2>
        <hr>
        <b-card class="mb-3">
             <p>Primer3 is a widely used program for designing PCR primers (PCR = "Polymerase Chain Reaction"). PCR is an essential and ubiquitous tool in genetics and molecular biology. Primer3 can also design hybridization probes and sequencing primers. </p>
         </b-card>
    
        <b-card no-body>
             <b-tabs card>
                 <b-tab title="Primer3Plus" active>
                    <p>Primer3Plus is a webinterface for Primer3</p>
                    <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://primer3plus.com/cgi-bin/dev/primer3plus.cgi"
                        allowfullscreen
                    ></b-embed>
                 </b-tab>
                 <b-tab title="Primer3web">
                    <p>Primer3web tool is the large number of customizable options for the primer design. These options include the usual suspects such as primer length, melting temperature, and product length, but they also include options relating to thermodynamic secondary structure properties (such as template mispriming and self-complementarity), reaction conditions, and customizable penalty weights for the primers.</p>
                    <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://primer3plus.com/primer3web/primer3web_input.htm"
                        allowfullscreen
                    ></b-embed>             
                    <hr>
                 </b-tab>
                 <b-tab title="BatchPrimer3">
                     <p>BatchPrimer3 is a comprehensive web primer design program using Primer3 core program as a major primer design engine to design different types of PCR primers and sequencing primers in a high-through manner. BatchPrimer3 allows users to design several types of primers including generic primers, hybridization oligos, SSR primers together with SSR detection, and SNP genotyping primers (including single-base extension primers, allele-specific primers, and tetra-primers for tetra-primer ARMS PCR), as well as DNA sequencing primers. A batch input of large number of sequences and a tab-delimited result output greatly facilitates rapid primer design and ordering process.</p>
                     <hr>
                     <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://probes.pw.usda.gov/cgi-bin/batchprimer3/batchprimer3.cgi"
                        allowfullscreen
                    ></b-embed>
                 </b-tab>

             </b-tabs>
         </b-card>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>