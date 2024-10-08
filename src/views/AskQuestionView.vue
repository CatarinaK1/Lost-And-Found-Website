<script setup>
import AskQuestionForm from '@/components/organisms/AskQuestionForm.vue';
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['addedQuestion']);
const router = useRouter(); 

const handleAddedQuestion = () => {
  router.push('/faq')
};

</script>

<template>
    <div class="w-full bg-my-white py-10 flex flex-col items-center">
      <div class="w-full">
        <div class="login-caption text-my-gray text-2xl text-center mb-4">
          Ask a question
        </div>
        <AskQuestionForm @addedQuestion="handleAddedQuestion"/>
      </div>
    </div>
</template>
  
