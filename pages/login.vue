<template>  
    <div class="container mt-3">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card  mb-3 " style="max-width: 30rem;">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="inputEmail">Email</label>
                                <input v-model="user.email" type="email" class="form-control" id="inputEmail">
                            </div>
                            <div class="form-group">
                                <label for="inputPassword">Password</label>
                                <input v-model="user.password" type="password" class="form-control" id="inputPassword">
                            </div>                            
                            <b-button type="submit" class="btn btn-secondary">Submit</b-button>
                        </form>
                        <div class="my-3">
                            <b-alert
                                :show="dismissCountDown"
                                dismissible
                                variant="danger"
                                @dismissed="dismissCountDown=0"
                                @dismiss-count-down="countDownChanged"
                            >
                                {{mensaje}}
                            </b-alert>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        data(){
            return {
                user:{
                    email: '',
                    password:''
                },
                mensaje: '',
                dismissSecs:3,
                dismissCountDown: 0
            }
        },
        methods:{
            async login() {
                try {
                    await this.$axios.post('/user/login',this.user)
                    .then(res =>{
                        this.$store.dispatch("guardarToken",res.data.token);
                        this.$router.push('/');
                    })
                    .catch(error => {
                        if(error.response.status == 401){
                            this.mensaje = 'Username o pass incorrect'
                            this.showAlert()
                        }
                        if(error.response.status  == 402){
                            this.mensaje = 'Username o pass incorrect'
                            this.showAlert()
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

<style scoped>

</style>