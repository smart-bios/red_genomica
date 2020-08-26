<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
            <b-card-text>
                <b-form-group description="Project name">
                    <b-form-input 
                        v-model="input.project_name" 
                        placeholder="Enter your project name"
                        lazy-formatter  
                        :formatter="formatter"
                    ></b-form-input>
                </b-form-group>         
                <hr>
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Contigs to annotate "
                            label-for="contigs"
                            description="FASTA format"
                        >
                            <b-form-select v-model="input.fasta_file">
                                <b-form-select-option :value="null">Please select a file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                            <!-- <div class="mt-2">Selected: <strong>{{input.fasta_file}}</strong></div> -->
                        </b-form-group>                                 
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Locus tag prefix "
                            label-for="prefix"
                        >
                            <b-form-input id="prefix" v-model="input.locustag"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-badge to="/storage" variant="primary">Upload files</b-badge>
                <hr>
                <b-button variant="secondary" size="sm" @click="run_prokka">Run PROKKAS</b-button>
            </b-card-text>
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p class="text-center"><b>Runing Prokka<br>Please wait...</b></p>
                </div>
            </template>
        </b-overlay>
       
        <hr>        
        <b-card
            border-variant="light"
            header="Result"
            header-bg-variant="success"
            header-text-variant="white"
            v-if="show_result"
        >
            <b-card-text>
                <h3>{{title}}</h3>
                <hr>
                <b-btn pill variant="secondary" size="sm" @click="download_file">Downolad results</b-btn>
                <p class="mt-2">Prokka finds and annotates features (both protein coding regions and RNA genes, i.e. tRNA, rRNA) present on on a sequence. Note, Prokka uses a two-step process for the annotation of protein coding regions: first, protein coding regions on the genome are identified using Prodigal; second, the function of the encoded protein is predicted by similarity to proteins in one of many protein or protein domain databases. Prokka is a software tool that can be used to annotate bacterial, archaeal and viral genomes quickly, generating standard output files in GenBank, EMBL and gff formats. </p>
                 <b-table striped hover :items="items"></b-table>
            </b-card-text>
        </b-card>
                
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show: false,
                show_result: false,
                input: {
                    project_name: 'prokka_01',
                    fasta_file: null,
                    locustag: 'example',
                    user: `${this.$store.state.usuario.email}`,
                    user_id: `${this.$store.state.usuario._id}`
                },
                items: [
                    { extension: '.gff', description: 'This is the master annotation in GFF3 format, containing both sequences and annotations. It can be viewed directly in Artemis or IGV.' },
                    { extension: '.gbk', description: 'This is a standard Genbank file derived from the master .gff. If the input to prokka was a multi-FASTA, then this will be a multi-Genbank, with one record for each sequence.' },
                    { extension: '.fna', description: 'Nucleotide FASTA file of the input contig sequences.' },
                    { extension: '.faa', description: 'Protein FASTA file of the translated CDS sequences.' },
                    { extension: '.ffn', description: 'Nucleotide FASTA file of all the prediction transcripts (CDS, rRNA, tRNA, tmRNA, misc_RNA)' },
                    { extension: '.sqn', description: 'An ASN1 format "Sequin" file for submission to Genbank. It needs to be edited to set the correct taxonomy, authors, related publication etc.' },
                    { extension: '.fsa', description: 'Nucleotide FASTA file of the input contig sequences, used by "tbl2asn" to create the .sqn file. It is mostly the same as the .fna file, but with extra Sequin tags in the sequence description lines.' },
                    { extension: '.tbl', description: 'Feature Table file, used by "tbl2asn" to create the .sqn file.' },
                    { extension: '.err', description: 'Unacceptable annotations - the NCBI discrepancy report.' },
                    { extension: '.log', description: 'Contains all the output that Prokka produced during its run. This is a record of what settings you used, even if the --quiet option was enabled.' },
                    { extension: '.txt', description: 'Statistics relating to the annotated features found.' },
                    { extension: '.tsv', description: 'Tab-separated file of all features: locus_tag,ftype,len_bp,gene,EC_number,COG,product' },
                ],
                files: [],
                title: '',
                result: '',
            }
        },
        created(){
            this.list_files()
        },
        methods: {
            
            async list_files(){
                try {
                    let res = await this.$axios.post('/files/list', {user_id: this.$store.state.usuario._id, type: 'uploaded' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async run_prokka(){
                try {
                    this.show = true
                    let res = await this.$axios.post('/tools/prokka', this.input)
                    this.result = res.data.result
                    this.title = res.data.message
                    this.show = false
                    this.show_result = true
                } catch (error) {
                    console.log(error)
                }
            },

            async download_file(){
               try {
                    await this.$axios.get(`/files/download/${this.result}`, {responseType: 'blob'}).
                    then(res => {
                        if (!window.navigator.msSaveOrOpenBlob){
                        // BLOB NAVIGATOR
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `${this.input.project_name}.zip`);
                            document.body.appendChild(link);
                            link.click();
                        }else{
                            // BLOB FOR EXPLORER 11
                            const url = window.navigator.msSaveOrOpenBlob(new Blob([res.data]),`${filename}`);
                        }
                    })
                } catch (error) {
                    console.log(error)
                } 
            },

            formatter(value) {
                return value.replace(/\s+/g,"_");
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>