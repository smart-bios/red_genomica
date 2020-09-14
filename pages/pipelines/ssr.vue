<template>
    <div class="container mt-3">
        <h2>Microsatellites</h2>
        <hr>
        <p>Microsatellites or Simple Sequence Repeats (SSRs) are short tandem repeats of 1-6nt motifs. They are present in all genomes, and have a wide range of uses and functional roles.</p>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="SSRMMD" active>
                    <p>SSRMMD (Simple Sequence Repeat Molecular Marker Developer) is a tool that can mine perfect SSR loci and candidate polymorphic SSRs from assembled sequences (e.g. genome, transcriptome, or single gene).</p>
                    <hr>
                    <SSRMMD />
                </b-tab>
                <b-tab title="PERF">
                    <p>PERF is a Python package developed for fast and accurate identification of microsatellites from DNA sequences.</p>
                    <hr>
                    <Perf/>
                </b-tab>
                <b-tab title="Misa">
                
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