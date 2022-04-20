const searchPhone = () => {
    const phoneTextField = document.getElementById('search-field');
    const phoneInputValue = phoneTextField.value;
    toggleSpinner('block');
    console.log(phoneInputValue);
    const url = ` https://openapi.programming-hero.com/api/phones?search=${phoneInputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(phone => displaySearchResult(phone.data));
}
// Add spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;

}

const displaySearchResult = data => {
    const searchResultField = document.getElementById('search-result');
    searchResultField.textContent = '';
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">${phone.phone_name}.</p>
                </div>
                <button type="button" onclick=loadPhoneDetail('${phone.slug}') class="w-50 mx-auto mb-2 btn btn-dark">Show Detail</button>
            </div>
        `;
        searchResultField.appendChild(div);
        toggleSpinner('none');
        console.log(phone);
    })
    console.log(data);
}
const loadPhoneDetail = idPhone => {
    document.getElementById('single-phone-detail').style.display = 'block';
    const url = ` https://openapi.programming-hero.com/api/phone/${idPhone}`
    fetch(url)
        .then(res => res.json())
        .then(phone => displaySinglePhoneDetail(phone.data));

}
const displaySinglePhoneDetail = phone => {
    const singlePhoneDetailField = document.getElementById('single-phone-detail');

    singlePhoneDetailField.textContent = '';

    const div = document.createElement('div');
    const releaseInfo = document.createElement('div');
    const mainFeatures = document.createElement('div');

    if (phone.releaseDate.length == 0) {

        releaseInfo.innerHTML = `<div class="container p-4 mx-auto" <h5 class="card-text text-center">Release Date: <span class="text-primary">Release Date Not Found.</span></h5> </div>`;
    }
    else {
        releaseInfo.innerHTML = `<div class="container p-4 mx-auto" <h5 class="card-text text-center">Release Date: <span class="text-primary"> ${phone.releaseDate}</span> </h5> </div>`;
    }


    div.innerHTML = `
    
            <img src="${phone.image}" class="card-img-top rounded mx-auto d-block p-3" style="border: gray" >
            <div class="card-body rounded ps-4 pe-4">
                <h4 class="card-title text-primary text-center mt-2">Brand: ${phone.brand}</h5>
                <h5 class="card-text">Phone Name: ${phone.name}</p>
            </div>
      `;
    mainFeatures.innerHTML = `
    <div class="card-body rounded ps-4 pe-4">
        <h4 class="text-center p-3">Main Features</h4>
        <h5>Display: </h5> <h6>${phone.mainFeatures.displaySize} </h6>
        <h5>Sensors: </h5> <h6>${phone.mainFeatures.sensors.slice(0, 8)} </h6>
        <h5>Storage:</h5> <h6>${phone.mainFeatures.storage} </h6>
        <h5>Memory:</h5> <h6>${phone.mainFeatures.memory} </h6>
        <h5>ChipSet:</h5> <h6>${phone.mainFeatures.chipSet} </h6>
    </div
      
      
      `;
    singlePhoneDetailField.appendChild(div);
    singlePhoneDetailField.appendChild(releaseInfo);
    singlePhoneDetailField.appendChild(mainFeatures);
    console.log(phone)
    console.log(phone.mainFeatures.sensors);
}
