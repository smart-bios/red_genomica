<template>
    <b-container fluid="lg" class="mt-3">
        <h2>Multilocus Sequence Typing</h2>
        <hr>
        <b-card>
            <b-card-text>
                <p>Multilocus sequence typing (MLST) is an unambiguous procedure for characterising isolates of bacterial species using the sequences of internal fragments of (usually) seven house-keeping genes. Approximately 450-500 bp internal fragments of each gene are used, as these can be accurately sequenced on both strands using an automated DNA sequencer. For each house-keeping gene, the different sequences present within a bacterial species are assigned as distinct alleles and, for each isolate, the alleles at each of the seven loci define the allelic profile or sequence type (ST).</p>
                <b-table striped hover responsive :items="items" caption-top>
                    <template v-slot:table-caption>This is a table caption.</template>
                          <template v-slot:cell(gen)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#`">{{ data.value }}</a>
      </template>
                </b-table>
            </b-card-text>
        </b-card>



    </b-container>
</template>

<script>
    export default {
        data(){
            return {
            items: [
                { gen: 'aconitate hydratase 2', Preferred_name: 'acnB', A1M3: 'A1M3_03609',A1M25: 'A1M25_00446', A1M129: 'A1M129_02364', A1M140: 'A1M140_02995',A1M63: 'A1M163_03555', A1M171: 'A1M171_02825', A1M197: 'A1M197_01473', A1M198: 'A1M198_00441', A2M176: 'A2M176_01666'} ,
                { gen: 'citrate synthase I', Preferred_name: 'glta', A1M3: '',A1M25: '', A1M129: '', A1M140: '',A1M63: '', A1M171: '', A1M197: '', A1M198: '', A2M176:''},
                { gen: 'DNA gyrase subunit B', Preferred_name: 'gyrB',A1M3: '',A1M25: '', A1M129: '', A1M140: '',A1M63: '', A1M171: '', A1M197: '', A1M198: '', A2M176:''  },
                { gen: 'glucose-6-phosphate isomerase', Preferred_name: 'pgi', A1M3: '',A1M25: '', A1M129: '', A1M140: '',A1M63: '', A1M171: '', A1M197: '', A1M198: '', A2M176:'' },
                { gen: 'RNA polymerase sigma-70 factor', Preferred_name: 'rpoD',A1M3: '',A1M25: '', A1M129: '', A1M140: '',A1M63: '', A1M171: '', A1M197: '', A1M198: '', A2M176:''  },
                { gen: 'glyceraldehyde-3-phosphate dehydrogenase 1', Preferred_name: 'gap',A1M3: '',A1M25: '', A1M129: '', A1M140: '',A1M63: '', A1M171: '', A1M197: '', A1M198: '', A2M176:''  }
            ]

            }
        }
    }
</script>

<style>

</style>