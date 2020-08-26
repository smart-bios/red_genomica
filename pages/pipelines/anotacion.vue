<template>
    <div class="container mt-3">
         <h2>Anotación</h2>
         <hr>
         <b-alert show>En desarrollo...</b-alert>
         <p>eggNOG-mapper is a tool for fast functional annotation of novel sequences. It uses precomputed orthologous groups and phylogenies from the eggNOG database to transfer functional information from fine-grained orthologs only.</p>
         
        <b-card header="Default">
            <b-card-text>
                <p><small>(Up to 100,000 CDS/protein sequences in FASTA format). </small></p>                            
            </b-card-text>
      </b-card>
    </div>
</template>

<script>
    export default {
        middleware: 'auth',
    }

</script>

<style scoped>

</style>