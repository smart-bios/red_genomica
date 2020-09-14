<template>
    <div class="container mt-3">
         <h2>Functional Annotation</h2>
         <hr>
         <b-card no-body>
             <b-tabs card>
                 <b-tab title="eggNOG" active>
                    <p>Tool for fast functional annotation of novel sequences. It uses precomputed orthologous groups and phylogenies from the eggNOG database to transfer functional information from fine-grained orthologs only.</p>
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