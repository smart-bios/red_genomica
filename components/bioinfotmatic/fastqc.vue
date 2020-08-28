<template>
    <div>
        <b-overlay :show="show" rounded="sm" >
            <b-card-text>
                <b-row>
                    <b-col>
                         <b-form-group description="Project name">
                            <b-form-input 
                                v-model="input.name" 
                                placeholder="Enter your project name"
                                lazy-formatter  
                                :formatter="formatter"
                            ></b-form-input>
                        </b-form-group>        
                    </b-col>
                    <b-col>
                        <b-form-group description="FASTQ file format">
                            <b-form-select v-model="input.fq">
                                <b-form-select-option :value="null">Please select a file</b-form-select-option>
                                <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-badge to="/storage" variant="primary">Upload files</b-badge>
                <hr>
                <b-button variant="secondary" size="sm" @click="run_fastqc">Run Fastqc</b-button>
            </b-card-text>
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p class="text-center"><b>Runing Fastqc<br>Please wait...</b></p>
                </div>
            </template>
        </b-overlay>     
        <hr>        
        <b-card
            border-variant="secondary"
            header="Result"
            header-bg-variant="info"
            header-text-variant="white"
            v-if="show_result"
        >
            <b-card-text>
                <h3>{{title}}</h3>
                <hr>
                <b-btn pill variant="secondary" size="sm" @click="download_file">Downolad full report</b-btn>
                <b-row>
                    <b-col md="6">
                        <b-table hover :items="basic" caption-top small>
                            <template v-slot:table-caption>Basic Statistics</template>
                        </b-table>
                        {{basic}}
                    </b-col>
                    
                    <b-col nd="6">
                        <b-table hover :tbody-tr-class="rowClass" :items="summary" :fields="fields" caption-top small>
                            <template v-slot:table-caption>Summary.</template>
                        </b-table>
                    </b-col>
                </b-row>
            </b-card-text>
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
                    name: 'fastqc_01',
                    fq: null,
                    user: `${this.$store.state.usuario._id}`
                },
                fields: ['status','module'],
                files: [],
                title: '',
                result: '',
                summary: [],
                basic: []
            }
        },

        created(){
            this.list_files()
        },

        methods:{
            async run_fastqc(){
                try {
                    this.show = true
                    this.show_result = false
                    let res = await this.$axios.post('/tools/fastqc', this.input)
                    console.log(res.data)
                    this.summary = res.data.summary
                    this.basic = res.data.basic
                    this.show = false
                    this.show_result = true
                } catch (error) {
                    console.log(error)
                }
             
            },

            async list_files(){
                try {
                    let res = await this.$axios.post('/storage/list', {user: this.$store.state.usuario._id, type: 'uploaded' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async download_file(){
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
            },

            formatter(value) {
                return value.replace(/\s+/g,"_");
            },

            rowClass(item, type) {
                if (!item || type !== 'row') return
                if (item.status === 'PASS') return 'table-success'
                if (item.status === 'WARN') return 'table-warning'
                if (item.status === 'FAIL') return 'table-danger'
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>