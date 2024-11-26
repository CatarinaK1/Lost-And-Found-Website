<script setup>
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