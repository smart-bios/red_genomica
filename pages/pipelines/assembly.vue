<template>
    <div class="container mt-3">
        <h2>De novo genome assembly</h2>
        <hr>
        <p>De novo assembly is a method for constructing genomes from a large number of (short- or long-) DNA fragments, with no a priori knowledge of the correct sequence or order of those fragments.</p>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Unicycler" active>
                    <p>Unicycler is an assembly pipeline for bacterial genomes. It can assemble Illumina-only read sets where it functions as a SPAdes-optimiser. It can also assembly long-read-only sets (PacBio or Nanopore) where it runs a miniasm+Racon pipeline. For the best possible assemblies, give it both Illumina reads and long reads, and it will conduct a hybrid assembly.</p>
                    <hr>
                    <Unicycler />
                </b-tab>
                <b-tab title="Platanus-allee">
                    <p>Platanus-allee is a de novo haplotype assembler (phasing tool), which assembles each haplotype sequence in a diploid genome. Compared to the read mapping-based haplotype phasing tools, Platanus-allee is especially useful to analyze highly divergent (heterozygous) regions in which haplotypes extremely differ. </p>

                </b-tab>
                <b-tab title="MaSuRCA">
                    <p>The MaSuRCA assembler combines the benefits of deBruijn graph and Overlap-Layout-Consensus assembly approaches. Since version 3.2.1 it supports hybrid assembly with short Illumina reads and long high error PacBio/MinION data.</p>
                
                </b-tab>                
            </b-tabs>
        </b-card>    
    </div>
</template>

<script>
import Unicycler from '@/components/bioinfotmatic/unicycler'
    export default {
        middleware: 'auth',
        components: {
            Unicycler
        }
    }
</script>

<style scoped>

</style>