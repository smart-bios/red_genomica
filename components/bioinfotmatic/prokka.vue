<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
            <b-card-text>
                <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                    {{mensaje.text}}
                </b-alert>
                <b-row>
                    <b-col sm="12" md= "12" lg="3">
                        <b-form-group label="Project name">
                            <b-form-input  v-model="input.name" placeholder="Enter your project name" lazy-formatter :formatter="formatter" size="sm"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Assembly to annotate " description="FASTA format">
                            <b-form-select v-model="input.fasta_file" size="sm">
                                <b-form-select-option :value="null">Please select a fasta file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                            <b-badge to="/storage" variant="primary">Upload files</b-badge>
                        </b-form-group>

                        <b-form-group label="Locus tag prefix">
                            <b-form-input v-model="input.locustag" lazy-formatter :formatter="formatter" size="sm"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Kingdom">
                            <b-form-radio-group
                                v-model="input.kingdom"
                                :options="options"
                                name="radio-inline"
                                size="sm"
                            ></b-form-radio-group>
                        </b-form-group>

                        <b-form-group label="Organism details">
                            <b-form-text>Genus name.</b-form-text>
                            <b-form-input v-model="input.genus" size="sm"></b-form-input>
                            <b-form-text >Species name.</b-form-text>
                            <b-form-input v-model="input.species" size="sm"></b-form-input>
                            <b-form-text >Strain name.</b-form-text>
                            <b-form-input v-model="input.strain" size="sm"></b-form-input>
                            <b-form-text >Plasmid name or identifier.</b-form-text>
                            <b-form-input v-model="input.plasmid" size="sm"></b-form-input>
                        </b-form-group>
                        <hr>
                        <b-button variant="secondary" size="sm" @click="run_prokka">Run PROKKA</b-button>
                    </b-col>

                    <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                        <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                            <b-card-text>
                                <h3>{{title}}</h3>
                                <hr>                          
                                <div v-if="status == 'success'">
                                    <b-card title=" Summary PROKKA">
                                        <b-card-text>
                                            <div v-for="(item, index) in report" :key="index">
                                                {{item}}
                                            </div>
                                        </b-card-text>
                                    </b-card> 
                                    <b-btn variant="secondary" size="sm" @click="download_file" class="my-2">Download Results</b-btn>
                                    <b-table striped hover :items="items"></b-table>
                                </div>
                            </b-card-text>
                         </b-card>
                    </b-col>
                </b-row>       
            </b-card-text>
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p class="text-center"><b>Runing Prokka<br>Please wait...</b></p>
                </div>
            </template>
        </b-overlay>                
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show: false,
                show_result: false,
                input: {
                    name: 'PROK01',
                    fasta_file: null,
                    locustag: 'example',
                    kingdom: 'Bacteria',
                    genus: 'genus',
                    species: 'species',
                    strain: 'strain',
                    plasmid: '',
                    user: {
                        id: `${this.$store.state.usuario._id}`,
                        name: `${this.$store.state.usuario.username}`,
                        email: `${this.$store.state.usuario.email}`
                    }
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
                options: [
                    { text: 'Archaea', value: 'Archaea' },
                    { text: 'Bacteria', value: 'Bacteria' },
                    { text: 'Mitochondria', value: 'Mitochondria'},
                    { text: 'Viruses', value: 'Viruses'}
                ],
                files: [],
                status: '',
                title: '',
                result: '',
                mensaje: {
                    color: '',
                    text: ''
                }, 
                dismissSecs: 5,
                dismissCountDown: 0
            }
        },
        created(){
            this.list_files()
        },
        methods: {
            
            async list_files(){
                try {
                    let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, category: 'fasta' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async run_prokka(){
                if(this.input.fasta_file != null){
                    try {
                        this.show = true
                        this.show_result = false
                        let res = await this.$axios.post('/tools/prokka', this.input)
                        this.title = res.data.message
                        this.status = res.data.status
                        if(res.data.status == 'success'){
                            this.result = res.data.result
                            this.report = res.data.report
                        }
                        this.show = false
                        this.show_result = true                            
                    } catch (error) {
                         console.log(error)
                    }
                }else{
                    
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select fasta file'
                    this.showAlert()
                }
            },

            async download_file(){
               try {
                    await this.$axios.get(`/storage/download/${this.result}`, {responseType: 'blob'}).
                    then(res => {
                        if (!window.navigator.msSaveOrOpenBlob){
                        // BLOB NAVIGATOR
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `${this.input.name}.zip`);
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
            },

            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },

            showAlert() {
                this.dismissCountDown = this.dismissSecs
            }
        }
    }
</script>

<style scoped>

.panel-2{
    background-color:whitesmoke;
}

</style>