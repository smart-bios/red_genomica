<template>
    <div class="container mt-3">
        <h2>Quality assessment tool for genome assemblies</h2>
        <hr>
        <b-card class="mb-3">
            <p>Evaluar la calidad del genoma ensamblado. Se obtienen medidas que pueden tomar en cuenta las características de las secuencias generadas en el proceso o utilizar información adicional. Estas nos indican si el ensamble fue hecho de manera correcta.</p>
        </b-card>
        
        <b-card no-body>
            <b-tabs card>

                <b-tab title="Quast" active>
                    <p>Quality Assessment Tool for Genome Assemblies</p>
                    <b-card>
                        <b-card-text>
                            <i>Alexey Gurevich, Vladislav Saveliev, Nikolay Vyahhi and Glenn Tesler</i>, <b>QUAST: quality assessment tool for genome assemblies</b>, <br> Bioinformatics, Volume 29, Issue 8, 15 April 2013, Pages 1072–1075,<a href="http://dx.doi.org/10.1093/bioinformatics/btt086" target="_blank">doi: 10.1093/bioinformatics/btt086</a>                            
                        </b-card-text>
                    </b-card>
                    <hr>
                    <Quast />
                </b-tab>
                <b-tab title="BUSCO" >
                    <p>Based on evolutionarily-informed expectations of gene content of near-universal single-copy orthologs, BUSCO metric is complementary to technical metrics like N50.</p>
                    <b-card>
                        <b-card-text>
                            <i>Seppey M., Manni M., Zdobnov E.M.</i>(2019) <b>BUSCO: Assessing Genome Assembly and Annotation Completeness.</b> <br> In: Kollmar M. (eds) Gene Prediction. Methods in Molecular Biology, vol 1962. Humana, New York, NY. 2019 <a href="https://link.springer.com/protocol/10.1007/978-1-4939-9173-0_14" target="_blank">doi.org/10.1007/978-1-4939-9173-0_14</a>
                            
                        </b-card-text>
                    </b-card>
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