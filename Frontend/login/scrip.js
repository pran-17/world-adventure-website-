function validate()
{
    var Enter your name = document.getElementById("Full Name");
    var same username used at login = document.getElementById(" Username");

    if(Enter your Name.value =="" ||same username used at login =="")
    {
        alert("please";)
    }
    else{
        
    }
}
function validateInput(event) {
    var input = event.target.value;
    var regex = /[^a-zA-Z]/g;
    event.target.value = input.replace(regex, '');
    function checkforblank() {
if(document.getElementById('fullname').value== "") {
alert('please fill in details');
document.getElementById('fname').style.bordercolor= red;
return false;
}
}
