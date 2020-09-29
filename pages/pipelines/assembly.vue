<template>
    <div class="container mt-3">
        <h2>De novo assembly</h2>
        <hr>
        <b-card class="mb-3">
            <p>De novo assembly es un método para construir genomas a partir de un gran número de fragmentos de ADN (cortos o largos), sin conocimiento a priori de la secuencia u orden correcto de esos fragmentos.</p>
        </b-card>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Unicycler" active>
                    <p>Unicycler is an assembly pipeline for bacterial genomes. It can assemble Illumina-only read sets where it functions as a SPAdes-optimiser. It can also assembly long-read-only sets (PacBio or Nanopore) where it runs a miniasm+Racon pipeline. For the best possible assemblies, give it both Illumina reads and long reads, and it will conduct a hybrid assembly.</p>
                    <b-card>
                        <b-card-text>
                            <i>Wick RR, Judd LM, Gorrie CL, Holt KE</i> (2017) <b>Unicycler: Resolving bacterial genome assemblies from short and long sequencing reads.</b><br> PLOS Computational Biology 13(6): e1005595. <a href="https://doi.org/10.1371/journal.pcbi.1005595" target="_blank">https://doi.org/10.1371/journal.pcbi.1005595</a>
                        </b-card-text>
                    </b-card>
                    
                    <hr>
                    <Unicycler />
                </b-tab>
                <b-tab title="MaSuRCA">
                    <p>The MaSuRCA assembler combines the benefits of deBruijn graph and Overlap-Layout-Consensus assembly approaches. Since version 3.2.1 it supports hybrid assembly with short Illumina reads and long high error PacBio/MinION data.</p>
                    <b-card>
                        <b-card-text>
                            <i>Zimin AV, Marçais G, Puiu D, Roberts M, Salzberg SL, Yorke JA.</i> <b>The MaSuRCA genome assembler</b>. Bioinformatics. 2013;29(21):2669-2677. <a href="https://doi.org/10.1093/bioinformatics/btt476" target="_blank">doi:10.1093/bioinformatics/btt476</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <b-alert show>En desarrollo</b-alert>
                    <Masurca />
                
                </b-tab>  
                <b-tab title="Platanus-allee">
                    <p>Platanus-allee is a de novo haplotype assembler (phasing tool), which assembles each haplotype sequence in a diploid genome. Compared to the read mapping-based haplotype phasing tools, Platanus-allee is especially useful to analyze highly divergent (heterozygous) regions in which haplotypes extremely differ.</p>
                    <b-card>
                        <b-card-text>
                            <i>Kajitani R,  Yoshimura D, Okuno M, Minakuchi Y, Kagoshima H,  Fujiyama A, Kubokawa K, Kohara Y, Toyoda A, Itoh T</i>, <b>“Platanus-allee is a de novo haplotype assembler enabling a comprehensive access to divergent heterozygous regions”.</b> Nature Communications 10 Article number: 1702 (2019). <a href="https://rdcu.be/bwkPI" target="_blank">doi: 10.1038/s41467-019-09575-2</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <b-alert show>En desarrollo</b-alert>

                </b-tab>
                              
            </b-tabs>
        </b-card>    
    </div>
</template>

<script>
import Unicycler from '@/components/bioinfotmatic/unicycler'
import Masurca from '@/components/bioinfotmatic/masurca'

    export default {
        middleware: 'auth',
        components: {
            Unicycler,
            Masurca
        }
    }
</script>

<style scoped>

</style>