<template>
    <div class="container mt-3">
        <h2>Microsatellites</h2>
        <hr>
        <p>Microsatellites or Simple Sequence Repeats (SSRs) are short tandem repeats of 1-6nt motifs. They are present in all genomes, and have a wide range of uses and functional roles.</p>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="SSRMMD" active>
                    <p>SSRMMD (Simple Sequence Repeat Molecular Marker Developer) is a tool that can mine perfect SSR loci and candidate polymorphic SSRs from assembled sequences (e.g. genome, transcriptome, or single gene).</p>
                    <b-card>
                        <b-card-text>
                            <i>Gou X, Shi H, Yu S, et al.</i> <b>SSRMMD: A Rapid and Accurate Algorithm for Mining SSR Feature Loci and Candidate Polymorphic SSRs Based on Assembled Sequences</b>. Front Genet. 2020;11:706. Published 2020 Jul 27. <a href="https://dx.doi.org/10.3389%2Ffgene.2020.00706" target="_blank">doi:10.3389/fgene.2020.00706</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <SSRMMD />
                </b-tab>
                <b-tab title="PERF">
                    <p>PERF is a Python package developed for fast and accurate identification of microsatellites from DNA sequences.</p>
                    <b-card>
                        <b-card-text>
                            <i>Akshay Kumar Avvaru, Divya Tej Sowpati, Rakesh Kumar Mishra</i>, <b>PERF: an exhaustive algorithm for ultra-fast and efficient identification of microsatellites from large DNA sequences</b>, Bioinformatics, Volume 34, Issue 6, 15 March 2018, Pages 943–948 <a href="https://doi.org/10.1093/bioinformatics/btx721" target="_blank">https://doi.org/10.1093/bioinformatics/btx721</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <Perf/>
                </b-tab>
                <b-tab title="Misa">
                    <b-alert show>En desarrollo</b-alert>
                </b-tab>          
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Perf from '@/components/bioinfotmatic/perf'
import SSRMMD from '@/components/bioinfotmatic/SSRMMD'
    export default {
        middleware: 'auth',
        components: {
            Perf,
            SSRMMD
        }
        
    }
</script>

<style lang="scss" scoped>

</style>