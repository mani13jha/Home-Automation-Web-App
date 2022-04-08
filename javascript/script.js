import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb-sg7W8ehCG69EdS08KMYEYtSGhI86lg",
    authDomain: "home-automation-e2edd.firebaseapp.com",
    databaseURL: "https://home-automation-e2edd.firebaseio.com",
    projectId: "home-automation-e2edd",
    storageBucket: "home-automation-e2edd.appspot.com",
    messagingSenderId: "989243131250",
    appId: "1:989243131250:web:dfea8dc31012ba790409eb",
    measurementId: "G-0DQ34M14Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

const db = getDatabase();
const analytics = getAnalytics(app);

var fan_ON = document.getElementById("fan_on");
var fan_OFF = document.getElementById("fan_off");
var TV_ON = document.getElementById("tv_on");
var TV_OFF = document.getElementById("tv_off");
var Fridge_ON = document.getElementById("fridge_on");
var Fridge_OFF = document.getElementById("fridge_off");
var AC_ON = document.getElementById("ac_on");
var AC_OFF = document.getElementById("ac_off");
var led_ON = document.getElementById("led_on");
var led_OFF = document.getElementById("led_off");

led_ON.addEventListener('click', () => {alert('Only for Monitoring Purpose');});
led_OFF.addEventListener('click', () => {alert('Only for Monitoring Purpose');});
fan_ON.addEventListener('click', () => {update(ref(db, "Appliances/"), {Fan:'1'});});
fan_OFF.addEventListener('click', () => {update(ref(db, "Appliances/"), {Fan:'0'});});
TV_ON.addEventListener('click', () => {update(ref(db, "Appliances/"), {TV:'1'});});
TV_OFF.addEventListener('click', () => {update(ref(db, "Appliances/"), {TV:'0'});});
Fridge_ON.addEventListener('click', () => {update(ref(db, "Appliances/"), {Fridge:'1'});});
Fridge_OFF.addEventListener('click', () => {update(ref(db, "Appliances/"), {Fridge:'0'});});
AC_ON.addEventListener('click', () => {update(ref(db, "Appliances/"), {AC:'1'});});
AC_OFF.addEventListener('click', () => {update(ref(db, "Appliances/"), {AC:'0'});});

const envData = ref(db, 'Environment/');
onValue(envData, (snapshot) => {
  const data = snapshot.val();
  document.getElementById('intensity').innerHTML = data['Light Intensity'] + ' %';
  document.getElementById('humid').innerHTML = data['Humidity'] + ' %';
  document.getElementById('temp_c').innerHTML = data['Temperature °C'] + ' °C';
  document.getElementById('temp_f').innerHTML = data['Temperature °F'] + ' °F';
  document.getElementById('heat_index_c').innerHTML = data['Heat Index °C'] + ' °C';
  document.getElementById('heat_index_f').innerHTML = data['Heat Index °F'] + ' °F';
});

const bellData = ref(db, 'Door Bell/');
onValue(bellData, (snapshot) => {
  const data = snapshot.val();
  document.getElementById('bell1').innerHTML = data['Door Alarm'];
});

const doorData = ref(db, 'Door Lock/');
onValue(doorData, (snapshot) => {
  const data = snapshot.val();
  document.getElementById('name1').innerHTML = data['Entered Person Name'];
  document.getElementById('id1').innerHTML = data['Entered Person ID'];
  document.getElementById('access1').innerHTML = data['Access'];
  if (data['Access']=='Granted') {
      document.getElementById('access_img').src = "https://img.icons8.com/fluency/48/000000/approval.png";
  } else if(data['Access']=='Denied') {
      document.getElementById('access_img').src = "https://img.icons8.com/fluency/48/000000/restriction-shield.png";
  }
  document.getElementById('status1').innerHTML = data['Entering Status'];
  if (data['Entering Status']=='Entered') {
    document.getElementById('status_img').src = "https://img.icons8.com/doodle/48/000000/enter-house.png";
  } else if(data['Entering Status']=='Left') {
    document.getElementById('status_img').src = "https://img.icons8.com/doodle/48/000000/leave-house.png";
  }
});

const aplcData = ref(db, 'Appliances/');
onValue(aplcData, (snapshot) => {
  const data = snapshot.val();

  if(data['Led'] == '1') {
    document.getElementById('led_on').style.backgroundColor = 'rgb(83, 255, 83)';
    document.getElementById('led_off').style.backgroundColor = 'white';
  } else if(data['Led'] == '0') {
    document.getElementById('led_off').style.backgroundColor = 'rgb(243, 95, 95)';
    document.getElementById('led_on').style.backgroundColor = 'white';
  }

  if(data['Fan'] == '1') {
    document.getElementById('fan_on').style.backgroundColor = 'rgb(83, 255, 83)';
    document.getElementById('fan_off').style.backgroundColor = 'white';
    } else if(data['Fan'] == '0') {
    document.getElementById('fan_off').style.backgroundColor = 'rgb(243, 95, 95)';
    document.getElementById('fan_on').style.backgroundColor = 'white';
    }

  if(data['TV'] == '1') {
    document.getElementById('tv_on').style.backgroundColor = 'rgb(83, 255, 83)';
    document.getElementById('tv_off').style.backgroundColor = 'white';
  } else if(data['TV'] == '0') {
    document.getElementById('tv_off').style.backgroundColor = 'rgb(243, 95, 95)';
    document.getElementById('tv_on').style.backgroundColor = 'white';
  }

  if(data['Fridge'] == '1') {
    document.getElementById('fridge_on').style.backgroundColor = 'rgb(83, 255, 83)';
    document.getElementById('fridge_off').style.backgroundColor = 'white';
  } else if(data['Fridge'] == '0') {
    document.getElementById('fridge_off').style.backgroundColor = 'rgb(243, 95, 95)';
    document.getElementById('fridge_on').style.backgroundColor = 'white';
  }

  if(data['AC'] == '1') {
    document.getElementById('ac_on').style.backgroundColor = 'rgb(83, 255, 83)';
    document.getElementById('ac_off').style.backgroundColor = 'white';
  } else if(data['AC'] == '0') {
    document.getElementById('ac_off').style.backgroundColor = 'rgb(243, 95, 95)';
    document.getElementById('ac_on').style.backgroundColor = 'white';
  }
});
