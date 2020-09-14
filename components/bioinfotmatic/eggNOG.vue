<template>
    <div>
            <b-overlay :show="show" rounded="sm" >
            <b-card-text>
                <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="mensaje.color"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                >
                    {{mensaje.text}}
                </b-alert>
                <b-row>
                    <b-col sm="12" md= "12" lg="3">
                        <b-form-group label="Project name">
                            <b-form-input  v-model="input.name" placeholder="Enter your project name" lazy-formatter :formatter="formatter"></b-form-input>
                        </b-form-group>

                        <b-form-group label ="File*" description="Max. 100,000 CDS/protein sequences in FASTA format">
                            <b-form-select v-model="input.fasta">
                                <b-form-select-option :value="null">Please select a file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                            <b-badge to="/storage" variant="primary">Upload files</b-badge>
                        </b-form-group>

                        <b-form-group label="Tipo de secuencias">
                                  <b-form-radio-group v-model="input.translate" :options="options" name="radio-options"></b-form-radio-group>
                        </b-form-group>
                       
                        <b-form-group label ="Taxonomic Scope" description="annotations will only be transferred from orthologs in the selected taxa group">
                            <b-form-select v-model="input.tax_scope" :options="taxonomy"></b-form-select>
                        </b-form-group>

                        <b-form-group label ="Orthology restrictions" description="defines what type of orthologs should be used for functional transfer">
                            <b-form-select v-model="input.ortho" :options="orthology"></b-form-select>
                        </b-form-group>

                        <hr>
                        <b-button variant="secondary" size="sm" @click="run_eggnog">Run eggNOG</b-button>
                    </b-col>
                    <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                        <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                            <b-card-text>
                                <h3>{{title}}</h3>
                                <hr>

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
            input:{
                name: 'eggNOG',
                fasta: null,
                translate: false,
                tax_scope: 'auto',
                ortho: 'all',
                user: `${this.$store.state.usuario._id}`
            },
            taxonomy: [
                {value: 'auto', text: 'Auto adjust per query (RECOMMENDED)'},
                {value: '2', text: 'Bacteria'},
                {value: '2759', text: 'Eukaryota'},
                {value: '33090', text: 'Viridiplantae'},
                {value: '4751', text: 'Fungi'},
                {value: '10239', text: 'Viruses'}
            ],
            orthology:[
                {value:'all', text: 'Transfer annotations from any ortholog'},
                {value:'one2one', text: 'Transfer annotations from one-to-one orthology only'}
            ],
            options: [
                { text: 'Poteins sequences', value: false },
                { text: 'CDS sequences', value: true }
            ],
            files:[],
            title: '',
            result: '',
            status: '',
            annotations: '',
            orthologos: '',
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
                let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, category: 'fasta'})
                this.files = res.data.files
            } catch (error) {
                console.log(error)
            }
        },

        async run_eggnog(){
            if(this.input.fasta != null){
                try {
                    this.show = true
                    this.show_result = false
                    let res = await this.$axios.post('/tools/eggNOG', this.input)
                    console.log(res.data)
                    this.result = res.data.report,
                    this.status = res.data.status
                    this.title  =res.data.message
                    this.annotations = res.data.annotations
                    this.orthologos = res.data.orthologs                    
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