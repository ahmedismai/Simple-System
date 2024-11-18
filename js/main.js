var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var siteList = [];  


if (localStorage.getItem("siteContainer") !== null) {
    siteList = JSON.parse(localStorage.getItem("siteContainer"));
    displayData();
}


function addWeb() {
    var siteName = siteNameInput.value.trim();
    var siteURL = siteURLInput.value.trim();


    if (siteName === "") {
        alert("Please enter a site name.");
        return;
    }


    if (siteURL === "") {
        alert("Please enter a site URL.");
        return;
    }


    var urlPattern = (/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i);
    
    if (!urlPattern.test(siteURL)) {
        alert("URL is not a valid.");
        return;
    }

    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase() === siteName.toLowerCase() || siteList[i].visit === siteURL) {
            alert("This site already exists. Please try again.");
            return;
        }
    }

    


    var site = {
        name: siteName,
        visit: siteURL
    };


    siteList.push(site);
    localStorage.setItem("siteContainer", JSON.stringify(siteList));


    displayData();


    siteNameInput.value = "";
    siteURLInput.value = "";
}


function displayData() {
    var cartona = "";


    for (var i = 0; i < siteList.length; i++) {
        cartona += `
        <tr>
            <td class="pt-3">${i }</td> 
            <td class="pt-3">${siteList[i].name}</td>
            <td>
                <button onclick="goWibSite(${i})"
                style="background-color: #b1c453; border: none"
                class="rounded-2 p-2 text-white">
                    <i class="fa-solid fa-eye pe-2"></i> Visit
                </button>
            </td>
            <td>
                <button onclick="deleteItem(${i})"
                style="background-color: #d30820; border: none"
                class="rounded-2 p-2 text-white">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </td>
        </tr>`;
    }


    document.getElementById("tableContent").innerHTML = cartona;

}


function goWibSite(index) {
    var webList = siteList[index];
    var url = webList.visit;
    var cartona1 = (url.startsWith('http://') || url.startsWith('https://'))
    ? url
    : `https://${url}`;
    window.open(cartona1, '_blank');
}



function deleteItem(index) {

    siteList.splice(index, 1);


    localStorage.setItem("siteContainer", JSON.stringify(siteList));


    displayData();
}

