<script setup>
import OfficeCard from '@/components/molecules/OfficeCard.vue';

import {ref, onMounted,computed} from 'vue';
import axios from 'axios';

const offices = ref([]);
const selectedDistrict = ref("");

const districts = computed(() => {
  const allDistricts = offices.value.map(office => office.district);
  const uniqueDistricts = [...new Set(allDistricts)];

  return uniqueDistricts.sort((a, b) => Number(a) - Number(b));
});

const filteredOffices = computed(() => {
    if (!selectedDistrict.value) {
        return offices.value;
    }
    return offices.value.filter(office => office.district === selectedDistrict.value);
});

onMounted(async () => {
    try{
        const response = await axios.get('/api/offices');
        offices.value = response.data
    }catch(error){
        console.error('Error fetching jobs',error);
    }
})


</script>
<template>
    <div class="mb-6 mt-2 flex flex-col justify-center items-center">
        <label for="district" class="block mb-3 text-sm font-medium text-gray-700">Filter by District:</label>
        <select v-model="selectedDistrict" id="district" class="bg-my-white text-my-gray p-2 border border-my-gray rounded">
          <option value="">All Districts</option>
          <option v-for="district in districts" :key="district" :value="district">
            {{ district }}
          </option>
        </select>
    </div>
    <section class="bg-my-white px-8 py-10">
        <div class="m-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <OfficeCard v-for="office in filteredOffices" :key="office.id" :details="office"/>
            </div>
    </div>

    </section>
</template>