<template>
  <div class="div">
    <div class="div-2">
      <div class="div-3">
        <div class="div-4">
          <div class="div-5">
            <div class="div-6"><img :src="require('./assets/logo_sae.png')" loading="lazy"></div>
            <button class="header" @click="scrollToSection('home-section')">Home</button>
            <button class="header" @click="scrollToSection('weather-section')">Weather</button>
            <button class="header" @click="scrollToSection('about-section')">About</button>
            <button class="header" @click="showLoginModal = true">Connection</button>
          </div>
          <div class="div-10">
            Experience the thrill of real-<br />time weather reporting.
          </div>
        </div>
      </div>

      <BarChart></BarChart>
      <div class="div-11" id="home-section">
        <div class="div-12">Weather Insights, Unleashed</div>
        <div class="div-13">
          Get ready for the ultimate weather application that’ll blow your
          <br />socks off!
        </div>
        <div class="div-14">
          <div class="div-15">
            <div class="div-16">200</div>
            <div class="div-17">Weather Sensors</div>
          </div>
          <div class="div-18">
            <div class="div-19">175</div>
            <div class="div-20">Countries Covered</div>
          </div>
          <div class="div-21">
            <div class="div-22">24/7</div>
            <div class="div-23">Real-time Data</div>
          </div>
        </div>
      </div>
      <div class="div-24" id="weather-section">
        <div class="div-25">
          <div class="div-26">
            <div class="div-27">
              <div class="column">
                <div class="div-28">
                  <div class="div-29">Explore Temperature</div>
                  <div class="div-30">
                    Dive into accurate temperature readings in both <br />shade
                    and sun, providing you the best understanding <br />of
                    thermal conditions.
                  </div>
                </div>
              </div>
              <div class="column-2">
                <img loading="lazy" :src="require('./assets/img1.jpg')" class="img" />
              </div>
            </div>
          </div>
          <div class="div-31">
            <div class="div-32">
              <div class="column-3">
                <img loading="lazy" :src="require('./assets/img2.jpg')" class="img" />
              </div>
              <div class="column-4">
                <div class="div-33">
                  <div class="div-34">Rain & Humidity</div>
                  <div class="div-35">
                    Never get caught off-guard by unexpected showers.
                    <br />Monitor not just rain but also humidity levels for
                    total <br />control.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div-36">
        <div class="div-37">
          <div class="div-38">
            <div class="div-39">
              <div class="column">
                <div class="div-40">
                  <div class="div-41">Blazing Wind & Light</div>
                  <div class="div-42">
                    Keep track of the wild winds and radiant lights that
                    <br />paint your weather experience.
                  </div>
                </div>
              </div>
              <div class="column-5">
                <img loading="lazy" :src="require('./assets/img3.jpg')" class="img" />
              </div>
            </div>
          </div>
          <div class="div-43">
            <div class="div-44">
              <div class="column-6">
                <img loading="lazy" :src="require('./assets/img4.jpg')" class="img" />
              </div>
              <div class="column-7">
                <div class="div-45">
                  <div class="div-46">Atmospheric Pressure</div>
                  <div class="div-47">
                    Embrace the higher pressures of weather intelligence
                    <br />with our accurate atmospheric pressure readings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div-48" id="about-section">
        <div class="div-49">Stay Updated</div>
        <div class="div-50">
          Get the most precise and up-to-date weather predictions. You
          <br />can’t afford to miss out!
        </div>
        <div class="div-51">Sign Up Now</div>
      </div>
      <div class="div-52">
        <div class="div-53">
          <div class="div-54">
            <div class="div-55">
              <div class="div-56">
                <div class="column-8">
                  <div class="div-57">
                    <div class="div-58">Explore</div>
                    <div class="div-59">Temperature</div>
                    <div class="div-60">Rain</div>
                    <div class="div-61">Humidity</div>
                  </div>
                </div>
                <div class="column-9">
                  <div class="div-62">
                    <div class="div-63">Navigate</div>
                    <div class="div-64">Wind</div>
                    <div class="div-65">Light</div>
                    <div class="div-66">Pressure</div>
                  </div>
                </div>
                <div class="column-10">
                  <div class="div-67">
                    <div class="div-68">Connect</div>
                    <div class="div-69">Support</div>
                    <div class="div-70">About</div>
                    <div class="div-71">Privacy</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="div-72">
              <div class="social-icons">
                <a href="lien-facebook" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M11 1v3h-3v4h3v16h4v-16h3l1-4h-4v-2c0-1.105.895-2 2-2h2v-4h-3c-3.866 0-7 3.134-7 7v-4h-4l-1-4h-5v-16h-6v-16h-5l-1-4h-6v-3z" />
                  </svg>
                </a>
                <a href="lien-twitter" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M22.46 6.39c-0.77 0.34-1.6 0.57-2.46 0.67 0.88-0.53 1.56-1.37 1.88-2.39-0.82 0.49-1.73 0.84-2.7 1.04-0.77-0.82-1.87-1.33-3.08-1.33-2.32 0-4.19 1.88-4.19 4.19 0 0.33 0.03 0.65 0.09 0.96-3.48-0.17-6.59-1.83-8.66-4.36-0.36 0.63-0.57 1.37-0.57 2.16 0 1.48 0.75 2.79 1.88 3.57-0.69-0.02-1.34-0.21-1.91-0.52-0 0.02 0 0.05 0 0.07 0 2.07 1.48 3.79 3.44 4.17-0.36 0.1-0.73 0.16-1.12 0.16-0.27 0-0.54-0.03-0.8-0.08 0.54 1.68 2.11 2.9 3.99 2.94-1.46 1.13-3.3 1.81-5.3 1.81-0.35 0-0.71-0.02-1.06-0.06 1.89 1.21 4.12 1.92 6.51 1.92 7.81 0 12.07-6.48 12.07-12.07 0-0.18 0-0.35-0.01-0.53 0.83-0.59 1.55-1.32 2.12-2.15z" />
                  </svg>
                </a>
                <a href="lien-instagram" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M12 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-2 3h4c1.11 0 2 0.89 2 2v4c0 1.11-0.89 2-2 2h-4c-1.11 0-2-0.89-2 2v-4c0-1.11 0.89-2 2-2zm0 9c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zm6 2c0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4 1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4z" />
                  </svg>
                </a>
              </div>
              <div class="div-73">
                © 2023 Live Weather Report. All Rights Reserved.
              </div>
            </div>
          </div>
          <div class="scroll-to-top" @click="scrollToTop">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 3L2 12h6v8h8v-8h6z" />
            </svg>
            Scroll to Top
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire de connection -->
    <div class="modal" v-if="showLoginModal && showRegisterForm">
      <div class="modal-content">
        <form class="form">
          <span class="close-modal" @click="showLoginModal = false">
            <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
              viewBox="0 0 50 50">
              <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
              </path>
            </svg>
          </span>
          <p class="title">Login </p>
          <label>
            <input required="true" placeholder="" type="text" class="input">
            <span>Login</span>
          </label>

          <label>
            <input required="true" placeholder="" type="password" class="input">
            <span>Password</span>
          </label>
          <button class="submit">Submit</button>
          <p class="signin">Don't have an acount ? <a href="#" @click="showRegisterForm = !showRegisterForm">Create one
              here</a> </p>
        </form>
      </div>
    </div>
    <!-- Formulaire de création de compte -->
    <div class="modal" v-if="showLoginModal && !showRegisterForm">
      <div class="modal-content">
        <form class="form">
          <span class="close-modal" @click="showLoginModal = false">
            <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
              viewBox="0 0 50 50">
              <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
              </path>
            </svg>
          </span>
          <p class="title">Connexion </p>

          <label>
            <input required="true" placeholder="" type="text" class="input">
            <span>Login</span>
          </label>

          <label>
            <input required="true" placeholder="" type="email" class="input">
            <span>Email</span>
          </label>

          <label>
            <input required="true" placeholder="" type="password" class="input">
            <span>Password</span>
          </label>

          <button class="submit">Submit</button>
          <p class="signin">Already have an acount ? <a @click="showRegisterForm = !showRegisterForm">Signin</a> </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChartComponent.vue';
import axios from 'axios';
export default {
  components:{
    BarChart
  },
  data() {
    return {
      authenticated: false,
      email: '',
      password: '',
      login: '',
      showLoginModal: false,
      showRegisterForm: true,

    };
  },
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async authentication() {
      this.authenticated = await axios.post('http://localhost:4567/auth/signin', {
        login: this.login,
        password: this.password
      })
    },
  },
};
</script>

<style scoped>
@import url('./style/app.css');
@import url('./style/form.css');

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007BFF;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  display: none;
  /* Le bouton est caché par défaut */
  align-items: center;
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
  fill: #fff;
  margin-right: 10px;
}

.scroll-to-top.show {
  display: flex;
  /* Affiche le bouton lorsqu'il est activé */
}
</style>
