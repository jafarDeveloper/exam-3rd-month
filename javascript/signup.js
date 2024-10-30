const users = getItem("users") ? JSON.parse(getItem("users")) : [];
const admin = JSON.parse(getItem("admin")) 
const elForm = document.querySelector(".js-user-add-form");
const elUserNameInput = elForm.querySelector(".js-username-input");
const elPhoneNumInput = elForm.querySelector(".js-phone-num-input");
const elPasswordInput = elForm.querySelector(".js-password-input");
let regexPhone = /^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;



const handleSub = (evt) => {
    evt.preventDefault();
	let userName = elUserNameInput.value;
	let phoneNum = elPhoneNumInput.value;
	let password = elPasswordInput.value;
	
	if (!(userName && userName.length)) return alert("Username is required!");
	if (!(phoneNum && phoneNum.length)) return alert("Phone number is required!");
	if (!(password && password.length)) return alert("Password number is required!");
	userName = elUserNameInput.value.trim();
	if (!(regexPhone.test(phoneNum)))return alert("invalid phone number")
	phoneNum = elPhoneNumInput.value.trim();
	password = elPasswordInput.value.trim();

	if(users.some(item => item.phoneNum == phoneNum)){
		elUserNameInput.value="";
		elPhoneNumInput.value="";
		elPasswordInput.value="";
		return alert('please input another phone number. Number like this already excist')
	}
	if(users.some(item => {return item.password == password || admin.password == password}) ){
		elUserNameInput.value="";
		elPhoneNumInput.value="";
		elPasswordInput.value="";
		return alert('please input another password. Password like this already excist')
	}

	let user = {
		userName,
		phoneNum,
		password,
		id: users.length ? users[users.length - 1].id + 1 : 1,
		userProducts: []
	};

	users.push(user)
	setItem("users",users)
    
	elUserNameInput.value="";
	elPhoneNumInput.value="";
	elPasswordInput.value="";

	window.location.pathname='/index.html'
};	
elForm.addEventListener("submit", handleSub);
