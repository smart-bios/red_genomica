<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
        <b-card-text>
            <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                    {{mensaje.text}}
            </b-alert>
            <b-row>
                <b-col sm="12" md= "12" lg="3">
                    <b-form-group label="Basename">
                        <b-form-input v-model="input.name" lazy-formatter :formatter="formatter" size="sm"></b-form-input>
                    </b-form-group>

                    <b-form-group>
                        <b-form-checkbox v-model="input.paired" name="check-button" size="sm" switch>
                            Paired-end Sequencing
                        </b-form-checkbox>                      
                    </b-form-group>
   
                    <b-form-group label="File with forward reads." description="FASTQ file of first short reads in each pair">
                        <b-form-select v-model="input.fq1" size="sm">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="File with reverse reads." description="FASTQ file of second short reads in each pair">
                        <b-form-select v-model="input.fq2" :disabled="!input.paired" size="sm">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-badge to="/storage" variant="primary" class="mb-2">Upload files</b-badge>
                    <b-row>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group
                                label="Length required"
                                description= "Discard reads that became shorter than length INT because of either quality or adapter trimming."
                            >
                                <b-form-spinbutton v-model="input.length" min="15" max="100" size="sm"></b-form-spinbutton>
                            </b-form-group> 
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group
                                label="Qualified quality "
                                description= "Trim low-quality ends from reads in addition to adapter removal.."
                            >
                                <b-form-spinbutton v-model="input.quality" min="15" max="100" size="sm"></b-form-spinbutton>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_trimgalore">Run Trim Galore</b-button>
                </b-col>

                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                    <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">            
                        <b-card-text>
                            <h3>{{title}}</h3>
                            <hr>
                            <div v-if="status == 'success'">
                                <b-alert show>Los archivos generados estan disponbles para los siguientes análisis.</b-alert>
                                <b-row>
                                    <b-col sm="12" md="6" lg="6">
                                        <b-card :title="reportfq1.filename" sub-title="trim result">
                                            <b-card-text>
                                                <div v-for="(item, index) in reportfq1.report" :key="index">
                                                    {{item}}
                                                </div>
                                            </b-card-text>
                                            <b-button-group>
                                                <b-button variant="success" size="sm" @click="download_file(reportfq1.path, reportfq1.filename)" >Download Reads</b-button>
                                                <b-button variant="info" size="sm" @click="download_file(reportfq1.path_report,'report_trimgalorefq1.txt')" >Download Full Report</b-button>
                                            </b-button-group>
                                        </b-card>                               
                                    </b-col>
                                    <b-col sm="12" md="6" lg="6">
                                    <b-card :title="reportfq2.filename" sub-title="trim result" v-if="input.paired">
                                            <b-card-text>
                                                <div v-for="(item, index) in reportfq2.report" :key="index">
                                                    {{item}}
                                                </div>
                                            </b-card-text>
                                            <b-button-group>
                                                <b-button variant="success" size="sm" @click="download_file(reportfq2.path, reportfq1.filename)" >Download Reads</b-button>
                                                <b-button variant="info" size="sm" @click="download_file(reportfq2.path_report,'report_trimgalorefq2.txt')" >Download Full Report</b-button>
                                            </b-button-group>
                                        </b-card>   
                                    </b-col>
                                </b-row>
                            </div>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing Trim Galore<br>Please wait...</b></p>
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
                    name: 'TG01',
                    paired: true,
                    fq1: null,
                    fq2: null,
                    length: 20,
                    quality: 20,
                    user: `${this.$store.state.usuario._id}`
                },
                files: [],
                status: '',
                title: '',
                reportfq1 : [],
                reportfq2 : [],
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
                    let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, category: 'fastq' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async run_trimgalore(){
                if(this.input.fq1 == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select file'
                    this.showAlert()
                }else{
                    try {
                        this.show = true
                        let res = await this.$axios.post('/tools/trimgalore', this.input)
                        this.status = res.data.status
                        this.title = res.data.message
                        if(res.data.status == 'success'){
                            this.reportfq1 = res.data.fq1
                             this.reportfq2= res.data.fq2 
                        }                              
                        this.show= false
                        this.show_result = true
                        this.list_files()

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