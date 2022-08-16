

let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let productCategory = document.querySelector("#productCategory");
let productDescription = document.querySelector("#productDescription");
let form = document.querySelector("form");
let addProduct = document.querySelector("#addProduct");
let tableBody = document.querySelector("tbody");
let searchProductName = document.querySelector("#searchProductName");
let btns = document.querySelector(".btns");
let btnUpdataProduct = document.querySelector("#btnUpdataProduct");
let btnDone = document.querySelector("#btnDone");
let productContainer;



if(localStorage.getItem("Products") != null) {

	productContainer = JSON.parse(localStorage.getItem("Products"));
	displayProduct(productContainer);

} else {

	productContainer = [];

}


form.addEventListener("submit" , function(e){

	e.preventDefault();




	if(productName.value == "" || productPrice.value == "" || productCategory == "" || productDescription == "") {


		alert("Write Info About Your Product");


	} else {



		if(productName.classList.contains("is-invalid") == true || productPrice.classList.contains("is-invalid") == true || productCategory.classList.contains("is-invalid") == true) {


			alert("Please, Check Info Your Product");

		} else {


			let product = {
				Name : productName.value,
				Price : productPrice.value,
				Category : productCategory.value,
				Description : productDescription.value
			};

			productContainer.push(product);

			localStorage.setItem("Products" , JSON.stringify(productContainer));

			displayProduct(productContainer);

			clearInputs();

			removeClassList();


		};


		



	};




	


});




function displayProduct(productList){

	let cartona = ``;

	for(let x=0 ; x<productList.length ; x++) {

		cartona += `

			<tr>
					<td>${x}</td>
					<td>${productList[x].Name}</td>
					<td>${productList[x].Price}</td>
					<td>${productList[x].Category}</td>
					<td>${productList[x].Description}</td>
					<td><button onclick="updateProduct(${x})" class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
					<td><button onclick="deleteProduct(${x})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
			</tr>


		`

	};

	tableBody.innerHTML = cartona;

};





function clearInputs(){

	productName.value = "";
	productPrice.value = "";
	productCategory.value = "";
	productDescription.value = "";

};





searchProductName.addEventListener("input" , searchProduct);

function searchProduct(e){

	let rezultSearch = [];

	for(let i=0 ; i<productContainer.length ; i++) {

		if(productContainer[i].Name.toLowerCase().includes(e.target.value.toLowerCase()) == true) {

			rezultSearch.push(productContainer[i]);
			displayProduct(rezultSearch);

		};

	};

};






function deleteProduct(index){


	productContainer.splice(index,1);
	localStorage.setItem("Products" , JSON.stringify(productContainer));
	displayProduct(productContainer);

};








function updateProduct(index){

	console.log(productContainer[index]);

	productName.value = productContainer[index].Name;
	productPrice.value = productContainer[index].Price;
	productCategory.value = productContainer[index].Category;
	productDescription.value = productContainer[index].Description;


	addProduct.classList.add("d-none");
	btns.classList.replace("d-none" , "d-block");


	btnUpdataProduct.addEventListener("click" , function(e){

		e.preventDefault();


		if(productName.classList.contains("is-invalid") == true || productPrice.classList.contains("is-invalid") == true || productCategory.classList.contains("is-invalid") == true) {

			alert("Please, Check Info Your Product");

		} else {


			productContainer[index].Name = productName.value;
			productContainer[index].Price = productPrice.value;
			productContainer[index].Category = productCategory.value;
			productContainer[index].Description = productDescription.value;


			productContainer.splice(index , 1 , productContainer[index]);
			localStorage.setItem("Products" , JSON.stringify(productContainer));
			displayProduct(productContainer);


			removeClassList();



		}

		

	})

};





btnDone.addEventListener("click" , function(e){

	e.preventDefault();

	addProduct.classList.replace("d-none" , "d-block");
	btns.classList.replace("d-block" , "d-none");

	clearInputs();


});







function validationInput(input){

	let regex1 = /^[A-Z][a-z]{3,}/;

	if(regex1.test(input.value) == true) {

		if(input.classList.contains("is-invalid") == true) {

			input.classList.replace("is-invalid" , "is-valid");
		} else {

			input.classList.add("is-valid");
		}

	} else {


		if(input.classList.contains("is-valid") == true) {

			input.classList.replace("is-valid" , "is-invalid");

		} else {

			input.classList.add("is-invalid");
		};

	};

};



productPrice.addEventListener("input" , validationInputProducrPrice);

function validationInputProducrPrice(){

	let regex2 = /^[1-9][0-9]{1,6}$/;

	if(regex2.test(productPrice.value) == true) {

		if(productPrice.classList.contains("is-invalid") == true) {

			productPrice.classList.replace("is-invalid" , "is-valid");
		} else {

			productPrice.classList.add("is-valid");
		}

	} else {


		if(productPrice.classList.contains("is-valid") == true) {

			productPrice.classList.replace("is-valid" , "is-invalid");

		} else {

			productPrice.classList.add("is-invalid");
		};

	};

};


function removeClassList(){

	productName.classList.remove("is-valid");
	productPrice.classList.remove("is-valid");
	productCategory.classList.remove("is-valid");

	productName.classList.remove("is-invalid");
	productPrice.classList.remove("is-invalid");
	productCategory.classList.remove("is-invalid");

};