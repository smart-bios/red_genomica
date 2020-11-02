<template>
    <div id="menu">
       <b-navbar toggleable="lg" type="dark" variant="secondary">
           <b-container>
               <b-navbar-brand to="/">                   
                    <b>RedGBioNIA</b>
                </b-navbar-brand>
               <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
               
               <b-collapse id="nav-collapse" is-nav>

                   <b-navbar-nav>
                        <b-nav-item-dropdown text="Especies" right>
                           <b-dropdown-item to="/species/pss"><em>Pseudomonas syringae pv syringae</em> (all)</b-dropdown-item>
                           <b-dropdown-item to="/species/pv"><em>Pseudomonas viridiflava</em></b-dropdown-item>
                           <b-dropdown-item to="/species/nematodos">Meloidogyne</b-dropdown-item>
                        </b-nav-item-dropdown>
                        
                        <b-nav-item-dropdown text="Datos" rigth >
                            <b-dropdown-item to="/data/seq">Buscar secuencias</b-dropdown-item>
                            <b-dropdown-item to="/data/mlst">MLST</b-dropdown-item>
                            <b-dropdown-item to="/data/typeIII">Type III secretion systems</b-dropdown-item>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown text="Herramientas" rigth >
                            <b-dropdown-item to="/tools/blast">Blast+</b-dropdown-item>
                            <b-dropdown-item to="/tools/primers">Primers</b-dropdown-item>
                            <b-dropdown-item to="/tools/in_silico_pcr"><i>In silico</i> PCR</b-dropdown-item>
                            <b-dropdown-item to="/tools/SSRs">Simple Sequence Repeats</b-dropdown-item>
                            <b-dropdown-item to="/tools/venn">Venn's diagrams</b-dropdown-item>
                        </b-nav-item-dropdown>
                       <b-nav-item to="/articulos">Notas</b-nav-item>
                       <b-nav-item to="/About">About</b-nav-item>
                       <b-nav-item-dropdown text="Bioinformatics analysis" rigth v-if="logueado">
                            <b-dropdown-item to="/pipelines/data_preprocessing">Pre-assembly</b-dropdown-item>
                            <b-dropdown-item to="/pipelines/assembly">Assembly</b-dropdown-item>
                            <b-dropdown-item to="/pipelines/quality">Post-assembly</b-dropdown-item>
                            <b-dropdown-item to="/pipelines/prediction">Genomic Prediction/ Annotation</b-dropdown-item>                        
                            <b-dropdown-item to="/pipelines/anotacion">Functional annotation</b-dropdown-item>
                            <b-dropdown-item to="/pipelines/qtl">QTL mapping</b-dropdown-item>
                            <b-dropdown-item to="/pipelines/ssr"> Microsatellites </b-dropdown-item>
                            <!-- <b-dropdown-item to="/pipelines/ortologos">orthologs</b-dropdown-item> -->
                        </b-nav-item-dropdown>
                   </b-navbar-nav>

                    <b-navbar-nav class="ml-auto">
                        <b-nav-item to="/login" v-if="!logueado">Login</b-nav-item>
                            <b-nav-item-dropdown right v-else>
                                <template v-slot:button-content>
                                    <b-avatar></b-avatar>
                                    {{$store.state.usuario.username}}
                                </template>
                                <b-dropdown-item to="/storage">
                                    <b-icon icon="folder" aria-hidden="true"></b-icon>
                                    Storage
                                </b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item-button  @click="logout" variant="danger">
                                    <b-icon icon="power" aria-hidden="true"></b-icon>
                                    Sign Out
                                </b-dropdown-item-button>
                            </b-nav-item-dropdown>                           
                   </b-navbar-nav>
               </b-collapse>
           </b-container>
       </b-navbar>
    </div>
</template>

<script>

export default {

    computed:{
        logueado(){
            return this.$store.state.usuario;
        }
    },

    methods: {
        async logout(){
            try {
                let res = await this.$axios.post('/user/clean', {user: this.$store.state.usuario._id})
                console.log(res.data)
                this.$store.dispatch("cerrarSesion");   
            } catch (error) {
                    console.log(error)
            } 
        }
  }
}
</script>