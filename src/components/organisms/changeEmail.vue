<script setup>
import { ref } from "vue";
import * as yup from "yup";
import axios from "axios";
import ErrorModal from "@/components/molecules/ErrorModal.vue";
import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();
const token = authStore.getToken;

// State for password and email forms
const form = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const emailForm = ref({
  newEmail: "",
  password: "",
});

const errors = ref({});
const emailErrors = ref({});
const errorMessage = ref("");
const emailErrorMessage = ref("");
const successMessage = ref("");
const emailSuccessMessage = ref("");
const isLoading = ref(false);
const isEmailLoading = ref(false);
const isModalOpen = ref(false);
const modalError = ref("");

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = "";
};


const emit = defineEmits(['changed']);

const handleSubmit = async () => {
  const isValid = await validateEmailForm();
  if (!isValid) {
    return;
  }
  await changeEmail();
  emit("changed");
};

// Change Email Functionality
const changeEmail = async () => {
    
  try {
    isEmailLoading.value = true;
    const response = await axios.put(
      "/api/users/change-email",
      {
        newEmail: emailForm.value.newEmail,
        password: emailForm.value.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      emailSuccessMessage.value = "Email updated successfully!";
      emailErrorMessage.value = "";
      emailForm.value = { newEmail: "", password: "" };
    }
  } catch (error) {
    emailErrorMessage.value = error.response?.data || "An error occurred!";
    emailSuccessMessage.value = "";
  } finally {
    isEmailLoading.value = false;
  }
};

// Validation Schemas

const emailSchema = yup.object({
  newEmail: yup.string().required("New email is required.").email("Must be a valid email address."),
  password: yup.string().required("Password is required."),
});



const validateEmailForm = async () => {
  try {
    await emailSchema.validate(emailForm.value, { abortEarly: false });
    emailErrors.value = {};
    return true;
  } catch (validationError) {
    const validationErrors = {};
    validationError.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
    });
    emailErrors.value = validationErrors;
    return false;
  }
};


</script>


<style scoped>
.changeEmail input {
  background-color: white;
  color: black;
}

.error-message,
.success-message {
  font-size: 0.875rem;
}

.text-red-600 {
  font-size: 0.875rem;
}
</style>

<template>
    <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">  
      <div class="bg-my-green text-my-white p-6 rounded-lg shadow-md w-auto mt-6">
        <h2 class="text-lg font-bold mb-4 text-center">Change Email</h2>
        <form @submit.prevent="handleSubmit" class="changeEmail space-y-4">
          <div class="flex flex-col">
            <label for="newEmail" class="mb-2">New Email</label>
            <input
              v-model="emailForm.newEmail"
              type="email"
              id="newEmail"
              class="p-2 rounded-lg border border-gray-300"
            />
            <span v-if="emailErrors.newEmail" class="text-red-600 text-sm">{{ emailErrors.newEmail }}</span>
          </div>
          <div class="flex flex-col">
            <label for="password" class="mb-2">Password</label>
            <input
              v-model="emailForm.password"
              type="password"
              id="password"
              class="p-2 rounded-lg border border-gray-300"
            />
            <span v-if="emailErrors.password" class="text-red-600 text-sm">{{ emailErrors.password }}</span>
          </div>
          <div v-if="emailErrorMessage" class="error-message bg-red-200 text-red-800 p-2 rounded-lg">
            {{ emailErrorMessage }}
          </div>
          <div v-if="emailSuccessMessage" class="success-message bg-green-200 text-green-800 p-2 rounded-lg">
            {{ emailSuccessMessage }}
          </div>
          <button
            type="submit"
            class="w-full bg-my-white text-my-green text-sm font-bold rounded-lg shadow-md p-2 hover:bg-gray-900 hover:text-white transition duration-300"
            :disabled="isEmailLoading"
          >
            <span v-if="!isEmailLoading">Update Email</span>
            <span v-else>Loading...</span>
          </button>
        </form>
      </div>
      <ErrorModal v-if="isModalOpen" :error="modalError" @close="closeModal" />
    </div>
  </template>
  
  