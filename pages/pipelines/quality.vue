<template>
    <div class="container mt-3">
        <h2>Quality assessment tool for genome assemblies</h2>
        <hr>
        <p>Evaluar la calidad del genoma ensamblado. Se obtienen medidas que pueden tomar en cuenta las características de las secuencias generadas en el proceso o utilizar información adicional. Estas nos indican si el ensamble fue hecho de manera correcta.</p>
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
                    <Busco />
                </b-tab>                
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Quast from '@/components/bioinfotmatic/quast'
import Busco from '@/components/bioinfotmatic/busco'
    export default {
        middleware: 'auth',
        components: {
            Quast,
            Busco
        }

    }
</script>

<style>

</style>