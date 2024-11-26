<template>
  <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
    <div class="bg-my-green text-my-white p-6 rounded-lg shadow-md w-auto">
      <h2 class="text-lg font-bold mb-4 text-center">Change Password</h2>
      <form @submit.prevent="changePassword" class="password-form space-y-4">
        <div class="flex flex-col">
          <label for="oldPassword" class="mb-2">Old Password</label>
          <input
            v-model="oldPassword"
            type="password"
            id="oldPassword"
            class="p-2 rounded-lg border border-gray-300"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="newPassword" class="mb-2">New Password</label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            class="p-2 rounded-lg border border-gray-300"
            @input="validateNewPassword"
            required
          />
          <span v-if="passwordError" class="text-red-600 text-sm">{{ passwordError }}</span>
        </div>
        <div class="flex flex-col">
          <label for="confirmPassword" class="mb-2">Confirm New Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="p-2 rounded-lg border border-gray-300"
            required
          />
        </div>
        <div v-if="errorMessage" class="error-message bg-red-200 text-red-800 p-2 rounded-lg">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="success-message bg-green-200 text-green-800 p-2 rounded-lg">
          {{ successMessage }}
        </div>
        <button
          type="submit"
          class="w-full bg-my-white text-my-green text-sm font-bold rounded-lg shadow-md p-2 hover:bg-gray-900 hover:text-white transition duration-300"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Update Password</span>
          <span v-else>Loading...</span>
        </button>
      </form>
    </div>

    <ErrorModal 
      v-if="isModalOpen" 
      :error="modalError" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ErrorModal from "@/components/molecules/ErrorModal.vue";
import { useAuthStore } from '../../stores/AuthStore';

const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const passwordError = ref("");
const isLoading = ref(false);
const isModalOpen = ref(false);
const modalError = ref("");
const authStore = useAuthStore();

const token =  authStore.getToken

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = "";
};

const validateNewPassword = () => {
  const value = newPassword.value;
  if (!value) {
    passwordError.value = "New password is required.";
  } else if (value.length < 8) {
    passwordError.value = "Password must be at least 8 characters.";
  } else if (!/[A-Z]/.test(value)) {
    passwordError.value = "Password must include an uppercase letter.";
  } else if (!/[a-z]/.test(value)) {
    passwordError.value = "Password must include a lowercase letter.";
  } else if (!/[0-9]/.test(value)) {
    passwordError.value = "Password must include a number.";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    passwordError.value = "Password must include a special character.";
  } else {
    passwordError.value = "";
  }
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!";
    successMessage.value = "";
    return;
  }

  if (passwordError.value) {
    modalError.value = passwordError.value;
    isModalOpen.value = true;
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post(
      "/api/auth/change-password",
      {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      errorMessage.value = "";
      successMessage.value = "Password updated successfully!";
      oldPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    }
  } catch (error) {
    errorMessage.value = error.response?.data || "An error occurred!";
    successMessage.value = "";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.password-form input {
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
