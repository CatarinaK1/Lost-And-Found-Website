import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const role = ref(null);

  const token = ref(null);

  const getRole = computed(() => role.value);
  const setRole = (newRole) => {
    role.value = newRole;
  }

  const getToken = computed(() => token.value);

  const getUser = computed(() => user.value);

  const removeToken = () =>{
    token.value = null;
  };


  const setToken = (newToken) => {
    token.value = newToken;
  }

  
  const setUser = (newUser) => {
    user.value = newUser;
  };

  return {
    user,
    setUser,
    getUser,
    getRole,
    setRole,
    getToken,
    setToken,
    removeToken
  };
});