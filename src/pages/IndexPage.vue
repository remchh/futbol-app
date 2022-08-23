<template>
  <q-page class="q-pa-md">
      <q-input
        v-model="search"
        @keyup.enter="getResults"
        placeholder="Enter the name of the stadium, city or country"
        standout="dark text-white"
        :disable="disable"
   
        >
        <template v-slot:append>
         <q-icon
            @click="getResults" 
            name="search"
            type="submit"
          />
        </template>
      </q-input>

      <br/>

      <VueRecaptcha
        class="flex flex-center"
        :sitekey="siteKey"
        @verify="handleSuccess"
        @error="handleError"
        @expired="handleExpire"
        ref="recaptcha"
      ></VueRecaptcha>


      <div class="row justify-around">
        <div
          class="col q-pa-lg q-mt-md"
          v-if="!stadiumData"
          >
          <q-img 
          src="https://media.giphy.com/media/JmrkCxoxJm5OW3mv0Z/giphy.gif"
          />
        </div>
        <div
          v-for="(item, index) in sortData"
          :key="item[index]"
          class="col-md-4 col-sm-6 col-xs-12 q-pa-lg q-mt-md flex flex-center"
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
import { defineComponent, ref, computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { VueRecaptcha } from 'vue-recaptcha';

export default defineComponent({
  name: 'IndexPage',
  name: 'ReCaptcha',
    components: {
    VueRecaptcha
  },

  setup () {

    const $q = useQuasar()
    const search = ref('')
    const apiKey = computed(() => {
      return process.env.VUE_APP_API_KEY
    })
    const baseUrl = ref('https://v3.football.api-sports.io')
    const stadiumData = ref('')

    const getResults = async () => {
      try {
        $q.loading.show()
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
          $q.notify({
          icon: 'warning',
          progress: true,
          color: 'negative',
          message: 'Please try to enter a valid name of a stadium, city or country. Thank you!',
          position: 'center',
          })
        } else {
          stadiumData.value.sort((a,b) => (b.capacity - a.capacity))
          search.value=''

          console.log(response.data.response.length)
          console.log(response.data.response)
          console.log(stadiumData.value)
          console.log(stadiumData.value.slice(0, 12))
          console.log(sortData.value)

          disable.value=true
          recaptcha.value.reset()
        }
        
      }
      catch(err) {
        console.log(err.message)
      }
      $q.loading.hide()
    }

    const sortData = computed(() => stadiumData.value.slice(0, 12))

/*RECAPTCHA*/

    const siteKey = computed(() => {
      return '6LfplGYhAAAAACox6XCtc3UjkCSO678toQnzRqsG'
    })
    const disable = ref(true)
    const recaptcha = ref(null)
    const handleError = () => {
      console.log('an error ocurred')
    }
    const handleSuccess = () => {
      disable.value = !disable.value
      console.log('an event ocurred')   
    }
    const handleExpire = () => {
      disable.value = !disable.value
    }


    return {
            search, 
            getResults, 
            stadiumData,
            sortData,
            siteKey,
            handleError,
            handleSuccess,
            handleExpire,
            disable,
            recaptcha,
            apiKey
          }
  }

})


</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px

</style>

