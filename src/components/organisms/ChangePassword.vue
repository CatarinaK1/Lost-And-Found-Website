<template>
  <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
    <div class="bg-my-green text-my-white p-6 rounded-lg shadow-md w-auto">
      <h2 class="text-lg font-bold mb-4 text-center">Change Password</h2>
      <form @submit.prevent="handleSubmit" class="password-form space-y-4">
        <div class="flex flex-col">
          <label for="oldPassword" class="mb-2">Old Password</label>
          <input
            v-model="form.oldPassword"
            type="password"
            id="oldPassword"
            class="p-2 rounded-lg border border-gray-300"
          />
          <span v-if="errors.oldPassword" class="text-red-600 text-sm">{{ errors.oldPassword }}</span>
        </div>
        <div class="flex flex-col">
          <label for="newPassword" class="mb-2">New Password</label>
          <input
            v-model="form.newPassword"
            type="password"
            id="newPassword"
            class="p-2 rounded-lg border border-gray-300"
          />
          <span v-if="errors.newPassword" class="text-red-600 text-sm">{{ errors.newPassword }}</span>
        </div>
        <div class="flex flex-col">
          <label for="confirmPassword" class="mb-2">Confirm New Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirmPassword"
            class="p-2 rounded-lg border border-gray-300"
          />
          <span v-if="errors.confirmPassword" class="text-red-600 text-sm">{{ errors.confirmPassword }}</span>
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
    <ErrorModal v-if="isModalOpen" :error="modalError" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import axios from "axios";
import ErrorModal from "@/components/molecules/ErrorModal.vue";
import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();
const token = authStore.getToken;

const form = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const errors = ref({});
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);
const isModalOpen = ref(false);
const modalError = ref("");

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = "";
};

const schema = yup.object({
  oldPassword: yup.string().required("Old password is required."),
  newPassword: yup
    .string()
    .required("New password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(12, "Password should not exceed 12 characters")
    .matches(/[A-Z]/, "Password must include an uppercase letter.")
    .matches(/[0-9]/, "Password must include a number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must include a special character."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match.")
    .required("Please confirm your password."),
});

const validateForm = async () => {
  try {
    await schema.validate(form.value, { abortEarly: false });
    errors.value = {};
    return true;
  } catch (validationError) {
    const validationErrors = {};
    validationError.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
    });
    errors.value = validationErrors;
    return false;
  }
};

const handleSubmit = async () => {
  const isValid = await validateForm();
  if (!isValid) {
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post(
      "/api/auth/change-password",
      {
        oldPassword: form.value.oldPassword,
        newPassword: form.value.newPassword,
        confirmPassword: form.value.confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      successMessage.value = "Password updated successfully!";
      errorMessage.value = "";
      form.value = { oldPassword: "", newPassword: "", confirmPassword: "" };
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
