<script>
    export default {
    props: {
        image: {
        type: String,
        required: true
        },
        header: {
        type: String,
        required: true
        },
        text: {
        type: String,
        required: true
        },
        linkTo:{
            type: String,
            required: true
        },
        linkText:{
            type: String,
            required: true
        },
        reverse: {
            type: Boolean,
            default: false
        }
    }
    }
</script>


<style scoped>

/* Container for the text and image columns */
.home-about-section {
  display: flex;
  flex-direction: row;
  gap: 5%;
  max-width: 1200px; /* Set maximum width to control the container */
  margin: 10px auto; /* Center the container horizontally */
  padding: 20px;
  margin-top: 5%;
  justify-content: center;
  align-items: center;
}
/* Text section */
.text-section {
  width: 45%; /* Takes up half of the space */
  padding: 20px;
}

/* Image wrapper section */
.image-wrapper {
  position: relative;
  width: 55%; /* Takes up the other half of the space */
}



/* The image itself */
.about-image {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9; /* Set the desired aspect ratio for a rectangular shape */
  border-radius: 10px; /* Optional: Add rounded corners */
  object-fit: cover; /* Ensures the image fills the container without squishing */
}

/* Headings and text */
h2 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 1px 1.2px #828282;
}

hr {
  border: 3px solid #56B040;
  margin-bottom: 10px;
}

p {
  margin-top: 8%;
  font-weight: light;
}
.link {
  padding: 10px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  display: inherit; 
  margin-top: 20px; /* Add space above the button */
  text-align: center;
  text-decoration: none;
  justify-self: center;
}

</style>




<template>
    <div class="home-about-section">

      <!-- Use template wrapper to keep v-if and v-else adjacent -->
      <template v-if="reverse">
        <div class="image-wrapper">
          <img :src="image" alt="About Section Image" class="about-image" />
        </div>
        <div class="text-section">
          <h2>{{ header }}</h2>
          <hr />
          <p>{{ text }}</p>
          <router-link :to="linkTo" class="link">
            {{ linkText }}
          </router-link>
        </div>
      </template>
  
      <template v-else>
        <div class="text-section">
          <h2>{{ header }}</h2>
          <hr />
          <p>{{ text }}</p>
          <router-link :to="linkTo" class="link">
            {{ linkText }}
          </router-link>
        </div>
        <div class="image-wrapper">
          <img :src="image" alt="About Section Image" class="about-image" />
        </div>
      </template>
    </div>
  </template>
  
  
