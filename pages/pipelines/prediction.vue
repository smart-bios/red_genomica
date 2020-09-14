<template>
    <div class="container mt-3">
        <h2>Genomic Prediction/ Annotation</h2>
        <hr>
        <p>Whole genome annotation is the process of identifying features of interest in a set of genomic DNA sequences, and labelling them with useful information.</p>
        <b-card no-body>
            <b-tabs card>

                <b-tab title="Prokka" active>
                    <p>Prokka is a software tool to annotate bacterial, archaeal and viral genomes quickly and produce standards-compliant output files.</p>
                    <hr>
                    <Prokka />
                </b-tab>
                <b-tab title="DFAST" >
                    <p>DFAST is a flexible and customizable pipeline for prokaryotic genome annotation as well as data submission to the INSDC.</p>
                    <b-alert show>En mantención...</b-alert>
                    <hr>
                </b-tab>                
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Prokka from '@/components/bioinfotmatic/prokka'
    export default {
        middleware: 'auth',
        components: {
            Prokka
        }

    }
</script>

<style>

</style>