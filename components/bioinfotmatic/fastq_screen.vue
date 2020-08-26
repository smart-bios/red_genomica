<template>
    <b-overlay :show="show" rounded="sm" >
        <b-card-text>
            <b-form-group description="Project name">
                <b-form-input 
                    v-model="input.project_name" 
                    placeholder="Enter your project name"
                    lazy-formatter  
                    :formatter="formatter"
                ></b-form-input>
            </b-form-group>         
            <hr>
            Inputs
            <b-row>
                <b-col>
                    <b-form-group
                        label="File with forward reads. "
                        description="FASTQ file format"
                    >
                        <b-form-select v-model="input.fq">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-dropdown id="dropdown-1" text="Genome databases" class="m-md-2">
                        <b-dropdown-form>
                            <b-form-group label="adasf asfas">
                                <b-form-checkbox-group
                                    v-model="selected"
                                    :options="options"
                                    name="flavour-2a"
                                    stacked
                                ></b-form-checkbox-group>
                            </b-form-group>
                        </b-dropdown-form>
                    </b-dropdown>
                    <div>Selected: <strong>{{ selected }}</strong></div>  
                </b-col>
            </b-row>
            <b-badge to="/storage" variant="primary">Upload files</b-badge>
            <hr>
            <b-button variant="secondary" size="sm" @click="run_fq_screen">Run FastQ Screem</b-button>
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
import fileUpload from '@/components/FileUpload'
    export default {   
        components: {
            fileUpload
        },
        
        data(){
            return {
                show: false,
                //show_result: false,
                show_main: true,
                input: {
                    project_name: 'fqsreen_01',
                    fq: null,
                    user: `${this.$store.state.usuario.email}`,
                    user_id: `${this.$store.state.usuario._id}`
                },
                options: [
                    { text: 'Orange', value: 'orange' },
                    { text: 'Apple', value: 'apple' },
                    { text: 'Pineapple', value: 'pineapple' },
                    { text: 'Grape', value: 'grape' }
                    ],
                files: [],
                selected: [],
                result: ''
            }
        },

        created(){
            //console.log(`iduser: ${this.$store.state.usuario._id}`)
            this.list_files()
        },

        methods:{
            async list_files(){
                try {
                    let res = await this.$axios.post('/files/list', {user_id: this.$store.state.usuario._id, type: 'uploaded' })
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
            }
        }
        
    }
</script>