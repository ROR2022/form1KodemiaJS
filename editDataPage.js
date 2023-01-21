import { getDataById, putDataInDB } from "./apiCRUD.js";

const mySearch = window.location.search;
const tempData= new URLSearchParams(mySearch);
const targetID= tempData.get('id');

const dataResponse = await getDataById(targetID);

let objData = {
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  country: "",
  languages: "",
  description: "",
};

const dataForm = ()=>{
  const inputFirstName= document.querySelector('#inputFirstName');
  inputFirstName.value=objData.firstName=dataResponse.firstName;
  inputFirstName.addEventListener("change", (event) => {
    const firstName = event.target.value;
    objData.firstName = firstName;
    //console.log(objData);
  });
  const inputLastName= document.querySelector('#inputLastName');
  inputLastName.value=objData.lastName=dataResponse.lastName;
  inputLastName.addEventListener("change", (event) => {
    const lastName = event.target.value;
    objData.lastName = lastName;
  });
  const inputBirthDate= document.querySelector('#inputBirthDate');
  inputBirthDate.value=objData.birthDate=dataResponse.birthDate;
  inputBirthDate.addEventListener("change", (event) => {
    const birthDate = event.target.value;
    objData.birthDate = birthDate;
  });
  const inputGender= document.querySelectorAll('input[name="inputGender"]');
  objData.gender=dataResponse.gender;
  inputGender.forEach(item=>{
    if(item.value===dataResponse.gender) item.checked=true;
  });
  inputGender.forEach((el) => {
    el.addEventListener("change", (event) => {
      const gender = event.target.value;
      objData.gender = gender;
    });
  });
  const inputCountry= document.querySelector('#inputCountry');
  inputCountry.value=objData.country=dataResponse.country;
  inputCountry.addEventListener("change", (event) => {
    const country = event.target.value;
    objData.country = country !== "Country:" ? country : "";
  });
  const inputLanguage= document.querySelectorAll('#language');
  objData.languages= dataResponse.languages;
  inputLanguage.forEach(item=>{
    if(dataResponse.languages.split(' ').includes(item.value)) item.checked=true;
  })
  inputLanguage.forEach((item) => {
    item.addEventListener("change", (event) => {
      const language = event.target.value;
      const add = event.target.checked;
      let tempArray = objData.languages.split(" ").filter((item) => item !== "");
      if (add) {
        tempArray.push(language);
        objData.languages = tempArray.join(" ");
      } else {
        let newArray = tempArray.filter((el) => el !== language);
        objData.languages = newArray.join(" ");
      }
    });
  });
  const inputDescription= document.querySelector('#inputDescription');
  inputDescription.value=objData.description=dataResponse.description;
  inputDescription.addEventListener("change", (event) => {
    const description = event.target.value;
    objData.description = description;
  });
  //console.log('Asignando Datos:..');
}

const editDataInDB = async ()=>{
  editDataForm.addEventListener('click', async(e)=>{
    e.preventDefault();
    console.log('Editando Valores:..',objData);
    const result= await putDataInDB(objData,targetID);
    window.location.href='./index.html';
  })
}


const editDataForm= document.querySelector('#editDataForm');
if (editDataForm){
  await editDataInDB();
}



//console.log('Hello editDataPage:..',dataResponse);

if(dataResponse) dataForm();