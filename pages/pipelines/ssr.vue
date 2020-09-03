<template>
    <div class="container mt-3">
        <h2>Microsatellites</h2>
        <hr>
        <p>Microsatellites or Simple Sequence Repeats (SSRs) are short tandem repeats of 1-6nt motifs. They are present in all genomes, and have a wide range of uses and functional roles.</p>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="PERF" active>
                    <p>PERF is a Python package developed for fast and accurate identification of microsatellites from DNA sequences.</p>
                    <b-alert show>Editando</b-alert>
                    <hr>
                    <Perf/>
                </b-tab>            
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Perf from '@/components/bioinfotmatic/perf'
    export default {
        middleware: 'auth',
        components: {
            Perf
        }
        
    }
</script>

<style lang="scss" scoped>

</style>