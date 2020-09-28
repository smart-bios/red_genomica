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

                        <b-form-group label="Genomic FASTA file">
                            <b-form-select v-model="input.fasta_file" size="sm">
                                <b-form-select-option :value="null">Please select a fasta file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                            <b-badge to="/storage" variant="primary">Upload files</b-badge>
                        </b-form-group>

                        <b-row>
                            <b-col>
                                <b-form-group label="Organism name">
                                    <b-form-input v-model="input.organism" lazy-formatter :formatter="formatter" size="sm"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Strain name">
                                    <b-form-input v-model="input.strain" size="sm"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-form-group label="Locus tag prefix">
                            <b-form-input v-model="input.locustag" lazy-formatter :formatter="formatter" size="sm"></b-form-input>
                        </b-form-group>

                        <hr>
                        <b-button variant="secondary" size="sm" @click="run_dfast">Run Dfast</b-button>
                    </b-col>

                    <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                        <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                            <b-card-text>
                                <h3>{{title}}</h3>
                                <hr>                          
                                <div v-if="status == 'success'">
                                    <b-card title=" Summary Dfast">
                                        <b-card-text>
                                            <hr>
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
                    <p class="text-center"><b>Runing Dfast<br>Please wait...</b></p>
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
                    name: 'Dfast',
                    fasta_file: null,
                    organism: 'Organism',
                    strain: 'strain',
                    locustag: 'Locus',
                    user: {
                        id: `${this.$store.state.usuario._id}`,
                        name: `${this.$store.state.usuario.username}`,
                        email: `${this.$store.state.usuario.email}`
                    }
                },
                files: [],
                status: '',
                title: '',
                result: '',
                report: '',
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

            async run_dfast(){
                if(this.input.fasta_file != null){
                    try {
                        this.show = true
                        this.show_result = false
                        let res = await this.$axios.post('/tools/dfast', this.input)
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