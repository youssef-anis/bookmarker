var bookmarkName = document.getElementById("bookmarkname");
var siteUrl = document.getElementById("siteurl");
var lightBoxContainer = document.getElementById("lightBoxContainer");
var lightBox = document.getElementById("lightBox");

var siteList;

if (localStorage.getItem("sites") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("sites"));
  display();
}

function addSites() {
  if (
    bookmarkName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    var siteUrlV = siteUrl.value;
    if (!/^http?:\/\//i.test(siteUrlV)) {
      siteUrlV = "https://" + siteUrlV;
      siteUrl.value = siteUrlV;
    }

    var sites = {
      bookmName: bookmarkName.value,
      sUrl: siteUrl.value,
    };
    siteList.push(sites);
    localStorage.setItem("sites", JSON.stringify(siteList));

    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.remove("is-invalid");

    display();
    clear();
  } else {
    alert();
  }
}

function display() {
  cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${siteList[i].bookmName}</td>
                    <td><button onclick="visitSite('${
                      siteList[i].sUrl
                    }')" class="btn btn-outline-primary"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                    <td><button onclick="deleteSites(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                </tr>`;
  }

  document.getElementById("sites").innerHTML = cartona;
}

function deleteSites(deletedSite) {
  siteList.splice(deletedSite, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  display(siteList);
}

function visitSite(url) {
  window.open(url, "_blank");
}

function siteValidation(element) {
  var regex = {
    bookmarkname: /^[a-z]{3,20}$/i,
    siteurl: /^(https:\/\/|http:\/\/){0,1}[a-z]{3,20}(.net|.com|.org|.co)$/i,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
  if (element.value == "") {
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  }
}
function alert() {
  lightBoxContainer.classList.remove("d-none");

  lightBoxContainer.addEventListener("click", function (e) {
    if (!lightBox.contains(e.target)) {
      lightBoxContainer.classList.add("d-none");
    }
  });
}

function clear() {
  bookmarkName.value = null;
  siteUrl.value = null;
}
