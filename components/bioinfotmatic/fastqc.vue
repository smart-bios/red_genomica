<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
            <b-card-text>
                <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                    {{mensaje.text}}
                </b-alert>
                <b-row>
                    <b-col sm="12" md= "12" lg="3">
                        <b-form-group label ="File*" description="FASTQ file format">
                            <b-form-select v-model="input.fq" size="sm">
                                <b-form-select-option :value="null">Please select a file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                        </b-form-group>

                        <b-badge to="/storage" variant="primary">Upload files</b-badge>
                        <hr>
                        <b-button variant="secondary" size="sm" @click="run_fastqc">Run Fastqc</b-button>
                    </b-col>
                    <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                        <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                            <b-card-text>
                                <h3>{{title}}</h3>
                                <hr>
                                <p>Una vez analiasadas las muestras podemos definir si deseamos descartar lecturas de mala calidad para trabajar sólo con aquellas que cumplen un cierto requisito de calidad mínima.</p>
                                <div v-if="status == 'success'">
                                    <b-btn variant="info" size="sm" @click="download_file">Download Full Report</b-btn>
                                    <b-row>
                                        <b-col sm="12" md="6">
                                            <b-table hover :items="basic" caption-top small>
                                                <template v-slot:table-caption>Basic Statistics</template>
                                            </b-table>
                                        </b-col>
                                        <b-col sm ="12" md="6">
                                            <b-table hover :tbody-tr-class="rowClass" :items="summary" :fields="fields" caption-top small>
                                                <template v-slot:table-caption>Summary.</template>
                                            </b-table>
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
                    <p class="text-center"><b>Runing Fastqc<br>Please wait...</b></p>
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
                    fq: null,
                    user: `${this.$store.state.usuario._id}`
                },
                fields: ['status','module'],
                files: [],
                status: '',
                title: '',
                report: '',
                result: '',
                summary: [],
                basic: [],
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
            async run_fastqc(){
                if(this.input.fq == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select file'
                    this.showAlert()

                }else{
                    try {
                        this.show = true
                        this.show_result = false
                        let res = await this.$axios.post('/tools/fastqc', this.input)
                        this.status = res.data.status
                        this.title = res.data.message
                        if(res.data.status == 'success'){
                            this.report = res.data.result.report
                            this.summary = res.data.result.summary
                            this.basic = res.data.result.basic
                        }   
                        
                        this.show = false
                        this.show_result = true
                    } catch (error) {
                        console.log(error)
                    }
                }             
            },

            async list_files(){
                try {
                    let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, category: 'fastq' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async download_file(){
                try {

                    let res = await this.$axios.post(`/storage/download/`, {report: this.report}, {responseType: 'blob'})
                    console.log(res)
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'fastqc_report.zip');
                    document.body.appendChild(link);
                    link.click();
                                        
                } catch (error) {
                     console.log(error)
                }
            },

            rowClass(item, type) {
                if (!item || type !== 'row') return
                if (item.status === 'PASS') return 'table-success'
                if (item.status === 'WARN') return 'table-warning'
                if (item.status === 'FAIL') return 'table-danger'
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