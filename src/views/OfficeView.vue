<script setup>
import {useRouter, useRoute} from 'vue-router';
import {ref, onMounted} from 'vue';
import axios from 'axios'
import OfficeInfo from '../components/organisms/OfficeInfo.vue';

const route = useRoute();
const router = useRouter();
const officeId = route.params.id;

const office = ref(null);


onMounted(async () => {
    try{
        const response = await axios.get(`/api/offices/${officeId}`);
        office.value = response.data
    }catch(error){
        if(error.response.status === 404){
            router.push('/error')
        }
    }
})


</script>

<template>
    <div class="w-full bg-my-white py-10 px-80 flex flex-col items-center">
        <OfficeInfo :office="office" />
    </div>
</template>