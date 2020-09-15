<template>
    <div class="container mt-3">
        <h2>Data Preprocessing</h2>
        <hr>
        <p>Prior to doing anything with raw reads – mapping, clustering, assembly, etc – it is usually prudent to do certain preprocessing steps. And these steps are best done in a specific order, which I have detailed below, along with the suggest tool. Note that many of them (like quality-trimming) are optional, so if you do them, do them in this order; but you don’t have to do them. Others, like adapter-trimming, are not optional and should always be done.</p>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Fastqc" active>
                    <p>FastQC aims to provide a simple way to do some quality control checks on raw sequence data coming from high throughput sequencing pipelines. It provides a modular set of analyses which you can use to give a quick impression of whether your data has any problems of which you should be aware before doing any further analysis.</p>
                    <b-card>
                        <b-card-text>
                            <i>Andrews S.</i> (2010). <b>FastQC: a quality control tool for high throughput sequence data</b> Available online at: <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastqc" target="_blank">http://www.bioinformatics.babraham.ac.uk/projects/fastqc</a>
                        </b-card-text>
                    </b-card>
                    <hr>
                    <Fastqc />
                </b-tab>

                 <b-tab title="Trim Galore" >
                    <p> Trim Galore! is a wrapper script to automate quality and adapter trimming as well as quality control <a href="http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/" target="_blank">Link</a></p>
                    <b-alert show>Es necesario si los reads en fastqc dan un mal reporte.</b-alert>
                    <hr>
                    <TrimGalore />
                </b-tab>

                <b-tab title="Fastq screen" >
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
import TrimGalore from '@/components/bioinfotmatic/trim_galore'
import FastqScreen from '@/components/bioinfotmatic/fastq_screen'

    export default {
        middleware: 'auth',
        components: {
            Fastqc,
            TrimGalore,
            FastqScreen
        }

    }
</script>

<style>

</style>