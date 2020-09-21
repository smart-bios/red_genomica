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
                        <b-form-input v-model="input.name" lazy-formatter :formatter="formatter"></b-form-input>
                    </b-form-group>

                    <b-form-group>
                        <b-form-checkbox v-model="input.paired" name="check-button" switch>
                            Paired-end Sequencing
                        </b-form-checkbox>                      
                    </b-form-group>
   
                    <b-form-group label="File with forward reads." description="FASTQ file of first short reads in each pair">
                        <b-form-select v-model="input.fq1">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="File with reverse reads." description="FASTQ file of second short reads in each pair">
                        <b-form-select v-model="input.fq2" :disabled="!input.paired">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-badge to="/storage" variant="primary" class="mb-2">Upload files</b-badge>
                    <b-row>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group
                                label="Length required"
                                description= "Reads shorter than length_required will be discarded"
                            >
                                <b-form-spinbutton v-model="input.length" min="15" max="100"></b-form-spinbutton>
                                <!-- <b-form-input v-model="input.length"></b-form-input> -->
                            </b-form-group> 
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group
                                label="Qualified quality "
                                description= "The quality value that a base is qualified."
                            >
                                <b-form-spinbutton v-model="input.quality" min="15" max="100"></b-form-spinbutton>
                                <!-- <b-form-input v-model="input.quality"></b-form-input> -->
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_trimgalore">Run Fastp</b-button>
                </b-col>

                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                    <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">            
                        <b-card-text>
                            <h3>{{title}}</h3>
                            <hr>
                            <div v-if="status == 'success'">
                                <b-alert show>Los archivos generados estan disponbles para los siguientes análisis.</b-alert>
                                {{result}}
                            </div>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing Fastp<br>Please wait...</b></p>
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
                    name: 'FP01',
                    paired: true,
                    fq1: null,
                    fq2: null,
                    length: 30,
                    quality: 20,
                    user: `${this.$store.state.usuario._id}`
                },
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
                        console.log('RUNN FASTP')
                        let res = await this.$axios.post('/tools/fastp', this.input)
                        this.status = res.data.status
                        this.title = res.data.message
                        if(res.data.status == 'success'){
                            this.result = res.data.result
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