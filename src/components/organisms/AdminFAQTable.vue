<script setup>
import { ref, watch, defineEmits, onMounted  } from 'vue';
import axios from 'axios';
import FAQTab from '@/components/molecules/FAQTab.vue';
import { useAuthStore } from '@/stores/AuthStore';


const authStore = useAuthStore();


const props = defineProps({
  faqs: Array,
});



// Emit event to parent
const emit = defineEmits(['refresh']);


const approvedFaqs = ref([]);
const notApprovedFaqs = ref([]);

// For editing a FAQ
const selectedFaq = ref(null);

const cancelEdit = () => {
  selectedFaq.value = null; // Properly reset the modal
};




// Categorize FAQs based on the `approved` field
const categorizeFaqs = () => {
  approvedFaqs.value = props.faqs.filter((faqs) => faqs.approved === true);
  notApprovedFaqs.value = props.faqs.filter((faqs) => faqs.approved === false);
};


onMounted(() => {
  categorizeFaqs(); // Categorize FAQs initially
});

watch(
  () => props.faqs,
  (newFaqs) => {
    if (newFaqs) {
      categorizeFaqs(); // Re-categorize FAQs if props.faqs changes
    }
  }
);


// Approve FAQ
const approveFaq = async (id) => {
  try {
    await axios.put(
      `/api/faqs/${id}/approve`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
      }
    );
    emit('refresh'); 
  } catch (error) {
    console.error('Error approving FAQ:', error);
  }
};

// Delete FAQ
const deleteFaq = async (id) => {
  try {

    await axios.delete(`/api/faqs/${id}/delete`, {
      headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
    });
    emit('refresh'); // Signal parent to refresh data
  } catch (error) {
    console.error('Error deleting FAQ:', error);
  }
};

// Update FAQ
const updateFaq = async (id, updatedData) => {

  try {
    console.log(updatedData);
    await axios.put(`/api/faqs/${id}/update`, updatedData, {
      headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
    });
    
    emit('refresh'); // Signal parent to refresh data
  } catch (error) {
    console.error('Error updating FAQ:', error);
  }
};
</script>

<template>
  <!-- Container for the FAQ section -->
  <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
    <div class="bg-my-white text-my-gray px-4 pt-4 rounded-lg shadow-md border-2 border-my-green w-auto">
      <!-- Approved FAQs Section -->
      <h3 class="text-xl font-bold mb-4">Approved FAQs</h3>
      <div v-for="faq in approvedFaqs" :key="faq.id" class="mb-4">
        <FAQTab :data="faq" />
        <div class="flex space-x-4 mt-2">
          <button @click="deleteFaq(faq.id)" class="text-red-500">Delete</button>
          <button @click="selectedFaq = { ...faq }" class="text-blue-500">Edit</button>
        </div>
      </div>

      <!-- Not Approved FAQs Section -->
      <h3 class="text-xl font-bold mb-4">FAQs Awaiting approval </h3>
      <div v-for="faq in notApprovedFaqs" :key="faq.id" class="mb-4">
        <FAQTab :data="faq" />
        <div class="flex space-x-4 mt-2">
          <button @click="approveFaq(faq.id)" class="text-green-500">Approve</button>
          <button @click="deleteFaq(faq.id)" class="text-red-500">Delete</button>
          <button @click="selectedFaq = { ...faq }" class="text-blue-500">Edit</button>
        </div>
      </div>

      <!-- Edit FAQ Modal -->
      <div v-if="selectedFaq" class="mt-4">
        <h3 class="text-lg font-bold mb-2">Edit FAQ</h3>
        <input v-model="selectedFaq.question" placeholder="Question" class="border border-gray-300 p-2 rounded w-full mb-2" />
        <input v-model="selectedFaq.answer" placeholder="Answer" class="border border-gray-300 p-2 rounded w-full mb-2" />
        <button @click="updateFaq(selectedFaq.id, selectedFaq)" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button @click="cancelEdit" class="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
</template>
