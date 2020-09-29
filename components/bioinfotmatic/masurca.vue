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
                        <b-badge to="/storage" variant="primary"> or upload files</b-badge>
                    </b-form-group>

                    <b-form-group label="File with reverse reads." description="FASTQ file of second short reads in each pair">
                        <b-form-select v-model="input.fq2">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                        <b-badge to="/storage" variant="primary"> or upload files</b-badge>
                    </b-form-group>
                    <b-row>
                        <b-col cols="6">
                            <b-form-group  label="Fragment mean" description = "">
                                <b-form-spinbutton v-model="input.mean" min="100" max="500"></b-form-spinbutton>
                            </b-form-group> 
                        </b-col>
                        <b-col cols="6">
                            <b-form-group  label="Fragment stdev">
                                <b-form-spinbutton v-model="input.stdev" min="10" max="100"></b-form-spinbutton>
                            </b-form-group>
                        </b-col>
                    </b-row>                   

                    <b-form-group  description= "The mean and stdev parameters are the library insert average length and standard deviation. If the standard deviation is not known, set it to approximately 15% of the mean.">
                    </b-form-group>              

                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_masurca">Run MaSuRCA</b-button>    
                </b-col>
                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                     <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                        <b-card-text>
                            <h3>{{title}}</h3>
                            <hr>
                            <div v-if="success">

                            </div>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing MaSuRCA<br>Please wait...</b></p>
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
                    name: 'MrCA',
                    fq1: null,
                    fq2: null,
                    mean: '300',
                    stdev: '50',
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