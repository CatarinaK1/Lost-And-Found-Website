<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';
import axios from 'axios';
import user from '@/assets/images/user.png';
import ErrorModal from '../molecules/ErrorModal.vue';
import UserItem from '@/components/molecules/UserItem.vue';
import { useAuthStore } from '../../stores/AuthStore';
import ItemDetails from './ItemDetails.vue';


const authStore = useAuthStore();
const props = defineProps({
  userDetail: Object,
});

const userItems = ref(null);

onMounted(async() => {
    try{
        if(authStore.getToken){
            const response = await axios.get("/api/added_found_items", {
                headers: {
                    'Authorization': `Bearer ${authStore.getToken}`,
                }
            })
            if (response.data) {
                userItems.value = response.data;
            } else {
                userItems.value = null;
            }}
  } catch (error) {
    console.error('Error fetching user items:', error);
  }
 }
)

</script>
<template>
    <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">  
      <div class="bg-my-white text-my-green p-6 rounded-lg w-auto mt-6">
        <h2 class="text-lg font-bold mb-4 text-center">Found items you posted</h2>
            <section v-if="userItems" class="flex flex-col items-center bg-my-white px-8 py-10">
                <div class="m-auto">
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        <UserItem v-for="item in userItems" :key="item.id" :details="item"/>
                    </div>
                </div>
            </section>
            <section v-else>
                <p class="text-md font-bold mb-4 text-center">You have not posted anything yet</p>
            </section>
      </div>
    </div>
</template>