<template>
    <b-container class="mt-3">
        <h2>Simple Sequence Repeats (SSRs)</h2>
        <hr>
        <b-overlay :show="show" rounded="sm" >
            <b-card>
                <b-card-text>
                    <p>PERF is a package developed for fast and accurate identification of microsatellites from DNA sequences. They are present in all genomes, and have a wide range of uses and functional roles.</p>
                     <b-card class="mb-3">
                        <b-card-text>
                            <i>Akshay Kumar Avvaru, Divya Tej Sowpati, Rakesh Kumar Mishra</i>, <b>PERF: an exhaustive algorithm for ultra-fast and efficient identification of microsatellites from large DNA sequences</b>, Bioinformatics, Volume 34, Issue 6, 15 March 2018, Pages 943–948 <a href="https://doi.org/10.1093/bioinformatics/btx721" target="_blank">https://doi.org/10.1093/bioinformatics/btx721</a>
                        </b-card-text>
                    </b-card>

                    <b-form-group label="Enter one or more queries the text box or use the browse button to upload a file from your local disk. The file may contain a single sequence or a list of sequences. In both cases, the data must be in FASTA format.">
                        <b-form-textarea rows="8" v-model="input.seq" style="font-size: 10pt"></b-form-textarea>
                        <b-form-file v-model="input.file" accept=".fasta, .fna, .fnn, .fa" class="mt-1 mb-3" plain></b-form-file>
                    </b-form-group>                    
                    <p>Minimum number of repeating units to be considered.</p>
                    <b-row>
                            <b-col sm="3" md= "2" lg="2">
                                <b-form-group  label="Mono">
                                    <b-form-spinbutton v-model="input.mono" min="12" max="20" size="sm"></b-form-spinbutton>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3" md= "2" lg="2">
                                <b-form-group  label="Di">
                                    <b-form-spinbutton v-model="input.di" min="6" max="20" size="sm"></b-form-spinbutton>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3" md= "2" lg="2">
                                <b-form-group  label="Tri">
                                    <b-form-spinbutton v-model="input.tri" min="4" max="20" size="sm"></b-form-spinbutton>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3" md= "2" lg="2">
                                <b-form-group  label="Tetra">
                                    <b-form-spinbutton v-model="input.tetra" min="3" max="20" size="sm"></b-form-spinbutton>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3" md= "2" lg="2">
                                <b-form-group  label="Penta">
                                    <b-form-spinbutton v-model="input.penta" min="2" max="20" size="sm"></b-form-spinbutton>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3" md= "2" lg="2">
                                <b-form-group  label="Hexa">
                                    <b-form-spinbutton v-model="input.hexa" min="2" max="20" size="sm"></b-form-spinbutton>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    <b-button variant="secondary" size="sm" @click="run_perf" class="mb-2">Run PERF</b-button>
                    <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                        {{mensaje.text}}
                    </b-alert>
                    <hr>
                    <b-card header="Result" :header-bg-variant="status" header-text-variant="white"  v-if="show_result">
                        <b-card-text>
                            <b-button variant="info" @click="download_file(report,'report_perf.tsv' )" >Download table</b-button>
                            <b-button variant="info" @click="download_file(html, 'report_perf.html')" >Download Full Report</b-button>
                            <hr>
                            <b-table
                                id="my-table"
                                :items="result"
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
                        </b-card-text>
                    </b-card>
                </b-card-text>
            </b-card>
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p class="text-center"><b>Searching<br>Please wait...</b></p>
                </div>
            </template>
        </b-overlay> 

        

        
    </b-container>
</template>

<script>
    export default {
        data(){
            return {
                show:false,
                show_result: false,
                input:{
                    seq : null,
                    file: null,
                    mono: 12,
                    di: 6,
                    tri: 4,
                    tetra: 3,
                    penta: 2,
                    hexa:2
                },
                status: '',
                result: [],
                report: '',
                html: '',
                mensaje: {
                    color: '',
                    text: ''
                },
                perPage: 15,
                currentPage: 1,
                dismissSecs: 5,
                dismissCountDown: 0
            }
        },
        computed: {
            rows() {
                return this.result.length
            }
        },

        methods: {

            async run_perf(){
                if(this.input.seq == null && this.input.file == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Faltan secuencias que analisar'
                    this.showAlert()
                }else{
                    try {
                        this.show = true
                        this.show_result = false
                        if(this.input.file != null){
                            let formData = new FormData;
                            formData.append('file',this.input.file)
                            formData.append('mono',this.input.mono)
                            formData.append('di',this.input.di)
                            formData.append('tri',this.input.tri)
                            formData.append('tetra',this.input.tetra)
                            formData.append('penta',this.input.penta)
                            formData.append('hexa',this.input.hexa)

                            let res = await this.$axios.post('/tools/ssr', formData)
                            this.show = false
                            this.show_result = true
                            this.status = res.data.status
                            this.result = res.data.report
                            this.report = res.data.tsv
                            this.html = res.data.html
                            this.clear()
                            console.log(res.data)
                        }else{
                            let res = await this.$axios.post('/tools/ssr', this.input)
                            console.log(res.data)
                            this.show = false
                            this.show_result = true
                            this.status = res.data.status
                            this.result = res.data.report
                            this.report = res.data.tsv
                            this.html = res.data.html
                            this.clear()
                        }                 
                    } catch (error) {
                        console.log(error)
                    }
                }
            },

            async download_file(reporte, filename){
                try {

                    let res = await this.$axios.post(`/storage/download_tmp/`, {report: reporte}, {responseType: 'blob'})
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

            clear() {
                this.input.file = null
                this.input.seq = null
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

<style lang="scss" scoped>

</style>