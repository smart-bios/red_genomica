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
                <b-col>
                    <b-form-group
                        label="Genome reference"
                        description="genomas completros de refercia NCBI"
                    >
                        <b-form-select v-model="input.reference">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="reference in references" :key="reference._id" :value="`${reference.path}`">{{reference.name}}</b-form-select-option>
                        </b-form-select>
                                <!-- <div class="mt-2">Selected: <strong>{{input.fasta_file}}</strong></div> -->
                    </b-form-group>  
                </b-col>
                <b-col>
                    <b-form-group
                        label="Skip contigs shorter than"
                        description="Default 500 bp"
                    >
                        <b-form-input  v-model="input.length"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-badge to="/storage" variant="primary">Upload files</b-badge> 
            <hr>
            <b-button variant="secondary" size="sm" @click="run_quast">Run QUAST</b-button>
        </b-card-text>
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                <p class="text-center"><b>Runing QUAST<br>Please wait...</b></p>
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
            <b-btn pill variant="secondary" size="sm" @click="download_file">Downolad results</b-btn>-    
            <p class="mt-2">All statistics are based on contigs of size >= {{input.length}} bp, unless otherwise noted (e.g., "# contigs (>= 0 bp)" and "Total length (>= 0 bp)" include all contigs). </p>
            <b-table-simple hover caption-top responsive>
                <caption>Genome statistics whit reference</caption>
                <b-thead head-variant="ligth">
                    <b-tr>
                        <b-th></b-th>
                        <b-th>Value</b-th>
                        <b-th>Description</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>
                        <b-td>{{raws[36][0]}}</b-td>
                        <b-td>{{raws[36][1]}}</b-td>
                        <b-td>is the percentage of aligned bases in the reference genome. A base in the reference genome is aligned if there is at least one contig with at least one alignment to this base. Contigs from repetitive regions may map to multiple places, and thus may be counted multiple times</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[37][0]}}</b-td>
                        <b-td>{{raws[37][1]}}</b-td>
                        <b-td>is the total number of aligned bases in the assembly divided by the total number of aligned bases in the reference genome (see Genome fraction (%) for the 'aligned base' definition). If the assembly contains many contigs that cover the same regions of the reference, its duplication ratio may be much larger than 1. This may occur due to overestimating repeat multiplicities and due to small overlaps between contigs, among other reasons.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[41][0]}}</b-td>
                        <b-td>{{raws[41][1]}}</b-td>
                        <b-td>is the number of genomic features (genes, CDS, etc) in the assembly (complete and partial), based on a user-provided list of genomic features positions in the reference genome. A feature is 'partially covered' if the assembly contains at least 100 bp of this feature but not the whole one.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[42][0]}}</b-td>
                        <b-td>{{raws[42][1]}}</b-td>
                        <b-td>is the length of the largest continuous alignment in the assembly.</b-td>
                    </b-tr>
                     <b-tr>
                        <b-td>{{raws[43][0]}}</b-td>
                        <b-td>{{raws[43][1]}}</b-td>
                        <b-td>is the total number of aligned bases in the assembly.</b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>

            <!-- <b-table-simple hover caption-top responsive>
                <caption>Unaligned</caption>
                <b-thead head-variant="ligth">
                    <b-tr>
                        <b-th></b-th>
                        <b-th>Value</b-th>
                        <b-th>Description</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>
                        <b-td>{{unaligned[1][0]}}</b-td>
                        <b-td>{{unaligned[1][1]}}</b-td>
                        <b-td>is the total number of contigs in the assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{unaligned[2][0]}}</b-td>
                        <b-td>{{unaligned[2][1]}}</b-td>
                        <b-td>is the length of the longest contig in the assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{unaligned[3][0]}}</b-td>
                        <b-td>{{unaligned[3][1]}}</b-td>
                        <b-td>is the total number of bases in the assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{unaligned[4][0]}}</b-td>
                        <b-td>{{unaligned[4][1]}}</b-td>
                        <b-td>is the length for which the collection of all contigs of that length or longer covers at least half an assembly.</b-td>
                    </b-tr>                   
                </b-tbody>
            </b-table-simple> -->

            <b-table-simple hover caption-top responsive>
                <caption>Statistics without reference</caption>
                <b-thead head-variant="ligth">
                    <b-tr>
                        <b-th></b-th>
                        <b-th>Value</b-th>
                        <b-th>Description</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>
                        <b-td>{{raws[13][0]}}</b-td>
                        <b-td>{{raws[13][1]}}</b-td>
                        <b-td>is the total number of contigs in the assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[14][0]}}</b-td>
                        <b-td>{{raws[14][1]}}</b-td>
                        <b-td>is the length of the longest contig in the assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[15][0]}}</b-td>
                        <b-td>{{raws[15][1]}}</b-td>
                        <b-td>is the total number of bases in the assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[19][0]}}</b-td>
                        <b-td>{{raws[19][1]}}</b-td>
                        <b-td>is the length for which the collection of all contigs of that length or longer covers at least half an assembly.</b-td>
                    </b-tr>
                    <b-tr>
                        <b-td>{{raws[18][0]}}</b-td>
                        <b-td>{{raws[18][1]}}</b-td>
                        <b-td>is the total number of G and C nucleotides in the assembly, divided by the total length of the assembly.</b-td>
                    </b-tr>                    
                </b-tbody>
            </b-table-simple>

        </b-card-text>
    </b-card>
 </div>   
</template>

<script>
    export default {
        data(){
            return {
                show: false,
                show_result: false,
                input: {
                    project_name: 'quast_01',
                    fasta_file: null,
                    reference: null,
                    length: 500,
                    user: `${this.$store.state.usuario.email}`,
                    user_id: `${this.$store.state.usuario._id}`
                },
                files:[],
                references: [],
                raws: [],
                unaligned: [],
                result: '',
                title: ''
                
            }
        },
        created(){
            this.list_files()
            this.list_references()
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
            async list_references(){
                try {
                    let res = await this.$axios.get('/genomas/ref')
                    this.references = res.data.refs
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
