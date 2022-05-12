function kmtomiles() {
  console.log("Hello");
  var kms = document.getElementById("km").value;
  var miles = kms / 1.609;
  document.getElementById("miles1").innerHTML = miles;
}

function milestokms() {
  console.log("Hello");
  var miles = document.getElementById("mile").value;
  var kms = 1.609 * miles;
  document.getElementById("kms1").innerHTML = kms;
}
