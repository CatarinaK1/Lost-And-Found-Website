<script>
import AboutSection from '@/components/organisms/AboutSection.vue';
import RegisterNowLink from '@/components/organisms/RegisterNowLink.vue';
import AboutMissionSection from '@/components/organisms/AboutMissionSection.vue';

// Images
import ImagesStephansplatz from '@/assets/images/stephansplatz.jpg';
import ImageLostAndFoundBox from '@/assets/images/LostAndFoundBox.jpeg';





export default {
  components: {
    AboutSection,
    AboutMissionSection,
    RegisterNowLink
  },
  data() {
    return {
      ImageLostAndFoundBox,
      ImagesStephansplatz
    };
  }
}
</script>

<style scoped>
.about-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>


<template>
  <div class="about-page">
    <!-- First section: Image on the left, text on the right -->
    <AboutSection
      :image= "ImagesStephansplatz"
      header="Our Mission"
      text="Welcome to Vienna's premier Lost and Found service! Located in the heart of this historic city, 
      we are dedicated to helping both locals and visitors reconnect with their lost belongings."
    />

    <!-- Second section: Image on the right, text on the left -->
    <AboutMissionSection
      :image= "ImageLostAndFoundBox"
      header="How It Works"
      text="Our platform allows you to easily report lost or found items. Simply create an account and start helping your community."
    />

    <!-- Final section: Text with a sign-up link -->
    <RegisterNowLink
      text="Ready to get started? Create an account today and make a difference!"
      linkText="Create an account"
      linkTo="/register"
    />
  </div>
</template>



