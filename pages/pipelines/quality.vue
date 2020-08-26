<template>
    <div class="container mt-3">
        <h2>Quality assessment tool for genome assemblies</h2>
        <hr>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate repudiandae voluptatum eos similique recusandae delectus, velit maiores quidem exercitationem molestiae, earum sit nemo rem laudantium explicabo dolore vero alias ipsum.</p>
        <b-card no-body>
            <b-tabs card>

                <b-tab title="Quast" active>
                    <p>Evaluates genome assemblies..</p>
                    <hr>
                    <Quast />
                </b-tab>
                <b-tab title="BUSCO" >
                    <p>Based on evolutionarily-informed expectations of gene content of near-universal single-copy orthologs, BUSCO metric is complementary to technical metrics like N50.</p>
                    <hr>
                </b-tab>                
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Quast from '@/components/bioinfotmatic/quast'
    export default {
        middleware: 'auth',
        components: {
            Quast
        }

    }
</script>

<style>

</style>