<script setup>
import AddOfficeForm from '@/components/organisms/AddOfficeForm.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    admin: Boolean
})


onMounted(() =>{
    if(!props.admin){
        router.push('/unauthorized');
    }
}
)


</script>

<template>
    <div class="w-full bg-my-white py-10 flex flex-col items-center">
      <div class="w-full">
        <div class="login-caption text-my-gray text-2xl text-center mb-4">
          Add new Office
        </div>
        <AddOfficeForm/>
      </div>
    </div>
  </template>
  
