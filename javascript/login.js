const users = JSON.parse(getItem("users"));
let elForm=document.querySelector(".js-form-login")
let elUserNameInput=elForm.querySelector(".js-login-username")
let elPasswordInput=elForm.querySelector(".js-login-password")
setItem("acc", false)

function checkusers(evt) {
    evt.preventDefault();

    if (users.some((user)=> (user.password == elPasswordInput.value.trim() && user.userName == elUserNameInput.value.trim()))) {
     let  currentUserIndex= users.findIndex((user)=>user.password==elPasswordInput.value.trim())
        setItem("currentUserIndex",currentUserIndex)
        window.location = '/country.html'
        setItem("acc", true)
    } else {
        setItem("acc", false)
        alert('there is have no that user please sign up or something went wrong')
    }
}
elForm.addEventListener("submit",checkusers)