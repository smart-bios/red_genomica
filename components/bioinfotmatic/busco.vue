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
                            <b-form-input  v-model="input.name" lazy-formatter :formatter="formatter" size="sm"></b-form-input>
                        </b-form-group>

                        <b-form-group label ="File*" description="Sequences in FASTA format">
                            <b-form-select v-model="input.fasta" size="sm">
                                <b-form-select-option :value="null">Please select a file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                            <b-badge to="/storage" variant="primary">Upload files</b-badge>
                        </b-form-group>

                        <b-form-group label="Specify which BUSCO analysis mode to run">
                            <b-form-radio-group
                                v-model="input.mode"
                                :options="options"
                                stacked
                                size="sm"
                            ></b-form-radio-group>
                        </b-form-group>

                        <b-form-group label="Lineage Dataset" description="Specify the name of the BUSCO lineage to be used">
                            <b-form-select v-model="input.lineage" :options="lineages" size="sm"></b-form-select>
                        </b-form-group>

                        <hr>
                        <b-button variant="secondary" size="sm" @click="run_busco">Run BUSCO</b-button>
                    </b-col>
                    <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                        <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                            <b-card-text>
                                <h3>{{title}}</h3>
                                <hr>
                                <div v-if="status == 'success'">
                                    <b-btn variant="secondary" size="sm" @click="download_file" class="my-2">Download Full Results</b-btn>
                                    <b-card title="SUMMARY BUSCO">
                                            <b-card-text>
                                                <div v-for="(item, index) in report" :key="index">
                                                    {{item}}
                                                </div>
                                            </b-card-text>
                                    </b-card> 
                                </div>
                            </b-card-text>
                         </b-card>
                    </b-col>
                </b-row>            
            </b-card-text>
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p class="text-center"><b>Runing BUSCO<br>Please wait...</b></p>
                </div>
            </template>
            </b-overlay>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                show: false,
                show_result: false,
                input:{
                    name: 'BUSCO01',
                    fasta: null,
                    mode: 'genome',
                    lineage: null,
                    user: {
                        id: `${this.$store.state.usuario._id}`,
                        name: `${this.$store.state.usuario.username}`,
                        email: `${this.$store.state.usuario.email}`
                    }
                },
                options: [
                    { text: 'Genome, for genome assemblies', value: 'genome' },
                    { text: 'Transcriptome, for transcriptome assemblies', value: 'transcriptome' },
                    { text: 'Proteins, for annotated gene sets', value: 'proteins' }
                ],
                lineages: [
                    { value: null, text: 'Please select a linage' },
                    { value: 'bacteria_odb10', text: 'Bacteria' },
                    { value: 'embryophyta_odb10', text: 'Embryophyta'},
                    { value: 'pseudomonadales_odb10', text: 'Pseudomonadales'},
                    { value: 'nematoda_odb10', text: 'Nematoda'},
                    { value: 'solanales_odb10', text: 'Solanales'},
                    { value: 'viridiplantae_odb10', text: 'Viridiplantae'},
                ],

                files:[],
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

        methods:{

            async list_files(){
                try {
                    let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, category: 'fasta'})
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async run_busco(){
                if(this.input.fasta == null || this.input.lineage == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select fasta file or lineage'
                    this.showAlert()
                }else{
                    this.show = true
                    this.show_result = false
                    let res = await this.$axios.post('/tools/busco', this.input);
                    this.title = res.data.message
                    this.status = res.data.status
                    
                    if(res.data.status == 'success'){
                         this.report = res.data.report
                        this.result = res.data.result
                    }
                   
                    this.show = false
                    this.show_result = true
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
