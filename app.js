const searchPhone = () => {
    const phoneTextField = document.getElementById('search-field');
    const phoneInputValue = phoneTextField.value;
    console.log(phoneInputValue);
    const url = ` https://openapi.programming-hero.com/api/phones?search=${phoneInputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(phone => displaySearchResult(phone.data));
}

const displaySearchResult = data => {
    const searchResultField = document.getElementById('search-result');
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick=loadPhoneDetail('${phone.slug}') class="card">
                <img src="${phone.image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">${phone.phone_name}.</p>
                </div>
            </div>
        `;
        searchResultField.appendChild(div);
        console.log(phone);
    })
}
const loadPhoneDetail = idPhone => {
    const url = ` https://openapi.programming-hero.com/api/phone/${idPhone}`
    fetch(url)
        .then(res => res.json())
        .then(phone => displaySinglePhoneDetail(phone.data));
    console.log(phone);
}
const displaySinglePhoneDetail = phone => {
    const singlePhoneDetailField = document.getElementById('single-phone-detail');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.brand}</h5>
      <p class="card-text">${phone.phone_name}</p>
    `;
    singlePhoneDetailField.appendChild(div);
} 