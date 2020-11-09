<template>
    <div class=" container mt-3">
        <h2>DNA sequence manipulation</h2>
        <hr>
        <b-card border-variant="light" header-bg-variant="light" header-text-variant="dark" header="Enter DNA Query Sequence">
            
            <b-form-group label="Enter one or more queries the text box or use the browse button to upload a file from your local disk. The file may contain a single sequence or a list of sequences. In both cases, the data must be in FASTA format.">
                <b-form-textarea rows="8" cols=89 v-model="input.sequence" style="font-size: 10pt"></b-form-textarea>
<!--                 <b-form-file v-model="file" accept=".fasta, .fna, .fnn, .fa" class="mt-1 mb-3" plain></b-form-file>-->            
            </b-form-group>      
            <b-row>
                <b-col>
                    <b-form-group label="Transform">
                        <b-form-select v-model="input.selected" :options="options" ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Line width" description="FASTA format (0 for no wrap)">
                        <b-form-input v-model="input.width" size="sm"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Individual radios">
                        <b-form-radio v-model="input.case" value="-u">Print sequences in upper case</b-form-radio>
                        <b-form-radio v-model="input.case" value="-l">Print sequences in lower case</b-form-radio>
                    </b-form-group>
                </b-col>
            </b-row>
            <button @click="editseq(input.selected)" class="btn btn-secondary btn-small mt-3">Submit</button>
        </b-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: {
                    sequence:'',
                    selected: 0,
                    width: 80,
                    case: '-u'
                },   

                options: [
                    { value: 0, text: 'None'},
                    { value: 1, text: 'Remove no coding characters' },
                    { value: 2, text: 'Reverse sequence' },
                    { value: 3, text: 'Complement sequence' },
                    { value: 4, text: 'Reverse and Complement sequence'}
                ]
            }
        },

        methods: {

            async editseq(select){
                let res = ''
                switch(select) {   

                    case 0:
                        console.log('None')
                        res = await this.$axios.post('/seq/none/', this.input)
                        this.input.sequence = res.data.sequence
                        break;
                    case 1:
                        console.log('Remove no coding characters');
                        res = await this.$axios.post('/seq/remove-gaps/', this.input)
                        this.input.sequence = res.data.sequence
                        break;
                    case 2:
                        console.log('Reverse sequence.')
                        res = await this.$axios.post('/seq/reverse/', this.input)
                        this.input.sequence = res.data.sequence                        
                        break;
                    case 3:
                        console.log('Complement sequence.');
                        res = await this.$axios.post('/seq/complement/', this.input)
                        this.input.sequence = res.data.sequence
                        break;
                    case 4:
                        console.log('Reverse and Complement sequence');
                        res = await this.$axios.post('/seq/reverse-complement/', this.input)
                        this.input.sequence = res.data.sequence
                        break;
                    default:
                        console.log('Lo lamentamos, por el momento no disponemos de ' + select + '.');
                }
            }
        }
    }
</script>

<style scoped>

</style>