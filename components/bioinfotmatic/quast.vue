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

                    <b-form-group label="Assembly" description="FASTA format">
                        <b-form-select v-model="input.assembly" size="sm">
                            <b-form-select-option :value="null">Please select a file</b-form-select-option>
                            <b-form-select-option v-for="file in files" :key="file._id" :value="`${file.path}`">{{file.filename}}</b-form-select-option>
                        </b-form-select>
                        <b-badge to="/storage" variant="primary">Upload files</b-badge>
                    </b-form-group>

                    <b-form-group label="Skip contigs shorter than" description="Default 500 bp">
                        <b-form-input  v-model="input.length" size="sm"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Contig thresholds" description="Comma-separated list of contig length thresholds">
                        <b-form-input  v-model="input.thresholds" size="sm"></b-form-input>
                    </b-form-group>

                    <b-form-group>
                        <b-form-checkbox v-model="input.compare" name="check-button" size="sm" switch>
                           Comparar con genoma de referencia
                        </b-form-checkbox>                      
                    </b-form-group>

                    <b-form-group description="NCBI Representative genome">
                        <b-form-select v-model="input.reference" :disabled="!input.compare" size="sm">
                            <b-form-select-option :value="null">Please select a reference genome</b-form-select-option>
                            <b-form-select-option v-for="reference in references" :key="reference._id" :value="`${reference.path}`">{{reference.name}}</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <hr>
                    <b-button variant="secondary" size="sm" @click="run_quast">Run QUAST</b-button>
                </b-col>

                <b-col sm="12" md= "12" lg="9" class="border-left border-default panel-2 py-2">
                    <b-card header="Result" :header-bg-variant="status" header-text-variant="white" v-if="show_result">
                        <b-card-text>
                            <h3>{{title}}</h3>
                            <hr>
                            <div v-if="status = 'success'">
                                <p>All statistics are based on contigs of size >= {{input.length}} bp, unless otherwise noted (e.g., "# contigs (>= 0 bp)" and "Total length (>= 0 bp)" include all contigs).</p>
                                <b-btn variant="secondary" size="sm" @click="download_file" class="my-2">Download Full Results</b-btn>
                                <div v-if="input.compare">
                                    <b-table-simple hover caption-top responsive small>
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
                                                <b-td>{{result[13].item}}</b-td>
                                                <b-td>{{result[13].value}}</b-td>
                                                <b-td>the total number of contigs in the assembly.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[14].item}}</b-td>
                                                <b-td>{{result[14].value}}</b-td>
                                                <b-td>the length of the longest contig in the assembly.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[15].item}}</b-td>
                                                <b-td>{{result[15].value}}</b-td>
                                                <b-td>the total number of bases in the assembly.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[19].item}}</b-td>
                                                <b-td>{{result[19].value}}</b-td>
                                                <b-td>the length for which the collection of all contigs of that length or longer covers at least half an assembly.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[18].item}}</b-td>
                                                <b-td>{{result[18].value}}</b-td>
                                                <b-td>the total number of G and C nucleotides in the assembly, divided by the total length of the assembly.</b-td>
                                            </b-tr>                    
                                        </b-tbody>
                                    </b-table-simple> 
                                
                                    <b-table-simple hover caption-top responsive small>
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
                                                <b-td>{{result[36].item}}</b-td>
                                                <b-td>{{result[36].value}}</b-td>
                                                <b-td>the percentage of aligned bases in the reference genome. A base in the reference genome is aligned if there is at least one contig with at least one alignment to this base. Contigs from repetitive regions may map to multiple places, and thus may be counted multiple times</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[37].item}}</b-td>
                                                <b-td>{{result[37].value}}</b-td>
                                                <b-td>the total number of aligned bases in the assembly divided by the total number of aligned bases in the reference genome (see Genome fraction (%) for the 'aligned base' definition). If the assembly contains many contigs that cover the same regions of the reference, its duplication ratio may be much larger than 1. This may occur due to overestimating repeat multiplicities and due to small overlaps between contigs, among other reasons.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[41].item}}</b-td>
                                                <b-td>{{result[41].value}}</b-td>
                                                <b-td>the number of genomic features (genes, CDS, etc) in the assembly (complete and partial), based on a user-provided list of genomic features positions in the reference genome. A feature is 'partially covered' if the assembly contains at least 100 bp of this feature but not the whole one.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[42].item}}</b-td>
                                                <b-td>{{result[42].value}}</b-td>
                                                <b-td>the length of the largest continuous alignment in the assembly.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{result[43].item}}</b-td>
                                                <b-td>{{result[43].value}}</b-td>
                                                <b-td>the total number of aligned bases in the assembly.</b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>

                                    <b-table-simple hover caption-top responsive small>
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
                                                <b-td>{{unaligned[1].item}}</b-td>
                                                <b-td>{{unaligned[1].value}}</b-td>
                                                <b-td>the number of contigs that have no alignment to the reference sequence.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{unaligned[2].item}}</b-td>
                                                <b-td>{{unaligned[2].value}}</b-td>
                                                <b-td>is the number of contigs that are not fully unaligned, but have fragments with no alignment to the reference sequence.</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{unaligned[3].item}}</b-td>
                                                <b-td>{{unaligned[3].value}}</b-td>
                                                <b-td>the number of contigs that are not fully unaligned, but have fragments with no alignment to the reference sequence</b-td>
                                            </b-tr>
                                            <b-tr>
                                                <b-td>{{unaligned[4].item}}</b-td>
                                                <b-td>{{unaligned[4].value}}</b-td>
                                                <b-td>the total number of unaligned bases in all partially unaligned contigs.</b-td>
                                            </b-tr>                   
                                        </b-tbody>
                                    </b-table-simple> 
                                </div>
                                <div v-else>
                                    <b-table striped hover :items="result"></b-table>
                                </div>

                            </div>
 

                        </b-card-text>
                    </b-card> 
                </b-col>
            </b-row>            
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
                    name: 'QUAST01',
                    assembly: null,
                    compare: false,
                    reference: null,
                    length: 500,
                    thresholds: '0,1000,5000,10000,25000,50000',
                    user: {
                        id: `${this.$store.state.usuario._id}`,
                        name: `${this.$store.state.usuario.username}`,
                        email: `${this.$store.state.usuario.email}`
                    }
                },
                files:[],
                references: [],
                result: '',
                unaligned: '',
                title: '',
                status: '',
                full_report: '',
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
            this.list_references()
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

            async list_references(){
                try {
                    let res = await this.$axios.get('/genome/ref')
                    this.references = res.data.ref
                } catch (error) {
                    console.log(error)
                }
            },

            async run_quast(){
               if(this.input.assembly != null) {
                   if(this.input.compare && this.input.reference == null){
                        this.mensaje.color = 'danger'
                        this.mensaje.text = 'Select reference genome'
                        this.showAlert()
                   }else{
                       try {
                           this.show = true
                           this.show_result = false
                           let res = await this.$axios.post('/tools/quast', this.input)
                           this.status = res.data.status
                           this.title = res.data.message
                           this.result = res.data.report
                           this.unaligned = res.data.unaligned
                           this.full_report = res.data.result
                           this.show = false
                           this.show_result = true
                       } catch (error) {
                           console.log(error)
                       }
                       
                       
                   }

               }else{
                   this.mensaje.color = 'danger'
                   this.mensaje.text = 'Select file'
                   this.showAlert()
               }

            },
            async download_file(){
               try {
                    await this.$axios.get(`/storage/download/${this.full_report}`, {responseType: 'blob'}).
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