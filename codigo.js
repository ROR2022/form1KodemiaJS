const objData = {
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  country:"",
  languages:"",
  description:""
};

const inputFirstName = document.querySelector("#inputFirstName");
inputFirstName.addEventListener("change", (event) => {
  const firstName = event.target.value;
  objData.firstName = firstName;
});
const inputLastName = document.querySelector("#inputLastName");
inputLastName.addEventListener("change", (event) => {
  const lastName = event.target.value;
  objData.lastName = lastName;
});
const inputBirthDate = document.querySelector("#inputBirthDate");
inputBirthDate.addEventListener("change", (event) => {
  const birthDate = event.target.value;
  objData.birthDate = birthDate;
});
const inputGender = document.querySelectorAll("input[name='inputGender']");
inputGender.forEach((el) => {
  el.addEventListener("change", (event) => {
    const gender = event.target.value;
    objData.gender= gender;
  });
});
const inputCountry = document.querySelector("#inputCountry");
inputCountry.addEventListener("change", (event) => {
  const country = event.target.value;
  objData.country = country;
});
const inputLanguage = document.querySelectorAll("#language");
inputLanguage.forEach(item=>{
  item.addEventListener("change", (event) => {
    const language = event.target.value;
    const add = event.target.checked;
    let tempArray=objData.languages.split(' ').filter(item=>item!=='');
    if(add){
      tempArray.push(language);
      objData.languages=tempArray.join(' ');
    } else{
      let newArray= tempArray.filter(el=>el!==language);
      objData.languages= newArray.join(' ');
    }
  });
})
const inputDescription = document.querySelector("#inputDescription");
inputDescription.addEventListener("change", (event) => {
  const description = event.target.value;
  objData.description = description;
});


const error= document.querySelector('#error');
const myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(objData);
  for(const data in objData){
    if(objData[data]===''){
      error.textContent='Favor de LLenar correctamente todos los campos:..';
    }else{
      error.textContent='';
    }
  }
});





