let selected_value;//this is gona be array variable which goan be hold the value of the first <select> selected value
let select = document.getElementById("sel");
let select2 = document.getElementById("sel2");


//this function triger by first <select> event===> change 
function change() {
    selected_value = select.value;
secondSelect();
}


async function fetch_data() {
    try {


        //fetchting the data from the API   
        let category = [];
        let response = await fetch("https://emojihub.yurace.pro/api/all");
        let result = await response.json();
        
             
        
        category = result
            .map(element => element.category)
            .filter((ele, ind, arr) => arr.indexOf(ele) == ind);


        //when the first <select>event===>change
        select.addEventListener("change", secondSelect)
        function secondSelect() {
            let group = result
                .filter((ele) => ele.category == selected_value)
                .map((ele) => ele.group)
                .filter((ele, ind, arr) => arr.indexOf(ele) == ind);

            //create options for second select
            createoption2(group);
        }

         //when the second <select>event===>change
         select2.addEventListener("change", visible)
         function visible() {
            cards();
         }

        //create options for first select
        createoption(category);


    }
    catch (error) {
        console.log(error);
        alert(error);
    }
}

fetch_data();

function createoption(category) {
   select.innerHTML="<option>Select Category</option>";
    for (let i = 0; i < category.length; i++) {
        select.innerHTML += `
        <option>${category[i]}</option>
        `;
    }
}

function createoption2(group) {
    select2.innerHTML="<option>Select Group</option>";
    for (let i = 0; i < group.length; i++) {
        select2.innerHTML += `
        <option>${group[i]}</option>
        `;
    }
}







//-------------------dom manupulation

//create container and row
let container = document.createElement("div");
let row = document.createElement("div");


//set class
container.className = "container";
row.className = "row";



async function cards(){
try{

      //result value
      let response = await fetch("https://emojihub.yurace.pro/api/all");
      let result = await response.json();
  
  //filter the data based on catagory and group
  let filtered_result=result.filter((ele)=>ele.category==select.value&&ele.group==select2.value);
  
  
  row.innerHTML="";
  
  
  //append row
  container.append(row);
  
  //create col and card
  for (let i = 0; i < filtered_result.length; i++) {
  
      //create col and card
      let col = document.createElement("div");
  
      //add class
      col.classList.add( "col-md-4");
  
      //add text
      col.innerHTML += `
      <div class="card" >
    <h1 id="card${i}">${filtered_result[i].htmlCode[0]}</h1>
    <div class="card-body">
      <h5 class="card-title">${filtered_result[i].name}</h5>
      <p class="card-text">Category: ${filtered_result[i].category}</p>
      <p class="card-text">Category: ${filtered_result[i].group}</p>
      <div class="btn btn-primary" onclick="copy_me(${i})">Click and Copy</div>
    </div>
  </div>
      `
  
      //append
      row.append(col);
  }
  
  
  
  
  
  //append 
  document.body.append(container);

}
 catch(error){
    console.log(error);
    alert(error);
 } 

}

//copy
function copy_me(id){
    let element=document.getElementById(`card${id}`);
    window.navigator.clipboard.writeText(element.innerText);

}
