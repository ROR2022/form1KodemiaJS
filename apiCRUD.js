const baseUrl= 'https://ejer1kodemia-default-rtdb.firebaseio.com/';
/* fetch(baseUrl)
.then((res)=>res.json())
.then(json=>{
  console.log(json)
})
.catch(err=>{
  console.log(err)
}) */

const showDataButton = document.querySelector('#showData');
if(showDataButton){
   showDataButton.addEventListener('click', async (e)=>{
      e.preventDefault();
      const response= await getAllDataFromDB();
      showAllData(response);
      //console.log(response);
   })
}


const showAllData= (data)=>{
   const dataContainer = document.querySelector('#dataContainer');
   dataContainer.innerHTML='';
   data.forEach(item=>{
      const {id}= item;
      const card= document.createElement('div');
      card.className='text-center m-2 border rounded p-2 bg-black text-white bg-opacity-75';
      for (const element in item){
         const dato= document.createElement('p');
         dato.className='small';
         if(element==='id') dato.classList.add('d-none');
         dato.textContent= `${element}: ${item[element]}`;
         card.appendChild(dato);
      }
      const buttonEliminar= document.createElement('button');
      buttonEliminar.className='btn btn-danger m-3';
      buttonEliminar.textContent='🗑️';
      buttonEliminar.addEventListener('click',async()=>{
         console.log('Eliminar Usuario:..',id);
         const resDelete = await deleteDataInDB(id);
         console.log('resDelete:..',resDelete);
         window.location.reload();
      })


      const buttonEditar= document.createElement('button');
      buttonEditar.className='btn btn-secondary m-3';
      buttonEditar.textContent= '✏️';
      buttonEditar.addEventListener('click',()=>{
         window.location.href=`./editDataPage.html?id=${id}`;
      })

      card.appendChild(buttonEditar);
      card.appendChild(buttonEliminar);
      dataContainer.appendChild(card);
   })
}

const formatData = (objResult)=>{

   const tempArray= Object.entries(objResult);
   const data= tempArray.map(item=>{
      const persona= {
         id: item[0],
         ...item[1]
      }
      return persona
   })
   //console.log(data);
   return data
}


export const getAllDataFromDB= async()=>{
  try {
    const response = await fetch(`${baseUrl}.json`);
    const result = await response.json();
    const data = formatData(result);
    return data
  } catch (error) {
   console.log(error);
    return error
  }
 
}

export const postDataInDB= async(data)=>{
  const options={
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(`${baseUrl}.json`,options);
    const result= await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getDataById= async (id)=>{
   try {
      const response = await fetch(`${baseUrl}/${id}.json`);
      const result = await response.json();
      //console.log('Data Result:..',result);
      return result
   } catch (error) {
      console.log(error);
      return
   }
}

export const putDataInDB= async(data,id)=>{
   const options={
     method: 'PUT',
     headers:{
       "Content-Type": "application/json"
     },
     body: JSON.stringify(data),
   }
 
   try {
     const response = await fetch(`${baseUrl}${id}.json`,options);
     const result= await response.json();
     console.log(result);
     return result
   } catch (error) {
     console.log(error);
     return error
   }
 }

 export const deleteDataInDB = async(id)=>{
   const options= {
      method: 'DELETE',
   }
   try {
      const response= await fetch(`${baseUrl}${id}.json`,options);
      const result= await response.json();
      console.log(result);
      return result
   } catch (error) {
      console.log(error);
      return error
   }
 }

//https://ejer1kodemia-default-rtdb.firebaseio.com/-NMGmnNKgeT-iPQvV3-d

