<template>
    <div class="container mt-3">
        <h2>Data Preprocessing</h2>
        <hr>
        <b-card class="mb-3">
            <p>Antes de hacer cualquier cosa con lecturas sin procesar (mapeo, agrupamiento, ensamblaje, etc.), generalmente es prudente realizar ciertos pasos de preprocesamiento. Y estos pasos se realizan mejor en un orden específico, junto con la herramienta de sugerencias. Tenga en cuenta que muchos de ellos (como el recorte de calidad) son opcionales. El recorte de adaptadores, no son opcionales y siempre deben hacerse.</p>
        </b-card>        
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Fastqc" active>
                    <p>FastQC permite realizar controles de calidad en archivos de secuencias obtenidos de métodos de secuenciación. Aporta un conjunto de análisis que te pueden dar una idea general rápida de si los datos tienen algún problema antes de proseguir con el análisis o si por el contrario cumplen los estándares de calidad aportados por el sistema.</p>
                    <b-card>
                        <b-card-text>
                            <i>Andrews S.</i> (2010). <b>FastQC: a quality control tool for high throughput sequence data</b> Available online at: <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastqc" target="_blank">http://www.bioinformatics.babraham.ac.uk/projects/fastqc</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <Fastqc />
                </b-tab>

                <!-- <b-tab title="Fastp" disabled >
                    <p> Fastp es un preprocesador FASTQ ultrarrápido con funciones útiles de control de calidad y filtrado de datos. Puede realizar control de calidad, recorte de adaptadores, filtrado de calidad, poda de calidad por lectura y muchas otras operaciones con un solo escaneo de los datos FASTQ.</p>
                    <b-card>
                        <b-card-text>
                            <i>Shifu Chen, Yanqing Zhou, Yaru Chen, Jia Gu;</i> <b>fastp: an ultra-fast all-in-one FASTQ preprocessor</b>, Bioinformatics, Volume 34, Issue 17, 1 September 2018, Pages i884–i890 <a href="https://doi.org/10.1093/bioinformatics/bty560">https://doi.org/10.1093/bioinformatics/bty560</a>,
                        </b-card-text>
                    </b-card>
                    <b-alert show>Solo es necesario si los reads en fastqc dan un mal reporte.</b-alert>
                    <hr>
                    <Fastp />
                </b-tab> -->
                <b-tab title="BBduk" >
                    <p> “Duk” stands for Decontamination Using Kmers. BBDuk was developed to combine most common data-quality-related trimming, filtering, and masking operations into a single high-performance tool.</p>
                    <b-alert show>Solo es necesario si los reads en fastqc dan un mal reporte.</b-alert>
                    <hr>
                    <BBDuk />
                </b-tab>

                <b-tab title="Trim Galore" >
                    <p> Trim Galore! is a wrapper script to automate quality and adapter trimming as well as quality control <a href="http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/" target="_blank">Link</a></p>
                    <b-alert show>Solo es necesario si los reads en fastqc dan un mal reporte.</b-alert>
                    <hr>
                    <TrimGalore />
                </b-tab>

                <b-tab title="FastQ Screen" >
                    <p> FastQ Screen is an application which allows you to search a FastQ sequence file against a set of sequence databases and summarises the results. It is useful for incorporating into a sequencing pipeline to identify sources of contamination or mislabeled samples.</p>
                    <b-card>
                        <b-card-text>
                            <i>Wingett SW, Andrews S</i>. <b>FastQ Screen: A tool for multi-genome mapping and quality control.</b> F1000Res. 2018;7:1338. Published 2018 Aug 24. <a href="https://dx.doi.org/10.12688%2Ff1000research.15931.2" target="_blank">doi:10.12688/f1000research.15931.2</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <FastqScreen />
                </b-tab>                
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Fastqc from '@/components/bioinfotmatic/fastqc'
import Fastp from '@/components/bioinfotmatic/fastp'
import BBDuk from '@/components/bioinfotmatic/bbduk.vue'
import TrimGalore from '@/components/bioinfotmatic/trim_galore'
import FastqScreen from '@/components/bioinfotmatic/fastq_screen'

    export default {
        middleware: 'auth',
        components: {
            Fastqc,
            Fastp,
            BBDuk,
            TrimGalore,
            FastqScreen
        }

    }
</script>

<style>

</style>