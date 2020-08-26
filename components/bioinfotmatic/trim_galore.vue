<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
        <b-card-text>
            <b-form-group
                description="Project name"
            >
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
                        description="FASTQ file of first short reads in each pair"
                    >
                        <b-form-select v-model="input.fq1">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>              
                </b-col>
                <b-col>
                    <b-form-group
                        label="File with reverse reads. "
                        description="FASTQ file of second short reads in each pair"
                    >
                        <b-form-select v-model="input.fq2">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>  
                </b-col>
                <b-col>
                    <b-form-group
                        label="Length required  "
                        description= "Discard reads that became shorter than length INT because of either
                        quality or adapter trimming."
                    >
                        <b-form-input id="prefix" v-model="input.length"></b-form-input>
                    </b-form-group>                    
                </b-col>
                <b-col>
                    <b-form-group
                        label="Qualified quality "
                        description= "Trim low-quality ends from reads in addition to adapter removal.."
                    >
                        <b-form-input id="prefix" v-model="input.quality"></b-form-input>
                    </b-form-group>                    
                </b-col>
            </b-row>
            <b-badge to="/storage" variant="primary">Upload files</b-badge>
            <hr>
            <b-button variant="secondary" size="sm" @click="run_trimgalore">Run Trim Galore</b-button>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing Trim Galore<br>Please wait...</b></p>
            </div>
        </template>
        </b-overlay>

        <hr>
     
        <b-card
            border-variant="light"
            header="Result"
            header-bg-variant="success"
            header-text-variant="white"
            v-if="show_result"
        >
            <b-card-text>
                <h3>{{title}}</h3>
                <hr>
                {{trim1}}
                {{trim2}}
<!--                 <b-btn pill variant="secondary" size="sm" @click="download_file">Downolad results</b-btn>    
 -->            </b-card-text>
        </b-card>
        

    </div>
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
                show_result: false,
                input: {
                    project_name: 'trim_01',
                    fq1: null,
                    fq2: null,
                    length: 20,
                    quality: 20,
                    user: `${this.$store.state.usuario.email}`,
                    user_id: `${this.$store.state.usuario._id}`
                },
                files: [],
                title: '',
                trim1: '',
                trim2: ''
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

            async run_trimgalore(){
                //console.log(this.input)
                try {
                    this.show = true
                    let res = await this.$axios.post('/tools/trim', this.input)
                    console.log(res.data)
                    this.title = res.data.message
                    this.trim1 = res.data.trim1
                    this.trim2 = res.data.trim2                   
                    this.show= false
                    this.show_result = true

                } catch (error) {
                    console.log(error)
                }
            },

            /* async download_file(){
               try {
                    await this.$axios.get(`/files/download/${this.result}`, {responseType: 'blob'}).
                    then(res => {
                        if (!window.navigator.msSaveOrOpenBlob){
                        // BLOB NAVIGATOR
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `${this.input.project_name}.zip`);
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
            }, */

            formatter(value) {
                return value.replace(/\s+/g,"_");
            },
        }        
    }
</script>