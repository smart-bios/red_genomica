<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
            <b-card-text>
                <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                    {{mensaje.text}}
                </b-alert>
                <b-row>
                <b-col sm="12" md= "12" lg="3">
                    <b-form-group label ="File*" description="Input file format. Default: fasta, Permissible: fasta, fastq">
                        <b-form-select v-model="input.fasta" size="sm">
                            <b-form-select-option :value="null">Please sequence file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-row>
                        <b-col cols="4">
                            <b-form-group description= "Minimum size of a repeat motif in bp">
                                <b-form-input v-model="input.minimum" size="sm"></b-form-input>
                            </b-form-group>
                        </b-col>
                         <b-col cols="4">
                            <b-form-group description= "Maximum size of a repeat motif in bp">
                                <b-form-input v-model="input.maximum" size="sm"></b-form-input>
                            </b-form-group>
                        </b-col>
                         <b-col cols="4">
                            <b-form-group description= "Minimum length cutoff of repeat">
                                <b-form-input v-model="input.length" size="sm"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-badge to="/storage" variant="primary">Upload files</b-badge>
                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_perf" disabled>Run PERF</b-button>
                </b-col>
                
                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                    <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                        <b-card-text>
                            <h3>{{title}}</h3>
                            <hr>
                            <div v-if="status == 'success'">
                                <b-button variant="success" @click="download_file(tsv,'report_perf.tsv' )" >Download table</b-button>
                                <b-button variant="info" @click="download_file(html, 'report_perf.html')" >Download Full Report</b-button>
                                                    
                                <b-table
                                    id="my-table"
                                    :items="resultado"
                                    :per-page="perPage"
                                    :current-page="currentPage"
                                    small
                                ></b-table>
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="rows"
                                    :per-page="perPage"
                                    aria-controls="my-table"
                                ></b-pagination>
                            </div>
                        </b-card-text>
                    </b-card> 
                </b-col>
            </b-row>
            </b-card-text>
            <template v-slot:overlay>
                    <div class="text-center">
                        <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                        <p class="text-center"><b>Runing PERF<br>Please wait...</b></p>
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
                    fasta: null,
                    minimum:'2',
                    maximum:'6',
                    length: '12',
                    user: `${this.$store.state.usuario._id}`
                },
                files:[],
                resultado: [],
                status: '',
                html:'',
                tsv: '',
                perPage: 15,
                currentPage: 1,
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

        computed: {
            rows() {
                return this.resultado.length
            }
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

            async run_perf(){
                if(this.input.fasta == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select file'
                    this.showAlert()
                }else{
                    try {
                        this.show = true
                        this.show_result = false
                        let res = await this.$axios.post('/tools/perf', this.input);
                        this.title = res.data.message
                        this.status = res.data.status
                        
                        if(res.data.status == 'success'){
                            this.resultado = res.data.result.report
                            this.html = res.data.result.html
                            this.tsv = res.data.result.tsv
                        }
                        this.show = false
                        this.show_result = true
                                            
                    } catch (error) {
                        console.log(error)
                    }
                }
            },

            async download_file(reporte, filename){
                try {

                    let res = await this.$axios.post(`/storage/download/`, {report: reporte}, {responseType: 'blob'})
                    console.log(res)
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                                        
                } catch (error) {
                     console.log(error)
                }
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