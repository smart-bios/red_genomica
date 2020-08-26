<template>
    <div id="blastn">
        <div>
        <b-card-text>Search a nucleotide database using a nucleotide query.</b-card-text>
        <b-card border-variant="light" header-bg-variant="primary" header-text-variant="white" header="Enter Nucleotide Query Sequence">
            <p><small>Enter one or more queries in the top text box or use the browse button to upload a file from your local disk. The file may contain a single sequence or a list of sequences. In both cases, the data must be in FASTA format.</small></p>
            <b-card-text>
                <b-form-textarea
                    id="textarea-rows"
                    rows="8"
                    v-model="querys.seq"
                    style="font-size: 10pt"
                ></b-form-textarea>
            </b-card-text>
        </b-card>

        <b-card border-variant="light" header-bg-variant="primary" header-text-variant="white" header="Choose Search Target" class="mt-2">
            <p><small>Choose from one of the nucleotide BLAST databases listed below. </small></p>
            <b-form-select v-model="querys.db" :options="databases"></b-form-select>
        </b-card>
        <button @click="blast" class="btn btn-secondary">BLAST</button>
        </div>
        <hr>
        <b-card border-variant="light" header="Resultados" class="mt-3" v-if="show" >
            <div class="d-flex justify-content-center mb-3">
              <b-spinner label="Loading..." v-if="show_load"></b-spinner>
                <b-card-text>
                    <b-table striped hover  :items="resultados"></b-table>
                </b-card-text>
                    
            </div>  
        </b-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show: false,
                show_load: false,
                querys: {
                    type: 'blastn',
                    seq: '>example\nATGAATGTCATTGAAAAAGCCCCGATCGGCAGCACGCTGCTGCAGGCCCAGTCGCCCTGG\nCGACGCGTGTTCACCGAGTTCTTCAGCTCGCCCACGGCGGTGACGGGCCTGGTGGTCCTG\nCTGATCATTGTGCTGGTTGCAGCCCTGGCGCCGTGGATTGTGGTGCAGAACCCCTACGAC\nCTGATGCAGCTCAACGTCATGGACGCGCGCATGCCGCCTGGCAGCCTCAATGGTGACAGC\nGGTTACACCTATTGGCTGGGCACAGACGGGCAGGGCCGCGATCTGGTCTCGGCGATTATC\nTACGGGCTGCGCATCAGCCTGTGGGTCGGCATTGGCTCGGCGTTGATTGCGGCAGTGCTC\nGGTACGCTGCTCGGGCTGGTATCTGCGTATGTCGGCGGCTGGCTCGATGCCTTGTTGATG\nCGTCTGGTCGACCTGCTGCTGTCGTTCCCGGTGATTCTCATGGCGCTGATGATCCTTGCC\nTGGCTGGGCAAGGGTGTCGGCAACGTGATGCTGACCCTGATAGTGCTCGAATGGGCCTAT\nTACGCGCGCACTGCACGCGGTCAGGCGCTGACCGAAAGCCGCCGTGAATACGTCGATGCG\nGCGCGCGGGCAGGGCGTGGGGCCGCTGCGTATTGTGGTTGGCCACATTCTGCCCAACTGC\nCTGCCACCGCTGATCGTGATCGGCGCCTTGCAGATTGCCCGCGCCATCACGCTGGAAGCG\nACCCTGTCGTTTCTTGGCCTGGGCGTGCCGGTCACCGAGCCGTCGCTGGGGCTGCTGATT\nGCCAACGGCTTTCAATACATGCTCAGCAATGAATACTGGATCAGTCTGTTTCCGGGCCTG\nGCGCTGTTGATCACGATCGTTGCAATCAATCTGGTCGGTGACCGTTTGCGCGATGTCCTG\nAACCCGAGGTTACAGCGATGA',
                    db: null,
                    max_target_seqs: 20,
                    evalue: 10.0
                },
                databases: [
                    { value: null, text: 'Please select a database' },
                    { value: '/nucl/db1/INIAPs', text: 'Ps INIA' }
                ],
                resultados: []
            }   
        },
        methods: {
            async blast(){
                this.show = true
                this.show_load = true
                await this.$axios.post('/tools/blast',this.querys)
                .then(res =>{
                    this.show_load = false
                    console.log(res.data)
                    this.resultados = res.data.blast                 
                })
                .catch(err => {
                    console.log("Error",err)
                })
            }
        }        
    }
</script>

<style>

</style>