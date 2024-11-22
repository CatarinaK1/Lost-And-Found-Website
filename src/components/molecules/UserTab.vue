<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';
import minusw from "@/assets/images/minusw.png"
import user from '@/assets/images/user.png'
import minusr from "@/assets/images/minusr.png"
import wpen from "@/assets/images/whitepen.png"
import rpen from "@/assets/images/redpen.png"
import { useToast } from 'vue-toastification';
const toast = useToast();

const hover = ref(false);
const hoverr = ref(false);
const props = defineProps({
    data: Object
})

const showOptions = ref(false);

const editMode = ref(false);

const editModeOn = () =>{
    editMode.value = !editMode.value
    hoverr.value = false
    hover.value = false
    showOptions.value = true;
}


const toggle = () =>{
    hover.value = false;
    hoverr.value = false;
    showOptions.value = !showOptions.value;
}


const deleteUser = async() =>{
    try{
        await axios.delete('/api/users',{
      data: props.data.username,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
      })
    }  catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if(error.response.request.status === 400){
            toast.error('Fill all the fields including uploading the picture')
          }
          else{
            toast.error('Error ' + error.response.request.status);
          }
        } else if (error.request) {
          toast.error('Server does not respond.');
        } else {
        toast.error(`Error: ${error.message}`);
        console.log('Error');
        }
      } else {
        toast.error(`Error: ${error.message}`);
        console.log('Error');
      }
    }

}


const submitChanges = async() => {
    try {
      const updUser = {
          username: props.data.username,
          photo: null
      }
      await axios.put('/api/users', updUser, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      editMode.value = false;
    }  catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if(error.response.request.status === 400){
            toast.error('Fill all the fields including uploading the picture')
          }
          else{
            toast.error('Error ' + error.response.request.status);
          }
        } else if (error.request) {
          toast.error('Server does not respond.');
        } else {
        toast.error(`Error: ${error.message}`);
        console.log('Error');
        }
      } else {
        toast.error(`Error: ${error.message}`);
        console.log('Error');
      }
    }
}

</script>
<template>
    <div class="max-w-lg flex flex-col border-2 rounded-lg border-my-green text-my-white p-2 mb-4 bg-my-green">
        <div v-if="showOptions" class="flex flex-col justify-center items-center space-y-2 py-2">
        <div v-if="props.data.photo" class="flex flex-col justify-center items-center py-2">
            <div v-if="editMode" class="mb-1 mt-1 flex flex-col items-center">
                <img :src="'data:image/jpeg;base64,' + props.data.photo" alt="Image" class="rounded lg mb-2 h-40 w-auto border border-my-green"/>
                <button type="button" @click="submitChanges" class="bg-my-green text-my-white text-xs rounded w-full border border-my-white p-2 hover:bg-gray-900 hover:text-white transition duration-300">Delete photo</button> 
            </div>
            <div v-else>
                <img  :src="'data:image/jpeg;base64,' + props.data.photo" alt="Image" class="w-32 h-32 rounded-full mb-4 object-cover" />
            </div>
            </div>
        <div v-else class="flex flex-col justify-center items-center py-2">
          <img :src="user" alt="Default Profile Image" class="w-32 h-32 rounded-full mb-2 object-cover" />
        </div>
        <div class="w-full text-center">Name: {{ props.data.name }}</div>
        <div class="w-full text-center">Surname: {{ props.data.surname }}</div>
        <div class="w-full text-center">Username: {{ props.data.username }}</div>
        <div class="w-full text-center">Email: {{ props.data.mail }}</div>
        <div class="flex justify-center items-center space-x-4 py-2">
            <button @mouseover="hover = true" @mouseleave="hover = false" @click="deleteUser" class="flex items-center">
                <img class="w-5 h-5" :src="hover ? minusr : minusw">
            </button>
            <button @mouseover="hoverr = true" @mouseleave="hoverr = false" @click="editModeOn" class="flex items-center">
                <img class="w-5 h-5" :src="hoverr ? rpen : wpen">
            </button>
            <button @click="toggle" class="flex items-center">
                Less
            </button>
        </div>
        </div>
        <div v-else class="flex justify-between items-center space-x-4 py-2">
    <div class='font-bold flex items-center mr-8'>
        {{ props.data.name }} {{ props.data.surname }}
    </div>
    <div class="flex items-center space-x-2">
        <button @mouseover="hover = true" @mouseleave="hover = false" @click="deleteUser" class="flex items-center">
            <img class="w-5 h-5" :src="hover ? minusr : minusw">
        </button>
        <button @mouseover="hoverr = true" @mouseleave="hoverr = false" @click="editModeOn" class="flex items-center">
            <img class="w-5 h-5" :src="hoverr ? rpen : wpen">
        </button>
        <button @click="toggle" class="flex items-center">
            More
        </button>
    </div>
</div>
        
    </div>
    
</template>