<template>  
    <div class="container mt-3">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <Notificacion :message="mensaje" v-if="mensaje"/>
                <div class="card border-dark mb-3 " style="max-width: 30rem;">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form @submit.prevent="register">

                            <div class="form-group">
                                <label for="inputEmail">Username</label>
                                <input v-model="usuario.username" type="text" class="form-control" id="inputUsername">
                            </div>
                            <div class="form-group">
                                <label for="inputEmail">Email</label>
                                <input v-model="usuario.email" type="email" class="form-control" id="inputEmail">
                            </div>
                            <div class="form-group">
                                <label for="inputPassword">Password</label>
                                <input v-model="usuario.password" type="password" class="form-control" id="inputPassword">
                            </div>                            
                            <b-button type="submit" class="btn btn-info">Submit</b-button>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
    </div>  
</template>

<script>
import Notificacion from '@/components/Notificacion'
    export default {
        components: {
            Notificacion,
        },
        data(){
            return {
                usuario:{
                    username: 'user20',
                    email: 'user20@gmail.com',
                    password:'1345'
                },
                mensaje: null
            }
        },
        methods:{
            async register() {
                    await this.$axios.post('/addUsuario',this.usuario)
                    .then(resp =>{
                        
                        if(resp.data.status == 'success'){
                            this.$router.push('/login')
                        }else{
                             this.mensaje = resp.data.message
                        }    
                    })
                    .catch(e => {
                        this.mensaje = e.response.data.message
                    })
             } 
        }
        
    }
</script>

