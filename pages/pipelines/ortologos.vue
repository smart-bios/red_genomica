<template>
    <div class="container mt-3">
        <h2>Orthologs</h2>
        <hr>
        <b-alert show>En desarrollo...</b-alert>
        <p>
            OrthoFinder is a fast, accurate and comprehensive platform for comparative genomics. It finds orthogroups and orthologs, infers rooted gene trees for all orthogroups and identifies all of the gene duplication events in those gene trees. It also infers a rooted species tree for the species being analysed and maps the gene duplication events from the gene trees to branches in the species tree. OrthoFinder also provides comprehensive statistics for comparative genomic analyses. OrthoFinder is simple to use and all you need to run it is a set of protein sequence files (one per species) in FASTA format.
        </p>
    </div>
</template>

<script>
    export default {
        middleware: 'auth',

    }
</script>
