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

                        <b-form-group label="Specify how to work of SSRMMD">
                            <b-form-radio v-model="input.poly" value="0" size="sm">only mining perfect SSR loci</b-form-radio>
                            <b-form-radio v-model="input.poly" value="1" disabled size="sm"> further mining polymorphic SSRs</b-form-radio>
                        </b-form-group>

                        <b-form-group label ="File fasta 1 *" description="FASTA file for mining SSR loci">
                            <b-form-select v-model="input.f1" size="sm">
                                <b-form-select-option :value="null">Please sequence file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                        </b-form-group>

                        <b-form-group label ="File fasta 2" description="if further mining polymorphic SSRs, option 'fasta 2' must be provided" v-if="input.poly == 1">
                            <b-form-select v-model="input.f2" size="sm">
                                <b-form-select-option :value="null">Please sequence file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                        </b-form-group>

                        <b-form-group label= "Threshold of motif" description='length of motif = the minimum number of repeat'>
                                <b-form-input v-model="input.motif" size="sm"></b-form-input>
                        </b-form-group>
                        <b-row>
                            <b-col>
                                <b-form-group label= "minLen" description='minimum length of SSR.'>
                                    <b-form-input v-model="input.minLen" size="sm"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label= "maxLen" description='maximum length of SSR.'>
                                    <b-form-input v-model="input.maxLen" size="sm"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label= "length" description='length of SSR flanking sequences.'>
                                    <b-form-input v-model="input.length" size="sm"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-badge to="/storage" variant="primary">Upload files</b-badge>
                        <hr>
                        <b-button variant="secondary" size="sm" @click="run_ssrmmd">Run SSRMMD</b-button>
                    </b-col>
                
                    <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                        <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                            <b-card-text>
                                <h3>{{title}}</h3>
                                <hr>
                                <div v-if="status == 'success'">
                                    <b-button variant="info" @click="download_file(ssr,`${input.name}_SSRs.tsv`)" >Download SSRs</b-button>
                                    <b-button variant="info" @click="download_file(stat, `${input.name}_stat.txt`)" >Download Stat Report</b-button>
                                    <b-button variant="info" @click="download_file(primers, `${input.name}_primers.tsv`)" >Download Primers</b-button>
                                    <b-table
                                        id="my-table"
                                        :items="result"
                                        :per-page="perPage"
                                        :current-page="currentPage"
                                        responsive
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
                        <p class="text-center"><b>Runing SSRMMD<br>Please wait...</b></p>
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
                    name: 'SSR_example',
                    f1: null,
                    f2: null,
                    poly: 0,
                    motif: '1=10, 2=7, 3=6, 4=5, 5=4, 6=4',
                    minLen: 12,
                    maxLen: 50,
                    length: 100,
                    user: `${this.$store.state.usuario._id}`
                },
                files:[],
                result:'',
                ssr: '',
                stat: '',
                primers: '',
                status:'',
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
                return this.result.length
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

            async run_ssrmmd(){
                if(this.input.f1 == null){
                    this.mensaje.color = 'danger'
                    this.mensaje.text = 'Select file'
                    this.showAlert()
                }else{
                    try {
                        this.show = true
                        this.show_result = false
                        let res = await this.$axios.post('/tools/SSRMMD', this.input)
                        this.status = res.data.status
                        this.title = res.data.message                        
                        if(res.data.status == 'success'){
                            this.result = res.data.report
                            this.ssr = res.data.result
                            this.stat = res.data.stat
                            this.primers = res.data.primers
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