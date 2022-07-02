<template>
  <q-page class="q-pa-md">
      <q-input
        @keyup.enter="getResults"
        type="search"
        placeholder="Ingresa tu equipo"
        >
        <template v-slot:append>
          <q-icon name="search" @click="getResults" />
        </template>
      </q-input>
  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const apiKey = ref('b6004fba06b499ba6cd2b7b7e00939f5')
    const baseUrl = ref('https://v3.football.api-sports.io')
    const futbolData = ref(null)
    
    const getResults = () => {
      console.log('GREAT')
      axios(`${baseUrl.value}/players/squads?team=33`, {
          method: 'get',
          headers: {
          'x-rapidapi-key': apiKey.value,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      })
      .then(response => {
        futbolData.value = response.data
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      })


    }

    return {getResults, futbolData}
  }

})

</script>
