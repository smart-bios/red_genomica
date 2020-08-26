<template>
    <div>
        <div class="container mt-3">
            <h2>BLAST Search </h2>
            <hr>
            <b-card class="mb-2">
            <b-card-text>
                <p>Search for one or more of your sequences (using BLAST). Choose the appropriate program based on the Query type and Target database type</p>
            </b-card-text>
            </b-card>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="blastp" active>
                        <Blastp />
                    </b-tab>
                    <b-tab title="blastn">
                        <Blastn />
                    </b-tab>
                    <b-tab title="blastx">
                        <Blastx />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import Blastp from '@/components/blast/Blastp'
    import Blastn from '@/components/blast/Blastn'
    import Blastx from '@/components/blast/Blastx'
    export default {
        components: {
            Blastp,
            Blastn,
            Blastx
        }
    }
</script>