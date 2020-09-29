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

<!--                     <b-form-group>
                        <b-form-checkbox v-model="input.paired" name="check-button" switch>
                            Paired-end Sequencing
                        </b-form-checkbox>                      
                    </b-form-group> -->
   
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

                    <b-badge to="/storage" variant="primary" class="mb-2">Or upload files</b-badge>
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
                                description= "Trim low-quality ends from reads in addition to adapter removal."
                            >
                                <b-form-spinbutton v-model="input.quality" min="15" max="100" size="sm"></b-form-spinbutton>
                            </b-form-group>
                        </b-col>
                        <b-col sm="12" md="6" lg="6">
                            <b-form-group
                                label="Force-Trimming"
                                description= "This will trim the leftmost X bases "
                            >
                                <b-form-spinbutton v-model="input.ftl" min="0" max="100" size="sm"></b-form-spinbutton>
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
                                <b-button variant="info" size="sm" @click="download_file(tf1, `${input.name}_1_good.gz`)" >Download Forward Reads</b-button>
                                <b-button variant="info" size="sm" @click="download_file(tf2, `${input.name}_2_good.gz`)" >Download Reverde Reads</b-button>
                                <div class="py-3">
                                    <b-form-group  label="Log"> 
                                     <b-form-textarea v-model="log" rows="8" plaintext></b-form-textarea>
                                </b-form-group>
                                </div>                    
                            </div>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing BBDUK<br>Please wait...</b></p>
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
                    name: 'BBD01',
                    paired: true,
                    fq1: null,
                    fq2: null,
                    length: 35,
                    quality: 20,
                    ftl: 0,
                    user: `${this.$store.state.usuario._id}`
                },
                files: [],
                status: '',
                title: '',
                tf1 : '',
                tf2 : '',
                log: '',
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
                        let res = await this.$axios.post('/tools/bbduk', this.input)
                        console.log(res.data)
                        this.status = res.data.status
                        this.title = res.data.message
                        
                        if(res.data.status == 'success'){
                            this.log = res.data.result.log
                            this.tf1 = res.data.result.trim1
                            this.tf2= res.data.result.trim2
                        }                     

                        this.show= false
                        this.show_result = true
                        this.list_files()

                    } catch (error) {
                        console.log(error)
                    }   
                }
                
            },

            async download_file(fastq, filename){
                try {
                    console.log('FASTQ,', fastq)
                    let res = await this.$axios.get(`/storage/download/${fastq}`, {responseType: 'blob'})
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