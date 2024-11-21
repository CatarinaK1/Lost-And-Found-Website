<script setup>
import { defineProps, onMounted } from 'vue';
import location from '@/assets/images/location_black.png'
import phone from '@/assets/images/phone_black.png'
import district from '@/assets/images/district.png'

const props = defineProps({
    office: Object
})

</script>


<template>
    <div v-if="office" class="flex flex-col items-center">
  <div class="flex flex-col">
    <div class="flex flex-col rounded-lg justify-center items-center bg-my-green mt-4 mb-4 px-4">
      <div class="text-my-white font-bold text-2xl text-center mt-6 mb-6">
        {{ props.office.district.name }}
      </div>
      <div class="w-full h-1 bg-my-white mb-2"></div>
      <div class="flex flex-col bg-my-green mb-4 mt-4 rounded-xl">
        <div class="image-container rounded-xl w-[80vh] h-[50vh] overflow-hidden relative mb-6">
          <img :src="'data:image/jpeg;base64,' + props.office.photo" alt="Office Photo" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="bg-my-white rounded-xl mb-2 p-2 flex flex-col justify-center items-center">
          <div class="flex items-center mt-2 mb-1">
            <img class="max-h-5 h-auto w-auto mr-2" :src="district" alt="district" />
            <p class="text-my-gray font-bold text-base">{{ props.office.district.id }}. {{ props.office.district.name }}</p>
          </div>
          <div class="flex items-center mt-1 mb-1">
            <img class="max-h-5 h-auto w-auto mr-2" :src="location" alt="location" />
            <p class="text-my-gray font-bold text-sm">{{ props.office.address }}</p>
          </div>
          <div class="flex items-center mb-2 mt-1">
            <img class="max-h-5 h-auto w-auto mr-2" :src="phone" alt="phone" />
            <p class="text-my-gray font-bold text-sm">{{ props.office.phoneNumber }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col bg-my-gray rounded-xl mb-6 p-3 relative justify-center items-center">
      <p class="text-my-white text-base mb-2">Description</p>
      <div class="w-full h-0.5 bg-my-white mb-2"></div>
      <p class="text-my-white text-center text-sm">{{ props.office.description }}</p>
    </div>
  </div>
</div>

</template>