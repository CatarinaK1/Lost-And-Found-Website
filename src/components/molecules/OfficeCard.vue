<script setup>
import {defineProps, ref, computed, defineEmits} from 'vue';
import { RouterLink } from 'vue-router';
import minus from '@/assets/images/minusr.png'
import minusw from '@/assets/images/minusw.png'

import location from '@/assets/images/location.png';
import phone from '@/assets/images/phone.png';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../stores/AuthStore';
const toast = useToast();

const authStore = useAuthStore();

const props = defineProps({
    details: Object,
});

const hover = ref(false)

const handleDelete = async (id) => {
    try {
        const response = await axios.delete(`/api/offices/${id}`);
        toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Error while deleting");
      console.error('Error while deleting:', error.response ? error.response.data : error.message);
    }
}

</script>

<template>
    <div class="bg-my-green rounded-xl shadow-md relative">
            <div v-if="authStore.getRole === 'ADMIN'" class="mt-2 flex justify-end">
              <button @click="handleDelete(props.details.id)" @mouseover="hover = true" @mouseleave="hover = false">
                <img class="max-h-5 h-auto w-auto mr-2" :src="hover ? minusw : minus">
              </button>
            </div>
            <div class="mb-2 p-4 flex flex-col  items-center">
              <div class="image-container w-full h-[20vh] overflow-hidden relative mb-6">
                <img :src="details.photo" alt="Office Photo" class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p class="text-my-white font-bold text-base">{{details.district.name}}</p>
              <div class="flex items-center mt-3 mb-3">
                  <img class="max-h-5 h-auto w-auto mr-2" :src="location" alt="location" />
                  <p class="text-my-white font-bold text-xs">{{details.address}}</p>
              </div>
              <div class="flex items-center mb-3">
                  <img class="max-h-5 h-auto w-auto mr-2" :src="phone" alt="phone" />
                  <p class="text-my-white font-bold text-xs">{{details.phoneNumber}}</p>
              </div>
              <RouterLink
                :to="'/offices/' + details.id"
                class="bg-my-white text-my-green font-bold hover:bg-my-gray hover:text-my-white mt-2 px-4 py-2 rounded-lg text-center text-sm"
              >
                Read More
                </RouterLink>
              </div>
          </div>
</template>