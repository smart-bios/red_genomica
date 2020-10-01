<template>
    <div class="container mt-3">
        <h2>Simple search dataset</h2>
        <hr>
        <b-overlay :show="show_search" rounded="sm" >
            <b-card class="mb-2">
                <b-card-text>
                    <p>We also recommend, as a complement to searching the annotations, that you search, using BLAST , for homologs to a protein of interest, to find additional genes/proteins of interest that may have annotations that don't show up in your annotation search (i.e. if you want all homologs of a particular membrane protein, but the particular membrane protein has been named differently by different Genomes Projects). </p>
                    <b-form-group description="eg. copA, acnb, type III, ATP binding, zinc finge">
                        <b-input-group class="mt-3">
                            <b-form-input v-model="buscar" size="sm"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="info" size="sm" @click="search">Search</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-card-text>
            </b-card>       
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p class="text-center"><b>Searching<br>Please wait...</b></p>
                </div>
            </template>
        </b-overlay> 
        
            
        <b-card border-variant="light" header="RESULT" :header-bg-variant="status" header-text-variant="white" v-if="show">
            <b-card-text>
                <p>{{message}}</p>
                <table class="table table-striped">
                    <thead>
                        <tr> 
                            <th>Id seq</th>
                            <th>Description</th>
                            <th>Preferred name</th>
                            <th> <a href="http://clovr.org/docs/clusters-of-orthologous-groups-cogs/" target="_blank">Funcional COG</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="resultado in resultados" :key="resultado.id">
                            <td><b-button class="btn btn-light text-dark" @click="getSecuencia(`${resultado.id}`)"> {{resultado.id}}</b-button></td>
                            <td>{{resultado.desc}}</td>
                            <td>{{resultado.preferred_name}}</td>
                            <td>{{resultado.funcional_COG}}</td>
                        </tr>
                    </tbody>
                </table>
            </b-card-text>        
        </b-card>

        <b-modal 
            v-model="show_modal"
            title="Protein sequence"
            :header-bg-variant= "headerBgVariant"
            :header-text-variant="headerTextVariant"
            size="lg" 
            ok-only 
            scrollable 
        >
            <b-card>
                <div class="row">
                    <div class="col-md-2 border-right">ID</div>
                    <div class="col-md-10">{{secuencia.id}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">Nucleotide seq.</div>
                    <div class="col-md-10"> {{seqnucl.sequence}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">Protein seq.</div>
                    <div class="col-md-10"> {{secuencia.sequence}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">length</div>
                    <div class="col-md-10">{{secuencia.lenght}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">Descripcion</div>
                    <div class="col-md-10">{{secuencia.desc}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right"> Preferred name</div>
                    <div class="col-md-10">{{secuencia.preferred_name}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">Funcional COG</div>
                    <div class="col-md-10">{{secuencia.funcional_COG}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">GOs</div>
                    <div class="col-md-10">{{secuencia.GOs}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">KEGG ko</div>
                    <div class="col-md-10">{{secuencia.KEGG_ko}}</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 border-right">KEGG pathway</div>
                    <div class="col-md-10">{{secuencia.KEGG_pathway}}</div>
                </div>

            </b-card>
        </b-modal>
    </div>
</template>

<script>
    export default {
      data(){
          return {
              headerBgVariant: 'primary',
              headerTextVariant: 'light',
              show: false,
              show_modal: false,
              show_search: false,
              buscar: '',
              status: '',
              message: '',
              resultados:[],
              secuencia: [],
              seqnucl: []
          }
      },
      methods: {
          async search(){
              try {
                this.show_search = true
                this.show = false
                let res = await this.$axios.get('/seq/search/'+this.buscar)
                console.log(res.data)
                this.show_search= false,
                this.show = true,
                this.status = res.data.status
                this.message = res.data.message
                this.resultados = res.data.resultados
                

              } catch (error) {
                  console.log(error)
              }
          },

          async getSecuencia(id){
             try {
                const res = await this.$axios.get(`/seq/${id}`);
                const res2 = await this.$axios.get(`/seq/nucl/${id}`);
                this.secuencia = res.data.seq
                this.seqnucl = res2.data.seq
                this.show_modal = true;

            } catch (error) {
                console.log("ERROR:",error)
            }
          }
      }  
    }
</script>

<style>

</style>