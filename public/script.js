const body = document.querySelector('body')
const btn = document.querySelector('button')
// fetch data front end side using axios
async function fetchData() {
  try {
    // destrecturing the json data
    const {data : { name, location, email, phone, cell, login, dob, picture,gender, registered,nat} } = await axios.get('/results')
    // person info transformer
    return {
      ...name,
      streetNumber: location.street.number,
      streetName: location.street.name,
      ...location,
      email, 
      phone,
      cell,
      pic: picture.large,
      username: login.username,
      dob: dateFormat(dob.date),
      registered: dateFormat(registered.date),
      gender: checkGender(gender),
      nat: `https://countryflagsapi.com/png/${nat.toLowerCase()}`
    }
  } catch(err) {
      console.error(err);
      throw new Error("Something went wrong !")
  }
}
// show data on the browser
async function showData() {
  showCanvas()
  const personInfo = await fetchData()
  Object.keys(personInfo).forEach((key) => {
    // DOM elements
    const elm = document.querySelector(`.${key}`);
    // check if element is not an object
    if (elm) {
      // handle pictures
      if (key === 'pic'|| key === 'nat') {
        elm.src = personInfo[key] 
      }  
      // handle strings
        elm.textContent = personInfo[key]
    }
  })
}
// https://developer.mozilla.org/fr/docs/Glossary/IIFE
// Self-Invoking Functions
// Test-driven development - TDD
(function(){
showData()
showCanvas()
})()

// format date
// function dateFormat(date) {
//   const d = new Date(date);
//   const {month, day, year} = {
//     month: `0${d.getMonth() + 1}`.slice(-2),
//       day: `0${d.getDate()}`.slice(-2),
//      year: d.getFullYear()
//   }
//   return `${month}/${day}/${year}`
// }

// js build in function
function dateFormat(date) {
  const d = new Date(date);
  const options = {
     year: 'numeric',
    month: '2-digit',
      day: '2-digit'
  };
  return d.toLocaleDateString('fr-FR', options)
}
// change background & btn color based on gender
function checkGender(gender) {
  if (gender === 'female'){
    body.classList.remove('male');
    body.classList.add('female');
    btn.classList.remove('male');
    btn.classList.add('female');
  } else if (gender === 'male'){
    body.classList.remove('female');
    body.classList.add('male');
    btn.classList.remove('female');
    btn.classList.add('male');
  }
  return gender
}
// generate new canva for each new card id
// ctx.globalCompositeOperation='destination-over';

const header = document.querySelector('header')


function showCanvas(){
   const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d');
  const options = {
  width: 384,
  height: 88,
  cellSize: 75,
  variance: 0.75,
  seed: null,
  xColors: 'random',
  yColors: 'match',
  fill: true,
  colorSpace: 'lab',
  colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
  strokeWidth: 0,
  points: null
  }
    const pattern = trianglify(options)
    return pattern.toCanvas(canvas)
}