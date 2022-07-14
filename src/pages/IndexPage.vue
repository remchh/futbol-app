<template>
  <q-page class="q-pa-md">
      <q-input
        v-model="search"
        @keyup.enter="getResults"
        placeholder="Enter the name of the stadium, city or country"
  
        standout="bg-secondary text-white"
        >
        <template v-slot:append>
         <q-icon
            @click="getResults" 
            name="search"
          />
        </template>
      </q-input>

      <div class="row justify-around">
        <div
          v-for="(item, index) in stadiumData"
          :key="item[index]"
          class="col-md-4 q-pa-lg q-mt-md"
          >
          <q-card class="my-card">
            
            <img :src="item.image">

            <q-list>
              <q-item>
                <q-item-section class="text-center">
                  <q-item-label class="text-subtitle2" >{{item.name}}</q-item-label>
                  <q-item-label caption>Stadium Name</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="text-center">
                  <q-item-label class="text-subtitle2">{{item.capacity}}</q-item-label>
                  <q-item-label caption>Capacity</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="text-center">
                  <q-item-label class="text-subtitle2">{{item.city}}</q-item-label>
                  <q-item-label caption>City</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="text-center">
                  <q-item-label class="text-subtitle2">{{item.country}}</q-item-label>
                  <q-item-label caption>Country</q-item-label>
                </q-item-section>
              </q-item>


            </q-list>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const $q = useQuasar()
    const search = ref('')
    const apiKey = ref('b6004fba06b499ba6cd2b7b7e00939f5')
    const baseUrl = ref('https://v3.football.api-sports.io')
    const stadiumData = ref('')

    const getResults = async () => {
      try {
        //console.log('GREAT')
        const response = await axios(`${baseUrl.value}/venues?search=${search.value}`, {
          method: 'get',
          headers: {
          'x-rapidapi-key': apiKey.value,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      })
        stadiumData.value = response.data.response
        if(stadiumData.value.length === 0){
          search.value=''
          console.log('Please try to enter the name of the stadium, city or country')
          $q.notify({
          type: 'negative',
          message: 'Please try to enter a valid name of a stadium, city or country'
          })
        } else {
           search.value=''
           console.log(response.data.response.length)
           console.log(response.data.response)
  
        }
      }
      catch(err) {
        console.log(err.message)
      }
    }

    return {search, getResults, stadiumData}
  }

})
// Get all players statistics from one {team} & {season}
//get("https://v3.football.api-sports.io/players?season=2018&team=33");

//// Allows you to search for a venues in relation to a venue {name}, {city} or {country}

//PENDIENTE AGREGAR GIF DE INICIO
//PENDIENTE FILTRAR A 12 CARDS

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>

