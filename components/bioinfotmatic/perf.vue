<template>
    <div>
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
            <b>Inputs</b>
            <b-row>
                <b-col>
                    <b-form-group
                        label="Assemblie "
                        description="FASTA format"
                    >
                        <b-form-select v-model="input.fasta_file">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                                <!-- <div class="mt-2">Selected: <strong>{{input.fasta_file}}</strong></div> -->
                    </b-form-group>  
                </b-col>
            </b-row>
            <b-badge to="/storage" variant="primary">Upload files</b-badge> 
            <hr>
            <b-button variant="secondary" size="sm" @click="run_quast">Run PERF</b-button>
        </b-card-text>
        <template v-slot:overlay>
             <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing QUAST<br>Please wait...</b></p>
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
                    project_name: 'perf_01',
                    fasta_file: null,
                    user: `${this.$store.state.usuario.email}`,
                    user_id: `${this.$store.state.usuario._id}`
                },

            }
        },
        created(){
            this.list_files()
        },
        methods: {

            async list_files(){
                try {
                    let res = await this.$axios.post('/files/list', {user_id: this.$store.state.usuario._id, type: 'uploaded' })
                    this.files = res.data.files
                } catch (error) {
                    console.log(error)
                }
            },

            async run_quast(){
                this.show = true
                let res = await this.$axios.post('/tools/quast', this.input)
                console.log(res.data)
                this.raws = res.data.raws
                this.result = res.data.result
                this.unaligned = res.data.unaligned
                this.title = res.data.message
                this.show = false
                this.show_result = true
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
            }
        }
    }
</script>

<style scoped>

</style>