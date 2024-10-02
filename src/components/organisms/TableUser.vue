<script setup>
import { ref, defineProps, onMounted } from 'vue';


const props = defineProps({
    userDetail: Object,
});


</script>

<template>
    <div v-if="props.userDetail" class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
      <div class="bg-my-green text-my-white p-6 rounded-lg shadow-md w-auto">
        <table class="table-auto w-full">
          <tbody>
            <tr>
              <td class="pr-4">Username:</td>
              <td class="text-right">{{ userDetail.username }}</td>
            </tr>
            <tr>
              <td class="pr-4">Name:</td>
              <td class="text-right">{{ userDetail.name }}</td>
            </tr>
            <tr>
              <td class="pr-4">Surname:</td>
              <td class="text-right">{{ userDetail.surname }}</td>
            </tr>
            <tr>
              <td class="pr-4">Email:</td>
              <td class="text-right">{{ userDetail.mail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  