<template>
  <div class="home">
    <v-row :wrap="true">
      <v-col md12>
        <v-card>
          <v-date-picker v-model="fecha" 
            full-width
            locale="es-ve"
            :min="min"
            :max="max"
            @change="getDolar(fecha)">
          
          </v-date-picker>
        </v-card>
        <v-card color="info" light>
          <v-card-text class="display-1 text-md-center">
           {{valor}}
          </v-card-text>
           
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      fecha: new Date().toISOString().substr(0, 10),
      min: '2000',
      max: new Date().toISOString().substr(0, 10),
      valor: null
    }
  },
  methods: {
    ...mapMutations(['showLoad', 'hideLoad']),
    async getDolar(day){
      let ddmmyy = day.split('-').reverse().join('-');
      try {
        this.showLoad({title: 'Cargando datos', color: 'secondary'})
        let dates = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`);

        if (dates.data.serie.length == 0) {
          this.valor = "Los fines de semana no se taza el dolar"
        }else{
          this.valor = await dates.data.serie[0].valor;

        }
        
      } catch(e) {
        console.log(e);
      } finally{
        this.hideLoad();
      }
    }
  },
  mounted() {
    this.getDolar(this.fecha);
  },
}
</script>
