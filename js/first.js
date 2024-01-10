var bookName = document.getElementById('bookName');//input kolo
var siteURL =document.getElementById('siteURL'); //input kolo
var tableBody =document.getElementById('tableBody');
var search =document.getElementById('search');

// localStorage.clear()
var bookContainer ;
if(localStorage.getItem('myProduct')!=null){
  bookContainer=JSON.parse(localStorage.getItem('myProduct'));
  displayBook(bookContainer);
}
else{
  bookContainer = [];
}

// var formControlLabel = document.querySelector('.form-control');// querySelector get first element
// var addBoxShadow = () => {
//   formControlLabel.style.boxShadow = '0 0 5px 2px #ECA568';
// }

// bookName.addEventListener('click', addBoxShadow);
// siteURL.addEventListener('click', addBoxShadow);


function addBook(){
  var book ={
    name:bookName.value,
    URL:siteURL.value
  }
  if(book.name!=''&& book.URL!=''){
    if(validateName(bookName.value)){
      bookContainer.push(book);
      localStorage.setItem('myProduct',JSON.stringify(bookContainer));
      console.log(book);
      clearForm();
      displayBook(bookContainer);
    }
    else{
      alert("book name not available");
      }
   
  }
 else{
  alert("Enter")
 }
}
function validateName(book){
  var reg=/[A-z]{2,}$/;
  if(reg.test(book.value)){
    book.classList.replace("is-invalid" , "is-valid");
    console.log("true")
    return true;
    
}
  else{
    book.classList.add("is-invalid");
    console.log("false")
      return false;
  }
}


function clearForm(){
  bookName.value ="";
  siteURL.value = "";
}

function displayBook(arr){
  var cartoona=``;
  for(var i=0 ; i< arr.length ; i++){

    cartoona+=
        `
            <tr>
              <td>${i+1}</td>
              <td>${arr[i].name}</td>
              <td>${arr[i].URL}</td>
              <td><button onclick= "deleteBook(${i})"class="btn btn-danger">Delete</button></td>
            </tr>
          `
  }
  tableBody.innerHTML = cartoona;
}
function searchBook(searchItem){
  var searchResult = [];
  for(var i=0 ; i< bookContainer.length ; i++){
    if(bookContainer[i].name.toLowerCase().includes(searchItem.toLocaleLowerCase())){
      searchResult.push(bookContainer[i])
    }
  }
  displayBook(searchResult);
}
function deleteBook (deletIndex){
  bookContainer.splice(deletIndex,1);
  localStorage.setItem('myProduct',JSON.stringify(bookContainer));
  displayBook(bookContainer);
}
