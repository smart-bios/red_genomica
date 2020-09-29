<template>
    <div class="container mt-3">
        <h2>Venn Diagrams</h2>
        <hr>
        <b-card class="mb-3">
            <p>A Venn diagram uses overlapping circles or other shapes to illustrate the logical relationships between two or more sets of items.</p>
        </b-card>
    
        <b-card no-body>
             <b-tabs card>
                 <b-tab title="Venn diagrams BEG" active>
                    <p>With this tool you can calculate the intersection(s) of list of elements. It will generate a textual output indicating which elements are in each intersection or are unique to a certain list. If the number of lists is lower than 7 it will also produce a graphical output in the form of a venn/Euler diagram <a href="http://bioinformatics.psb.ugent.be/webtools/Venn/">http://bioinformatics.psb.ugent.be/webtools/Venn/</a></p>
                    <hr>
                    <b-embed
                        type="iframe"
                        aspect="1by1"
                        src="http://bioinformatics.psb.ugent.be/webtools/Venn/"
                        allowfullscreen
                    ></b-embed>             
                    <hr>
                 </b-tab>

                 <b-tab title="Venny">
                     <b-card>
                         <p><i>Oliveros, J.C. (2007-2015) Venny.</i> An interactive tool for comparing lists with Venn's diagrams. <a href="https://bioinfogp.cnb.csic.es/tools/venny/index.htm">https://bioinfogp.cnb.csic.es/tools/venny/index.htm</a></p>
                     </b-card>
                     <hr>
                     <b-container>
                         <b-embed
                        type="iframe"
                        src="https://bioinfogp.cnb.csic.es/tools/venny/index.html"
                    ></b-embed>

                     </b-container>

                    
                 </b-tab>
                 
                 <b-tab title="VenD 0.1">
                     <b-alert show>En desarrollo ....</b-alert>
                     <hr>
                     <VenD />
                 </b-tab>

             </b-tabs>
         </b-card>
    </div>
</template>

<script>
import VenD from '@/components/venn'
    export default {
        components: {
           VenD
        }
    }
</script>