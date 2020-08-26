<template>
    <div class="container mt-3">
        <h2>Data Preprocessing</h2>
        <hr>
        <p>Prior to doing anything with raw reads – mapping, clustering, assembly, etc – it is usually prudent to do certain preprocessing steps. And these steps are best done in a specific order, which I have detailed below, along with the suggest tool. Note that many of them (like quality-trimming) are optional, so if you do them, do them in this order; but you don’t have to do them. Others, like adapter-trimming, are not optional and should always be done.</p>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Fastqc" active>
                    <p>FastQC aims to provide a simple way to do some quality control checks on raw sequence data coming from high throughput sequencing pipelines. It provides a modular set of analyses which you can use to give a quick impression of whether your data has any problems of which you should be aware before doing any further analysis.</p>
                    <hr>
                    <Fastqc />
                </b-tab>
                 <b-tab title="Trim Galore" >
                    <p> Trim Galore! is a wrapper script to automate quality and adapter trimming as well as quality control</p>
                    <hr>
                    <TrimGalore />
                </b-tab>  
                <b-tab title="Fastq screen" >
                    <p> FastQ Screen is an application which allows you to search a FastQ sequence file against a set of sequence databases and summarises the results. It is useful for incorporating into a sequencing pipeline to identify sources of contamination or mislabeled samples.</p>
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