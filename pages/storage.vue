<template>
  <b-container class="mt-3">
    <h2>Storage: <b>{{this.$store.state.usuario.username}}</b></h2>
    <hr>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sapiente eum minima amet quod unde asperiores quis iusto perferendis</p>
    <b-card>
      <b-card-text>
        <b-row>
          <b-col lg="4" md="4" sm="4">
            <b-form-group label="File">
              <b-form-file
                v-model="file"
                accept=".fna, .fasta, .faa, .fa, .faa, .fastq, .gz"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ref="file-input"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col lg="5" md="4" sm="4">
            <b-form-group label="Description">
              <b-form-input v-model="description"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="4" sm="4">
            <b-form-group label="Format file">
               <b-form-select v-model="selected" :options="items"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-progress :value="value" :max="max" show-progress animated></b-progress>
        <b-button @click="sendFile" variant="primary" size="sm" class="mt-2" >Upload</b-button>
      </b-card-text>
      <b-card bg-variant="secondary" text-variant="white" title="Uploaded files ">
        <b-card-text>
          <b-row>
            <b-col lg="3" md="4" sm="6">
              <b-card title="Card title" bg-variant="light" text-variant="dark" sub-title="Card subtitle" class="mt-3">
                <b-card-text>A second paragraph of text in the card.</b-card-text>
                       <b-button @click="sendFile" variant="success" size="sm" >Download</b-button>
                        <b-button @click="sendFile" variant="danger" size="sm" >Delete</b-button>
              </b-card>
            </b-col>
            <b-col lg="3" md="4" sm="6">
              <b-card title="Card title" bg-variant="light" text-variant="dark" sub-title="Card subtitle" class="mt-3">
                <b-card-text>A second paragraph of text in the card.</b-card-text>
                       <b-button @click="sendFile" variant="success" size="sm" >Download</b-button>
                        <b-button @click="sendFile" variant="danger" size="sm" >Delete</b-button>
              </b-card>
            </b-col>
            <b-col lg="3" md="4" sm="6">
              <b-card title="Card title" bg-variant="light" text-variant="dark" sub-title="Card subtitle" class="mt-3">
                <b-card-text>A second paragraph of text in the card.</b-card-text>
                       <b-button @click="sendFile" variant="success" size="sm" >Download</b-button>
                        <b-button @click="sendFile" variant="danger" size="sm" >Delete</b-button>
              </b-card>
            </b-col>
            <b-col lg="3" md="4" sm="6">
              <b-card title="Card title" bg-variant="light" text-variant="dark" sub-title="Card subtitle" class="mt-3">
                <b-card-text>A second paragraph of text in the card.</b-card-text>
                       <b-button @click="sendFile" variant="success" size="sm" >Download</b-button>
                        <b-button @click="sendFile" variant="danger" size="sm" >Delete</b-button>
              </b-card>
            </b-col>
            <b-col lg="3" md="4" sm="6">
              <b-card title="Card title" bg-variant="light" text-variant="dark" sub-title="Card subtitle" class="mt-3">
                <b-card-text>A second paragraph of text in the card.</b-card-text>
                       <b-button @click="sendFile" variant="success" size="sm" >Download</b-button>
                        <b-button @click="sendFile" variant="danger" size="sm" >Delete</b-button>
              </b-card>
            </b-col>

          </b-row>
        </b-card-text>
      </b-card>

<!--       <b-card-text>
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
      </b-card-text> -->

    </b-card>
  </b-container>
</template>

<script>
  export default {
    middleware: 'auth',
  
    data(){
      return {
        file: null,
        value: 0,
        max: 100,
        show_check: false,
        description: '',
        selected: null,
        items: [
          { value: null, text: 'Please select an format file' },
          {value: 'fastq', text:'Sequencing read data (fastq)'},
          {value: 'fasta', text:'A sequence record (fasta)'},
          {value: 'other', text:'Other file format'},
        ],
     }
    },

    created(){
      
    },

    methods: {

      async sendFile(){
        this.show_check = false
        this.value = 0
        const formData = new FormData;
        formData.append('file',this.file)
        formData.append("id", this.$store.state.user._id)
        formData.append("description",this.description)
        formData.append("category", this.select)
        
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
      }


    }
  }
</script>