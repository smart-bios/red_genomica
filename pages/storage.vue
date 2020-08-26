<template>
  <b-container class="mt-3">
    <h2>{{this.$store.state.usuario.username}}</h2>
    <hr>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sapiente eum minima amet quod unde asperiores quis iusto perferendis, quae vero optio maiores assumenda tempore, consequuntur repudiandae! Recusandae autem temporibus enim, dolores fuga, aperiam magnam nihil officia corporis reprehenderit possimus sequi quibusdam, accusantium in molestiae. Distinctio asperiores placeat quibusdam ea.</p>
    <b-card>
       <!-- <fileUpload /> -->
       <FileUpload /> 

      <b-card header="Uploaded files" header-bg-variant="primary" header-text-variant="white">
        <b-card-text>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Description</th>
                <th scope="col">Uploaded date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in files_uploaded" :key="file._id">
                <td>{{file.filename}}</td>
                <td>{{file.description}}</td>
                <td>{{file.createdAt}}</td>
                <td>
                  <b-button-group>
                    <b-button variant="outline-info" size="sm" @click="download_file(file._id, file.filename)" >
                      <b-icon icon="cloud-download"></b-icon> Download
                    </b-button>
                    <b-button variant="outline-danger" @click="delete_file(file._id)">
                      <b-icon icon="trash"></b-icon> Delete
                    </b-button>
                </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>
      
      <b-card header="Results" header-bg-variant="primary" header-text-variant="white" class="mt-3">
        <b-card-text>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Description</th>
                <th scope="col">Result date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in files_result" :key="file._id">
                <td>{{file.filename}}</td>
                <td>{{file.description}}</td>
                <td>{{file.createdAt}}</td>
                <td>
                  <b-button-group>
                    <b-button variant="outline-info" size="sm" @click="download_file(file._id, file.filename)" >
                      <b-icon icon="cloud-download"></b-icon> Download
                    </b-button>
                    <b-button variant="outline-danger" size="sm" @click="delete_file(file._id)">
                      <b-icon icon="trash"></b-icon> Delete
                    </b-button>
                  </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>

    </b-card>
  </b-container>
</template>

<script>
import FileUpload from '@/components/FileUpload'
  export default {
    middleware: 'auth',
    
    components: {
      FileUpload
    },
  
    data(){
      return {
        files_uploaded: [],
        files_result: []
     }
    },

    created(){
      this.list_files_uploaded()
      this.list_files_result()
    },

    methods: {

      async list_files_uploaded(){
         try {
           let res = await this.$axios.post('/files/list', {user_id: this.$store.state.usuario._id, type: 'uploaded' })
           this.files_uploaded = res.data.files
          } catch (error) {
            console.log(error)
          }
      }, 

      async list_files_result(){
         try {
           let res = await this.$axios.post('/files/list', {user_id: this.$store.state.usuario._id, type: 'result' })
           this.files_result = res.data.files
          } catch (error) {
            console.log(error)
          }
      }, 

      async delete_file(id){
        try {
          confirm('Estás segura de que quieres eliminar este archivo?') &&
          await this.$axios.delete(`/files/delete/${id}`)
          this.list_files_uploaded()
          this.list_files_result()
        } catch (error) {
          console.log(error)
        }
      },

      async download_file(id, filename){
        console.log("idfile: ", id)
        try {
          await this.$axios.get(`/files/download/${id}`, {responseType: 'blob'}).
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
      }


    }
  }
</script>