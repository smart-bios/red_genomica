<template>
  <b-container class="mt-3">
    <h2>Storage: <b>{{this.$store.state.usuario.username}}</b></h2>
    <hr>
    <b-alert show>Lugar para almacenar los archivos subidos y generados. Es un almacenamiento temporal de 7 dias</b-alert>
    <b-card>
      <b-card-text>
        <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
          {{mensaje.text}}
        </b-alert>
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
          <b-col lg="3" md="4" sm="4">
            <b-form-group label="Format file">
               <b-form-select v-model="selected" :options="items"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="5" md="4" sm="4">
            <b-form-group label="Description">
              <b-form-input v-model="description"></b-form-input>
            </b-form-group>
          </b-col>          
        </b-row>
        <b-progress :value="value" :max="max" show-progress ></b-progress>
        <b-button @click="sendFile" variant="primary" size="sm" class="mt-2">Upload</b-button>   
      </b-card-text>
      
      <hr>
      
      <b-card bg-variant="ligth" text-variant="dark" title="Mis archivos">
        <b-card-text>
          <b-row>
            <b-col lg="3" md="4" sm="6" v-for="file in files_uploaded" :key="file._id">
              <b-card :title="file.filename" bg-variant="light" text-variant="dark" :sub-title="file.category" class="mt-3">
                <b-card-text>{{file.description}}</b-card-text>
                  <b-button  @click="download_file(file._id, file.filename)" variant="info" size="sm" ><b-icon icon="cloud-download"></b-icon>Download</b-button>
                  <b-button @click="delete_file(file._id)" variant="danger" size="sm" ><b-icon icon="trash"></b-icon>Delete</b-button>
              </b-card>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
      
      <hr>
      
      <b-card bg-variant="ligth" text-variant="dark" title="Resultados">
        <b-card-text>
          <b-row>
            <b-col lg="3" md="4" sm="6" v-for="file in resultados" :key="file._id">
              <b-card :title="file.filename" bg-variant="light" text-variant="dark" :sub-title="file.category" class="mt-3">
                <b-card-text>{{file.description}}</b-card-text>
                  <b-button @click="download_file(file._id, file.filename)" variant="info" size="sm" ><b-icon icon="cloud-download"></b-icon>Download</b-button>
                  <b-button @click="delete_file(file._id)" variant="danger" size="sm" ><b-icon icon="trash"></b-icon>Delete</b-button>
              </b-card>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
  export default {
    middleware: 'auth',
  
    data(){
      return {
        file: null,
        files_uploaded: [],
        resultados:[],
        value: 0,
        max: 100,
        show_check: false,
        description: '',
        selected: null,
        items: [
          {value: null, text: 'Please select an format file' },
          {value: 'fastq', text:'Sequencing read data (fastq, fq)'},
          {value: 'fasta', text:'A sequence record (fasta, fna, fnn, faa, fs)'},
          {value: 'other', text:'Other file format'},
        ],
        mensaje: {
          color: '',
          text: ''
        }, 
        dismissSecs: 5,
        dismissCountDown: 0
     }
    },

    created(){
      this.list_files_uploaded()
      this.list_files_result() 
    },

    methods: {

      async sendFile(){
        if(this.file == null || this.selected == null){
          this.mensaje.color = 'danger'
          this.mensaje.text = 'Select file or format file'
          this.showAlert()
        }else{
          this.value = 0
          const formData = new FormData;
          formData.append('file',this.file)
          formData.append("id", this.$store.state.usuario._id)
          formData.append("description",this.description)
          formData.append("category", this.selected)

          try {
            const response = await this.$axios.post('/storage/upload', formData, {
                onUploadProgress: ProgressEvent => { 
                    let progress  = Math.round((ProgressEvent.loaded / ProgressEvent.total)*100)
                    this.value = progress
                }
            })

            if(this.value == 100){
              this.mensaje.color = 'success'
              this.mensaje.text = 'Archivo subido'
              this.value = 0
              this.showAlert()
              this.list_files_uploaded()
            }

          } catch (error) {
              if (error.response) {
                console.log("error.response.data",error.response.data);
                console.log('error.response.status',error.response.status);
                console.log('error.response.headers',error.response.headers);
              } else if (error.request) {
                console.log('error.request',error.request);
              } else {
                console.log('Error', error.message);
              }
                console.log("error.config",error.config);       
          }

        }        
      },

      async list_files_uploaded(){
         try {
           let res = await this.$axios.post('/storage/listfiles', {user: this.$store.state.usuario._id, type: 'uploaded' })
           this.files_uploaded = res.data.files
          } catch (error) {
            console.log(error)
          }
      },

      async list_files_result(){
         try {
           let res = await this.$axios.post('/storage/listfiles', {user: this.$store.state.usuario._id, type: 'result'})
           this.resultados= res.data.files
          } catch (error) {
            console.log(error)
          }
      },

      async delete_file(id){
         try {
          confirm('Estás segura de que quieres eliminar este archivo?') &&
          await this.$axios.delete(`/storage/delete/${id}`)
          this.list_files_uploaded()
          this.list_files_result()
        } catch (error) {
          console.log(error)
        } 
      },

      async download_file(id, filename){
        try {
          await this.$axios.get(`/storage/download/${id}`, {responseType: 'blob'}).
          then(res => {
            if (!window.navigator.msSaveOrOpenBlob){
              // BLOB NAVIGATOR
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `${filename}`);
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

      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },

      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }


    }
  }
</script>