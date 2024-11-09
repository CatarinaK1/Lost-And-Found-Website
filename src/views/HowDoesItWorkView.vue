<script>
import HowItWorksSection from '@/components/organisms/HowItWorksSteps.vue';
import RegisterNowLink from '../components/molecules/RegisterNowLink.vue';

// Import Icons
import fillFormGreenImage from '@/assets/images/icons/assignment_add-green.png';
import createUserImage from '@/assets/images/icons/person_check-green.png';
import sendItemImage from '@/assets/images/icons/local_post_office-green.png';
import celebrationImage from '@/assets/images/icons/celebration-green.png';



import createUserImageWhite from '@/assets/images/icons/person_check-white.png';
import catalogImage from '@/assets/images/icons/format_list_bulleted2.png';
import detailImage from '@/assets/images/icons/find_in_page2.png';
import deliverImage from '@/assets/images/icons/orders.png';



// import fillFormGreen from '@/assets/images/icons/assignment_add-green.png';



export default {
  components: {
    HowItWorksSection,
    RegisterNowLink

  },
  data() {
    return {
      createUserImage,
      fillFormGreenImage,
      sendItemImage,
      celebrationImage,
      createUserImageWhite,
      catalogImage,
      detailImage,
      deliverImage


    };
  }
}


</script>

<style scoped>
.steps-columns {
  display: flex; /* Use flexbox to align components side by side */
  justify-content: space-evenly; /* Align columns and create equal space around them */
  gap: 20px; /* Add some gap between the components */
  padding: 20px;
}

.found-item-step {
  background-color: #79ba6a; /* Set green background for the found items section */
  padding: 20px; /* Add some padding inside the box */
  border-radius: 8px; /* Optional: Rounded corners */
}

/* Make each section take 50% of the container's width */
.steps-columns > * {
  flex: 1; /* Each section will take equal space */
  max-width: 30%; /* Limit the maximum width of each column */

}


.page-title {
  display: flex;
  flex-direction: column;
  height: 50vh; /* Viewport height to center vertically */
  align-items: center; /* Centers the h1 horizontally */
  justify-content: center; /* Optional: Use this for vertical centering */
  text-align: center;
  padding: 20px 0;
}

h1 {
  font-size: 60px;
  margin-bottom: 10px;
  font-style: bold;
  color:#56B040;
}

hr {
  /* width: 100px; */
  border: 4px solid #56B040;
  margin-bottom: 10px;
}

p{
    margin-top: 2%;

}

.page-title p{
  color: #56B040;
  font-size: 1.3em;
}

</style>




<template>
  
  <div class="page-title">
    <h1>How Does it Work?</h1>
    <p >Check below what you should do if...</p>
  </div>


  <div class="steps-columns">
  <HowItWorksSection
    title="...you found an item"
    :stepTitle="[
      'Register',
      'Fill the form',
      'Deliver the item',
      'Thank you!'
    ]"
    :images="[
      createUserImage,
      fillFormGreenImage,
      sendItemImage,
      celebrationImage
    ]"
    :steps="[
      'The first step is to register. You can do it by clicking in the register button',
      'Provide us with as many details as possible here',
      'Choose the preferred office and bring the item to it',
      'We will inform you if anybody picked up the item you found',
    ]"
  />


  <div class="found-item-step">
  <HowItWorksSection
    title="...you lost an item"
    :stepTitle="[
      'Register',
      'Browse the catalog',
      'See the details',
      'Pick up your item'
    ]"
    :images="[
      createUserImageWhite,
      catalogImage,
      detailImage,
      deliverImage,
    ]"
    :steps="[
      'The first step is to register. You can do it by clicking in the register button',
      'Use filters to find what you have lost',
      'Read the item\’s detailed description.',
      'Check where your item is and pick it up',
    ]"
  /></div>
</div>

  <RegisterNowLink
  
    text="Ready to get started? Create an account today and make a difference!"
    linkText="Create an account"
    linkTo="/register"

  />

</template>
