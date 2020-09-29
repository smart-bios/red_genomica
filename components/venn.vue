<template>
    <div class="container mt-3">
        <div class="row">
            <client-only>
            <div class="col-md-3 sets border-light">
                <div class="card border-light my-3">
                    <div class="card-header bg-primary text-light">Set A</div>
                    <div class="card-body">
                        <input class="form-control form-control-sm" v-model="sets[0].name">
                        <textarea class="form-control mt-2" rows="3" v-model="sets[0].elements"></textarea>
                        <b-badge variant="outline-info" href="#" @click="clear(0)">clear</b-badge>
                    </div>
                </div>
                <div class="card border-light mb-3">
                    <div class="card-header bg-primary text-light" >Set B</div>
                    <div class="card-body">
                        <input class="form-control form-control-sm" v-model="sets[1].name"  >
                        <textarea class="form-control mt-2" rows="3" v-model="sets[1].elements" @change="compareSets()"></textarea>
                        <b-badge variant="outline-info" href="#" @click="clear(1)">clear</b-badge>
                    </div>
                </div>
                <div class="card border-light mb-3">
                    <div class="card-header bg-primary text-light">Set C</div>
                    <div class="card-body">
                        <input class="form-control form-control-sm" v-model="sets[2].name">
                        <textarea class="form-control mt-2" rows="3" v-model="sets[2].elements" @change="compareSets()"></textarea>
                        <b-badge variant="outline-info" href="#" @click="clear(2)">clear</b-badge>
                    </div>
                </div>    
            </div>
            </client-only>
            <div class="col-md-9 venn border-light">
                <div class="venn-info">
                    <b-button variant="secondary" @click="compareSets" >Submit</b-button>
                    {{mensaje}}
                </div>
                <div class="grafico_venn" v-if="show_result">
                    <div id="lista1" class="circle"></div>
                    <div id="lista2" class="circle"></div>
                    <div id="lista3" class="circle" v-if="show_setC"></div>
                    <!-- Names -->
                    <div id="nameA" class="names">{{resultado.setA}}</div>
                    <div id="nameB" class="names">{{resultado.setB}}</div>
                    <div id="nameC" class="names" v-if="show_setC">{{resultado.setC}}</div>
                    <!-- Unique elements -->
                    <div id="onlyA" class="set" @click="getElements(resultado.setOnlyA,1)">
                        {{resultado.setOnlyA.length}}<br>({{percentageOnlyA}}%)
                    </div>
                    <div id="onlyB" class="set" @click="getElements(resultado.setOnlyB,2)">
                        {{resultado.setOnlyB.length}}<br>({{percentageOnlyB}}%)
                    </div>
                    <div id="onlyC" class="set" v-if="show_setC" @click="getElements(resultado.setOnlyC,3)">
                        {{resultado.setOnlyC.length}}<br>({{percentageOnlyC}}%)
                    </div>
                    <!-- Intersecciones -->
                    <div id="interAll" class="set" v-if="show_setC" @click="getElements(resultado.intersection,4)">
                        {{resultado.intersection.length}}<br>({{percentagInter}}%)
                    </div>
                    <div id="interAB" class="set" v-if="show_setC" @click="getElements(resultado.interAB,5)">
                        {{resultado.interAB.length}}<br>({{percentagInterAB}}%)
                    </div>
                    <div id="interAC" class="set" v-if="show_setC" @click="getElements(resultado.interAC,6)">
                        {{resultado.interAC.length}}<br>({{percentagInterAC}}%)
                    </div>
                    <div id="interBC" class="set" v-if="show_setC" @click="getElements(resultado.interBC,7)">
                        {{resultado.interBC.length}}<br>({{percentagInterBC}}%)
                    </div>
                    <div id="center" class="set" v-if="!show_setC" @click="getElements(resultado.intersection,8)">
                        {{resultado.intersection.length}}<br>({{percentagInter}}%)
                    </div>
                </div>
            </div>
            <b-modal 
                v-model="show_modal"
                title= "Elements" 
                size="sm" 
                ok-only 
                scrollable 
            > 
                <p>{{titulo}}</p>
                <textarea class="form-control" rows="10" v-model="elementos"></textarea>
            </b-modal>
        </div>
    </div>
</template>

<script>
import _ from 'underscore'
export default {
        data(){
            return {     
                show_modal: false,  
                show_result: false,
                show_setC: false,  //Cuando se seleccionaan 3 listas

                sets: [
                    { name: "NameSet1", elements: '', list: [], numElements: 0},
                    { name: "NameSet2", elements: '', list: [], numElements: 0},
                    { name: "NameSet3", elements: '', list: [], numElements: 0}
                ],
                mensaje: '',
                resultado : '',
                elementos: '',
                titulo: ''
              
            }
        },

        computed: {
            percentageOnlyA() {return ((this.resultado.setOnlyA.length*100)/this.resultado.union.length).toFixed(2)},
            percentageOnlyB() {return ((this.resultado.setOnlyB.length*100)/this.resultado.union.length).toFixed(2)},
            percentageOnlyC() {return ((this.resultado.setOnlyC.length*100)/this.resultado.union.length).toFixed(2)},
            percentagInter() {return ((this.resultado.intersection.length*100)/this.resultado.union.length).toFixed(2)},
            percentagInterAB() {return ((this.resultado.interAB.length*100)/this.resultado.union.length).toFixed(2)},
            percentagInterAC() {return ((this.resultado.interAC.length*100)/this.resultado.union.length).toFixed(2)},
            percentagInterBC() {return ((this.resultado.interBC.length*100)/this.resultado.union.length).toFixed(2)}

        },

        methods: {

            compareSets(){
                let sets = this.updateSets()
                let num = sets.length // Numero de listas analizar
                if (num == 2){
                    let res = {} 
                    this.show_result = true
                    this.show_setC = false
                    this.mensaje = `Analizando ${num} listas`
                    res.setA =  sets[0].name
                    res.setB =  sets[1].name
                    res.union = _.union(sets[0].list, sets[1].list)
                    res.intersection = _.intersection(sets[0].list, sets[1].list)
                    res.setOnlyA =  _.difference(sets[0].list, res.intersection)
                    res.setOnlyB =  _.difference(sets[1].list, res.intersection)
                    res.message = `Número de elementos en la unión de ${res.setA} y ${res.setB}:  ${res.union.length}` 
                    this.resultado = res

                }else if(num == 3){
                    let res = {} 
                    this.show_result = true
                    this.show_setC = true
                    this.mensaje = `Analizando ${num} listas`
                    res.setA =  sets[0].name
                    res.setB =  sets[1].name
                    res.setC =  sets[2].name
                    res.union = _.union(sets[0].list, sets[1].list, sets[2].list)
                    res.intersection = _.intersection(sets[0].list, sets[1].list, sets[2].list)
                    res.interAB = _.difference( _.intersection(sets[0].list, sets[1].list), res.intersection)
                    res.interAC = _.difference( _.intersection(sets[0].list, sets[2].list), res.intersection)
                    res.interBC = _.difference( _.intersection(sets[1].list, sets[2].list), res.intersection)
                    res.setOnlyA =  _.difference(sets[0].list, _.union(res.intersection, res.interAB, res.interAC))
                    res.setOnlyB =  _.difference(sets[1].list, _.union(res.intersection, res.interAB, res.interBC) )
                    res.setOnlyC =  _.difference(sets[2].list, _.union(res.intersection, res.interAC, res.interBC) )
                    res.message = `Número de elementos en la unión de ${res.setA} , ${res.setB} y ${res.setC}: ${res.union.length}`                     
                    this.resultado = res

                }else{
                    this.mensaje = 'Necesita como minimo dos listas para el análisis'
                    this.show_result = false
                } 
            },

            toArray(elements){
                let array = elements.split('\n')
                for( let i = 0; i < array.length; i++ ){
                    array[i] = array[i].replace(/^\s+/,"");
                    array[i] = array[i].replace(/\s+$/,"");
                }
                return _.uniq(array)
            },

            updateSets(){
                let newSets = []
                this.sets.forEach(element => {
                    if(!element.elements == ''){
                        element.list = this.toArray(element.elements)
                        element.numElements = element.list.length
                        newSets.push(element)   
                    }
                });
                return newSets
            },
            
            getElements(elements,type){
                this.elementos = elements.join('\n')
                if(type == 1){this.titulo =`${this.resultado.setOnlyA.length} elements included exclusively in ${this.resultado.setA} `}
                if(type == 2){this.titulo =`${this.resultado.setOnlyB.length} elements included exclusively in ${this.resultado.setB} `}
                if(type == 3){this.titulo =`${this.resultado.setOnlyC.length} elements included exclusively in ${this.resultado.setC} `}
                if(type == 4){this.titulo =`${this.resultado.intersection.length} common elements in ${this.resultado.setA},${this.resultado.setB},${this.resultado.setC} `}
                if(type == 5){this.titulo =`${this.resultado.interAB.length} common element in ${this.resultado.setA} and ${this.resultado.setB} `}
                if(type == 6){this.titulo =`${this.resultado.interAC.length} common element in ${this.resultado.setA} and ${this.resultado.setC} `}
                if(type == 7){this.titulo =`${this.resultado.interBC.length} common element in ${this.resultado.setB} and ${this.resultado.setC} `}     
                if(type == 8){this.titulo =`${this.resultado.intersection.length} common elements in ${this.resultado.setA} and ${this.resultado.setB}`}
                this.show_modal = true;
            },

            clear(set){
                this.sets[set].name = `NameSet${set +1}`
                this.sets[set].elements = ''
                this.sets[set].list = []
                this.sets[set].numElements = 0
                this.elementos = ''
                this.compareSets()
            }
        }
        
    }
</script>

<style scoped>

.sets {
    background-color: whitesmoke;
    border: 1px solid black

}
.venn {
    background-color: white;
    border: 1px solid black
}

.venn-info {
    background-color: whitesmoke;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 3px;
}

.grafico_venn{
  position: relative;
  background-color:rgb(255, 255, 255);
  height: 650px;
}

.circle{
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    border: 1px solid black;
}
.set {
    position: absolute;
   /*  border-style: dotted; */
    text-align: center;
    font-size: 1.1em;
    font-weight: bold;
    width: 100px;
    cursor: pointer;
}
.names {
    position: absolute;
    /* border-style: dotted; */
    font-size: 1.5em;
    font-weight: bold;
    width: 200px;
    text-align: center;
}

#lista1 {
    /* background-color: rgba(255, 0, 0, 0.4); */ 
    left: 150px; 
    top: 80px;
    
}
#lista2 {
    /* background-color: rgba(0, 68, 255, 0.4);  */
    left: 350px; 
    top: 80px;
}

#lista3 {
    /* background-color: rgba(243, 238, 191, 0.938); */
    left: 250px; 
    top: 240px;
}
/* only elements */
#onlyA{
    left: 200px; 
    top: 210px;
    cursor: pointer;
}
#onlyB{
    left: 550px; 
    top: 210px;
    cursor: pointer;
}

#onlyC{
    left: 375px; 
    top: 490px;
    cursor: pointer;
}
/* Intersecciones */
#interAll {
    left: 375px; 
    top: 290px;
}

#interAB {
    left: 375px; 
    top: 190px;
}
#interAC {
    left: 270px; 
    top: 360px;
}
#interBC {
    left: 480px; 
    top: 360px;
}

#center {
    left: 375px; 
    top: 210px;
}
/* Names */
#nameA{
    left: 220px; 
    top: 30px;
}
#nameB{
    left: 420px; 
    top: 30px;  
}
#nameC{
    left: 320px; 
    top: 600px;    
}

</style>