<template>
    <div class="flex items-center justify-center bg-gray-100 ">
      <form @submit.prevent="handleSubmit" class="bg-my-white pb-6 rounded shadow-md w-80 px-10">
        <div class="mb-2 mt-3">
          <label for="salutation" class="block text-my-gray text-xs">Choose a salutation</label>
          <select id="salutation" name="salutation" v-model="salutation" placeholder="Choose salutation" class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs" required>
            <option value="miss">Ms</option>
            <option value="mrs">Mrs</option>
            <option value="mr">Mr</option>
            <option value="other">Other</option>
            <option value="not_set">I prefer not to answer</option>
          </select>
        </div>
        <div v-if="salutation == 'other'">
          <label for="personalizedSalutation" class="block text-my-gray text-xs">Please specify:</label>
          <input placeholder="Specify the salutation" 
                  id="personalizedSalutation" 
                  name="personalizedSalutation" 
                  v-model="personalizedSalutation"
                  @input="validateSalutation"
                  v-bind:class="{'border-red-500': issalutationerror}"  
                  class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs" required>
        </div>
        <div v-if="issalutationerror" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Salutation should not be longer than 30 signs</p>
        </div>
        <div class="mb-3 mt-3">
          <label for="name" class="block text-my-gray text-xs">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your name" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="surname" class="block text-my-gray text-xs">Surname</label>
          <input
            type="text"
            id="surname"
            v-model="surname"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your surname" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="username" class="block text-my-gray text-xs">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            v-bind:class="{'border-red-500': usernameFailed}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your username" required
          />
        </div>
        <div v-if="usernameFailed" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">This username is already taken</p>
        </div>
        <div class="mb-3 mt-3">
          <label for="mail" class="block text-my-gray text-xs">Email</label>
          <input
            type="email"
            id="mail"
            v-model="mail"
            @input="validatemail"
            v-bind:class="{'border-red-500': ismailError, 'border-red-500': mailFailed}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your email" required
          />
        </div>
        <div v-if="ismailError" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Email is invalid</p>
        </div>
        <div v-if="mailFailed" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">This email is already registered</p>
        </div>
        <div class="mt-3 mb-3">
          <label for="password" class="block text-my-gray text-xs">Password</label>
          <input
            type="password"
            @input="validatePasswordLength"
            id="password"
            v-model="password"
            v-bind:class="{'border-red-500': errorPassword || errorPasswordLength || errorPasswordSigns}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your password" required
          />
        </div>
        <div v-if="errorPasswordLength" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Password should contain between 8 and 12 characters</p>
        </div>
        <div v-if="errorPasswordSigns" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Password should contain at least one special sign and capital letter</p>
        </div>
        <div class="mt-3 mb-2">
          <label for="repeat_password" class="block text-my-gray text-xs">Repeat Password</label>
          <input
            type="password"
            id="repeat_password"
            v-model="repeat_password"
            @input="validatePassword"
            v-bind:class="{'border-red-500': errorPassword}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Repeat your password" required
          />
        </div>
        <div v-if="errorPassword" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Passwords should match</p>
        </div>
        <div class="mt-3 mb-2">
          <!-- Search -->
          <label for="search" class="block text-my-gray text-xs">Search Country</label>

          <!-- Search Input -->
          <input id="search" v-model="search" @input="handleInput" class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs" />
         
          <!-- Dropdown -->
          <div v-if="data.length > 0" id="dropdown" class="bg-my-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 max-h-40 overflow-y-auto">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li  v-for="item in data" :key="item.name" @click="setSearch(item.name.common)"class="px-4 py-2 text-xs">{{ item?.name?.common }}</li>
            </ul>
          </div>
        </div>


        <div class="mt-4 mb-3 flex items-center">
          <input type="checkbox" id="consent" name="consent" value="Consent" required>
          <label for="consent" class="block text-my-gray text-xs flex items-center mr-1 ml-2"> I have read and understood the </label>
          <RouterLink
            to="/rules"
            class="block text-my-gray text-xs hover:text-blue-700 text-decoration: underline;"
          >rules</RouterLink>
        </div>

        <ErrorModal :isOpen="isModalOpen" :message="modalError" @close="closeModal" />
        
        <button type="submit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, onMounted, computed} from 'vue';
  import axios from 'axios';
  import mark from '@/assets/images/exc_mark.png';
  import { useToast } from 'vue-toastification';
  import ErrorModal from '@/components/molecules/ErrorModal.vue';

const isModalOpen = ref(false); 
const modalError = ref(''); 

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = '';
}

const search = ref(null);
const initial_data = ref([])
const data = computed(() => {
  if (selectedCountry.value) {return [];}

  if (search.value) {
    return initial_data.value.filter(country =>
      country.name.common.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {

    const priorityList = initial_data.value.filter( country =>
      priorityCountries.includes(country.name.common)
    );
    const otherCountries = initial_data.value.filter(
      country => !priorityCountries.includes(country.name.common)
    );
    return [...priorityList, ...otherCountries];
  }
});


const setSearch = (value) =>{
  search.value = value;
  selectedCountry.value = value;
}


const handleInput = () => {
  selectedCountry.value = null;
};
  const toast = useToast();
  
  const emit = defineEmits(['register']);

  const selectedCountry = ref('')
  const salutation = ref('');  
  const username = ref('');
  const name = ref('');
  const surname = ref('');
  const mail = ref('');
  const password = ref('');
  const repeat_password = ref('');
  const errorPassword = ref(false);
  const ismailError = ref(false);
  const issalutationerror = ref(false)
  const usernameFailed = ref(false);
  const mailFailed = ref(false);
  const personalizedSalutation = ref('');
  const errorPasswordLength = ref(false);
  const errorPasswordSigns = ref(false);

  const priorityCountries = ['Austria', 'Germany', 'Switzerland'];
  
  onMounted(async () => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/all`);
    initial_data.value = res.data.sort((a, b) => {

      if(priorityCountries.includes(a.name.common) && priorityCountries.includes(b.name.common)){
        return priorityCountries.indexOf(a.name.common) - priorityCountries.indexOf(b.name.common);
      }

      else if(priorityCountries.includes(a.name.common)){
        return -1;
      } else if(priorityCountries.includes(b.name.common)){
        return 1;
      }
      return a.name.common.localeCompare(b.name.common);

    });
     
  } catch (err) {
    console.error('Error! Could not reach the API:', err); 
  }
});





  const validatemail = () => {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    ismailError.value = !mailRegex.test(mail.value);
  };

  const validateSalutation = () => {
    issalutationerror.value = personalizedSalutation.value.length > 30;
  };

  const validatePasswordLength = () => {
    validatePasswordSigns();
    errorPasswordLength.value = (password.value.length > 12 || password.value.length < 8);
  };

  const validatePasswordSigns = () => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
    errorPasswordSigns.value = !regex.test(password.value);
  }
  
  const validatePassword = () => {
    errorPassword.value = password.value !== repeat_password.value;
  };
  
  const handleSubmit = async () => {
    if(ismailError.value || issalutationerror.value || errorPassword.value || errorPasswordSigns.value || usernameFailed.value || mailFailed.value || errorPasswordLength.value){
      modalError.value = "Provide valid data"
      isModalOpen.value = true;
    }
    else{
      try {
      const newUser = {
          name: name.value,
          surname: surname.value,
          username: username.value,
          mail: mail.value,
          password: password.value,
          salutation: personalizedSalutation.value || salutation.value,
          country: selectedCountry.value
      }

        await axios.post('/api/auth/register', newUser);
        toast.success('Successfully registered');
        emit('register');
      
    }  catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        modalError.value = error.response.data || 'An error occurred';
      } else if (error.request) {
        modalError.value = 'Server does not respond.';
      } else {
        modalError.value = `Error: ${error.message}`;
      }
    } else {
      modalError.value = `Error: ${error.message}`;
    }
    isModalOpen.value = true;
  }
    }
    
  };
  </script>
  
  