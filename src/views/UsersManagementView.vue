<script setup>
import UserManagementTable from '@/components/organisms/UserManagementTable.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() =>{
  if(authStore.getRole !== 'ADMIN'){
    router.push('/unauthorized');
  }
})
</script>

<template>
  <div class="w-full bg-my-white py-10 flex flex-col space-y-6 items-center">
    <div class="w-full">
      <div class="font-bold text-my-green text-2xl text-center mb-4">
        Manage users of the system
      </div>
      <div class="text-my-green text-lg text-center mb-6">
        Below you can delete or change password of particular users
      </div>
      <UserManagementTable />
    </div>
  </div>
</template>