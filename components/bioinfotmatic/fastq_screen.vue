<template>
    <b-overlay :show="show" rounded="sm" >
        <b-card-text>
            <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                    {{mensaje.text}}
            </b-alert>
            <b-row>
                <b-col sm="12" md= "12" lg="3">
                    <b-form-group label="Project name">
                        <b-form-input v-model="input.name" placeholder="Enter your project name" lazy-formatter :formatter="formatter" size="sm">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Fastq sequence" description="Fatq file format">
                        <b-form-select v-model="input.fq" size="sm">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                        <b-badge to="/storage" variant="primary">Upload files</b-badge>
                    </b-form-group>

                    <b-form-group>
                        <b-dropdown 
                            id="dropdown-1" 
                            text="Sequence databases"
                            split
                            split-variant="outline-primary"
                            variant="primary"
                            size="sm"
                        >
                            <b-dropdown-form>
                                <b-form-group label="Databases">
                                    <b-form-checkbox-group
                                        v-model="input.databases"
                                        :options="options"
                                        stacked
                                    ></b-form-checkbox-group>
                                </b-form-group>
                            </b-dropdown-form>
                        </b-dropdown>
                    </b-form-group>
                    <div class="mt-3">Selected: <strong>{{ input.databases }}</strong></div>
                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_fq_screen" disabled>Run FastQ Screem</b-button>                 
                </b-col>

                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                    <b-alert show>En desarrollo</b-alert>

                    <b-card header="Result" header-bg-variant="success" header-text-variant="white" v-if="show_result">
                        <b-card-text>

                        </b-card-text>
                    </b-card> 
                </b-col>
            </b-row>           
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing Unicycler<br>Please wait...</b></p>
            </div>
        </template>
    </b-overlay>
</template>

<script>
    export default {   
        data(){
            return {
                show: false,
                show_result: false,
                show_main: true,
                input: {
                    name: 'FQS01',
                    fq: null,
                    databases: ['adapters','vectors'],
                    user: `${this.$store.state.usuario._id}`
                },
                options: [
                    { text: 'Adapters', value: 'adapters' },
                    { text: 'Vectors', value: 'vectors' },
                    { text: 'Viral', value: 'viral' },
                    { text: 'Plasmid', value: 'plasmid' },
                    { text: 'Fungi', value: 'fungi' }

                    ],
                files: [],
                selected: [],
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
            //console.log(`iduser: ${this.$store.state.usuario._id}`)
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

            async run_fq_screen(){
                console.log(this.input)
                try {
                    this.show = true
                    let res = await this.$axios.post('/tools/fq_screen', this.input)
                    this.result = res.data
                    this.show = false
                    this.show_main = false
                    //this.show_result = true
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