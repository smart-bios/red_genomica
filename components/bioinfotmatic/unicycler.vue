<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
        <b-card-text>

            <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                {{mensaje.text}}
            </b-alert>
            <b-row>
                <b-col sm="12" md= "12" lg="3">
                    <b-form-group label ="Project name">
                        <b-form-input v-model="input.name" placeholder="Enter your project name" lazy-formatter :formatter="formatter"></b-form-input>
                    </b-form-group>

                    <b-form-group label="File with forward reads." description="FASTQ file of first short reads in each pair">
                        <b-form-select v-model="input.fq1">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="File with reverse reads." description="FASTQ file of second short reads in each pair">
                        <b-form-select v-model="input.fq2">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
        
                    <b-form-group label="Bridging mode"  description= "(default: normal) moderate contig size and misassembly rate">
                        <b-form-select v-model="input.mode" :options="modes"></b-form-select>
                    </b-form-group>
                    
                    <b-form-group  label="Min fasta length"  description= "Exclude contigs which are shorter than this length (default: 500)">
                            <b-form-spinbutton v-model="input.length_fasta" min="200" max="1000"></b-form-spinbutton>
                    </b-form-group>                 

                    <b-badge to="/storage" variant="primary"> Upload files</b-badge>
                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_unicycler">Run Unicycler</b-button>    
                </b-col>
                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                     <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                        <b-card-text>
                            <h3>{{title}}</h3>
                            <hr>
                            <div v-if="success">
                                <p class="mt-2">Unicycler's most important output files are <b>assembly.gfa, assembly.fasta</b> and <b>unicycler.log</b>. These are produced by every Unicycler run. All files and directories are described in the table below. Intermediate output files (everything except for assembly.gfa, assembly.fasta and unicycler.log) will be prefixed with a number so they are in chronological order.</p>
                                
                                <b-alert show>{{input.name}}_assembly.fasta esta disponbles para su uso em los siguientes análisis.</b-alert>
                                
                                <b-btn variant="secondary" size="sm" @click="download_file" class="my-2">Download results</b-btn>

                                <b-table striped hover :items="items">
                                    <template v-slot:cell(html)="data">
                                        <span v-html="data.value"></span>
                                    </template>
                                </b-table>
                            </div>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing Unicycler<br>Please wait...</b></p>
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
                    name: 'UNC01',
                    fq1: null,
                    fq2: null,
                    mode: 'normal',
                    length_fasta: 500,
                    user: {
                        id: `${this.$store.state.usuario._id}`,
                        name: `${this.$store.state.usuario.username}`,
                        email: `${this.$store.state.usuario.email}`
                    }
                },
                files: [],
                status: '',
                title: '',
                success: true,
                result: '',
                items: [
                    { file: 'best_spades_graph.gfa', description: 'the best SPAdes short-read assembly graph, with a bit of graph clean-up' },
                    { file: 'overlaps_removed.gfa', description: 'overlap-free version of the SPAdes graph, with some more graph clean-up' },
                    { file: 'bridges_applied.gfa', description: 'bridges applied, before any cleaning or merging' },
                    { file: 'final_clean.gfa', description: 'more redundant contigs removed' },
                    { file: 'polished.gfa', description: 'after a round of Pilon polishing' },
                    { file: 'assembly.gfa', description: 'final assembly in GFA v1 graph format' },
                    { file: 'assembly.fasta', description: 'final assembly in FASTA format (same contigs as in assembly.gfa)' },
                    { file: 'unicycler.log', description: 'Unicycler log file' }
                ],
                modes: [
                    { value: 'conservative', text:'conservative'},
                    { value: 'normal', text:'normal'},
                    { value: 'bold', text:'bold'}
                ],
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
        methods:{
            async list_files(){
                try {
                    let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, type: 'uploaded', category: 'fastq' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async run_unicycler(){

                if(this.input.fq1 == null && this.input.fq2 == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select file'
                    this.showAlert()
                }else{
                    try {
                        this.show = true
                        let res = await this.$axios.post('/tools/unicycler', this.input)
                        if(res.data.status == 'danger'){
                            this.success = false
                        }else{
                            this.success = true
                        }
                        this.status = res.data.status
                        this.title = res.data.message
                        this.result = res.data.result
                        this.show = false
                        this.show_result = true
                        
                    } catch (error) {
                    
                    }
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