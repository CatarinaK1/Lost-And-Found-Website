import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const role = ref(null);

  const getRole = computed(() => role.value);
  const setRole = (newRole) => {
    role.value = newRole;
  }

  const getUser = computed(() => user.value);

  const setUser = (newUser) => {
    user.value = newUser;
  };

  return {
    user,
    setUser,
    getUser,
    getRole,
    setRole,
  };
});