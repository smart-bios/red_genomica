<template>
    <div class="container mt-3">
        <h2>{{genoma.name}}</h2>
        <hr>
         <client-only>
        <b-card no-body>
            <b-tabs pills card vertical>

                <b-tab title="Overview" active>
                    <b-card-text>
                        <h4>Overview</h4>
                        <hr>
                        <table class="table table-striped table-sm">
                              <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Method</th>
                                <th scope="col">Version</th>
                                <th scope="col">Level</th>
                                <th scope="col">#Contigs</th>
                                <th scope="col">Size</th>
                                <th scope="col">CDS</th>
                                <th scope="col">Genes</th>
                                <th scope="col">rRNA</th>
                                <th scope="col">tRNA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{{genoma.name}}</th>
                                    <td>{{genoma.method}}</td>
                                    <td>{{genoma.version}}</td>
                                    <td>{{genoma.level}}</td>
                                    <td>{{genoma.contig}}</td>
                                    <td>{{genoma.size}}</td>
                                    <td>{{genoma.cds}}</td>
                                    <td>{{genoma.genes}}</td>
                                    <td>{{genoma.rRNA}}</td>
                                    <td>{{genoma.tRNA}}</td>
           
                                </tr>
                            </tbody>
                        </table>
                        <hr>
                        <p><strong>Descrption</strong></p>
                        <p> {{genoma.description}} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla impedit voluptatem nobis eos? Repudiandae voluptatum, non odit eos ut totam!</p>
                        <hr>
                        <p><strong>Sequencing, Assembly, and Annotation</strong></p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatibus dicta, vitae eos aspernatur atque repudiandae aliquid culpa rem placeat corporis sed sunt laudantium adipisci totam? Laborum sit dolorum quia, obcaecati necessitatibus repudiandae iste aut, explicabo voluptatem amet velit officia, qui neque rem fugit molestiae quod soluta! Distinctio quasi a repudiandae temporibus explicabo perferendis! Excepturi minus tempora quisquam dolorem maiores perferendis? Aut facilis, perspiciatis laboriosam deserunt doloribus saepe in maxime ex neque cupiditate est eligendi officiis? Atque incidunt placeat magni. Beatae voluptate quidem voluptatem sit necessitatibus! Ipsa magni in cum atque quam cupiditate nemo laborum quibusdam, sequi unde eos nihil.</p>

                    </b-card-text>
                </b-tab>

                <b-tab title="Homology">
                    <b-card-text>
                        <h4>Homology</h4>
                        <hr>
                        <p>Homology of the {{genoma.name}} {{genoma.version}} proteins was determined by pairwise sequence comparison using the blastp algorithm against various protein databases. An expectation value cutoff less than 1e-9 was used for the NCBI nr (Release 2018-05) and 1e-6  for UniProtKB/SwissProt (Release 2019-01)databases. The best hit reports are available for download in csv format.</p>
                        <p><strong> Downloads</strong></p>
                        <div class="row">
                            <div class="col-md-4">Blast results </div>
                            <div class="col-md-8">
                                <b-link :href="`ftp://${host}/Pseudomonas/${genoma.name}/blast/`">Download</b-link>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                <b-tab title="Annotation">
                    <b-card-text>
                        <h4>Annotation</h4>
                        <hr>
                        <p>Prokka finds and annotates features (both protein coding regions and RNA genes, i.e. tRNA, rRNA) present on on a sequence. Note, Prokka uses a two-step process for the annotation of protein coding regions: first, protein coding regions on the genome are identified using Prodigal; second, the function of the encoded protein is predicted by similarity to proteins in one of many protein or protein domain databases. Prokka is a software tool that can be used to annotate bacterial, archaeal and viral genomes quickly, generating standard output files in GenBank, EMBL and gff formats.  <b-link :href="`ftp://${host}/Pseudomonas/${genoma.name}`">FTP repository.</b-link></p>
                    </b-card-text>
                </b-tab>
                <b-tab title="Functional Analysis">
                    <b-card-text>
                        <h4>Functional Analysis</h4>
                        <hr>
                        <p>Functional annotation for the {{genoma.name}} genome {{genoma.version}} are available for download below. {{genoma.name}} genome {{genoma.version}} proteins were analyzed using <a href="https://github.com/eggnogdb/eggnog-mapper" target="_blank">eggnog-mapper</a> in order to assign Gene Ontology (GO) terms.Pathways analysis was performed using the KEGG Automatic Annotation Server (KAAS).</p>
                        <p><strong> Downloads</strong></p>
                        <div class="row">
                            <div class="col-md-4">Functional annotation eggNOG</div>
                            <div class="col-md-8">
                                <b-link :href="`ftp://${host}/Pseudomonas/${genoma.name}/Functional_Analysis/eggNOG/${genoma.name}_protein_eggNOG.tsv`">Download</b-link>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                <b-tab title="Donwload">
                    <b-card-text>
                        <h4>Download</h4>
                        <hr>
                        <p>All assembly and annotation files are available for download. Each data type page will provide a description of the available files and links to download.  Alternatively, you can browse all available files on the 
                        <b-link :href="`ftp://${host}/Pseudomonas/${genoma.name}`">FTP repository.</b-link></p>
                    </b-card-text>
                </b-tab>
            
            </b-tabs>        
        </b-card>
        </client-only>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                genoma: [],
                host: 'localhost', //192.168.22.26
                //host: '192.168.22.26'
            }   
        },
        async created(){
            try {
                const res = await this.$axios.get(`/genome/${this.$route.params.id}`);
                this.genoma = res.data.genoma
            } catch (error) {
                console.log(error)
            }
        }
    }
</script>

<style>

</style>