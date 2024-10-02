<script setup>
import { defineProps } from 'vue';
import location from '@/assets/images/location_black.png'
import phone from '@/assets/images/phone_black.png'
import district from '@/assets/images/district.png'

const props = defineProps({
    office: Object
})
</script>


<template>
    <div v-if="props.office">
    <div class="flex flex-col rounded-lg justify-center items-center bg-my-green mt-4 mb-4 px-4">
      <div class="text-my-white font-bold text-2xl text-center mt-6 mb-6">
        {{ props.office.name }}
      </div>
      <div class="w-full h-1 bg-my-white mb-2"></div>
      <div class="flex bg-my-green mb-4 mt-4 rounded-xl relative">
        <div class="image-container ml-2 mr-2 mb-2 p-2 w-[60vh] h-auto overflow-hidden rounded-xl relative">
                <img :src="props.office.photo" alt="Office Photo" class="absolute inset-0 w-[60vh] h-full object-cover" />
            </div>
        <div class="bg-my-white rounded-xl ml-2 mr-2 mb-2 p-2 flex flex-col justify-center items-center">
            <div class="flex items-center mt-2 mb-1">
                <img class="max-h-5 h-auto w-auto mr-2" :src="district" alt="district" />
                <p class="text-my-gray font-bold text-base">{{props.office.district}}. {{ props.office.name }}</p>
            </div>
            
            <div class="flex items-center mt-1 mb-1">
                <img class="max-h-5 h-auto w-auto mr-2" :src="location" alt="location" />
                <p class="text-my-gray font-bold text-xs">{{props.office.address}}</p>
            </div>
            <div class="flex items-center mb-2 mt-1">
                <img class="max-h-5 h-auto w-auto mr-2" :src="phone" alt="phone" />
                <p class="text-my-gray font-bold text-xs">{{props.office.phoneNumber}}</p>
            </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-my-gray rounded-xl  mb-6 p-3 relative">
        <p class="text-my-white text-sm mb-2">Description</p>
        <div class="w-full h-0.5 bg-my-white mb-2"></div>
        <p class="text-my-white text-xs">{{props.office.description}} </p>
      </div>
    </div>
    <div v-else class="text-my-green font-bold text-2xl text-center mb-6">
        <p>Page not found</p>
    </div>
    
    
</template>