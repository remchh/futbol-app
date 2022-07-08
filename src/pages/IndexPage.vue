<template>
  <q-page class="q-pa-md">
      <q-input
        v-model="search"
        @keyup.enter="getResults"
        placeholder="Ingresa un nombre de equipo o ciudad"
        >
        <template v-slot:append>
         <q-icon
            @click="getResults" 
            name="search"
          />
        </template>
      </q-input>
      <div class="col q-pa-md q-mt-md">
        <div class="text-h6 text-weight-regular">
          Nombre del estadio: <br> {{stadiumData.name}}
        </div>
        <div class="text-h6 text-weight-regular">
          Capacidad: {{stadiumData.capacity}}
        </div>
        <div class="text-h6 text-weight-regular">
          Ciudad: {{stadiumData.city}}
        </div>
        <div class="text-h6 text-weight-regular">
          Pais: {{stadiumData.country}}
        </div>
        <div class="q-mt-md">
          <q-img
          :src="stadiumData.image"
          />
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const search = ref('')
    const apiKey = ref('b6004fba06b499ba6cd2b7b7e00939f5')
    const baseUrl = ref('https://v3.football.api-sports.io')
    const stadiumData = ref('')

    const getResults = async () => {
      try {
        console.log('GREAT')
        const response = await axios(`${baseUrl.value}/venues?search=${search.value}`, {
          method: 'get',
          headers: {
          'x-rapidapi-key': apiKey.value,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      })

        stadiumData.value = response.data.response[0]
        search.value=''
        //console.log(response.data.response[0].players)
        //console.log(response.data.response[0].name)
        //console.log(stadiumData.value)
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

</script>

