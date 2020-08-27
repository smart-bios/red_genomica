<template>
  <b-card-text>
    <b-form-file
        v-model="file"
        accept=".fna, .fasta, .faa, .fa, .faa, .fastq, .gz"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        ref="file-input"
    ></b-form-file>
    <b-progress :value="value" :max="max" show-progress animated></b-progress>
    <p class="mt-1">Selected file: {{ file ? file.name : '' }}</p>
    <b-form-group label="Description">
        <b-form-input v-model="description"></b-form-input>
    </b-form-group>
    <b-button @click="sendFile" variant="secondary" size="sm" >Upload</b-button>
    <b-avatar icon="check" variant="success" size="sm"  v-if="show_check"></b-avatar>
    <hr>
  </b-card-text>
</template>

<script>
    export default {
        data(){
            return {
                file: null,
                value: 0,
                max: 100,
                show_check: false,
                description: ''
            }
        },

        created(){
        },
        
        methods: {
           async sendFile(){
                this.show_check = false
                this.value = 0
                const formData = new FormData;
                formData.append('file',this.file);
                formData.append('token',this.$store.state.token);
                formData.append("desc",this.description)
                
                try {
                   const response = await this.$axios.post('/storage/upload', formData, {
                       onUploadProgress: ProgressEvent => { 
                           let progress  = Math.round((ProgressEvent.loaded / ProgressEvent.total)*100)
                           this.value = progress
                        }
                   })
                   //this.clearFiles()

                   this.show_check = true                
                } catch (error) {
                     if (error.response) {
                        /*
                        * The request was made and the server responded with a
                        * status code that falls out of the range of 2xx
                        */
                        console.log("error.response.data",error.response.data);
                        console.log('error.response.status',error.response.status);
                        console.log('error.response.headers',error.response.headers);
                    } else if (error.request) {
                        /*
                        * The request was made but no response was received, `error.request`
                        * is an instance of XMLHttpRequest in the browser and an instance
                        * of http.ClientRequest in Node.js
                        */
                        console.log('error.request',error.request);
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log("error.config",error.config);
                                
                }
            },

            clearFiles() {
                this.$refs['file-input'].reset()
                this.value = 0
            }
        }
    }
</script>
