//   -------- Accessing Data From API --------  //
const LoadData = async (SearchText = '13') =>{
    const Response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`)
    const Data = await Response.json();
    const Phones = Data.data;
    DisplayPhones(Phones);
}


const DisplayPhones = Phones =>{
    const PhoneCardContainer = document.getElementById('phones-card-container');
    PhoneCardContainer.textContent = "";
    const ShowBtn = document.getElementById('show-all-btn-container')
    if(Phones.length > 12){
      ShowBtn.classList.remove('hidden')
    }
    else{
      ShowBtn.classList.add('hidden')
    }
    Phones = Phones.slice(0,12);
    Phones.forEach(phone => {
        const PhoneCard = document.createElement('div');
        PhoneCard.classList = `card bg-base-100 shadow-xl`;
        PhoneCard.innerHTML = `
        <figure class="px-10 pt-10">
              <img src="${phone.image}" alt="Phone" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>There are many variations of passages of available, but the majority have suffered</p>
              <div class="card-actions">
                <button onclick="HandleShow('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `;

        PhoneCardContainer.appendChild(PhoneCard);
    });
      ToggleLoadingSpinner(false)
}

const HandleShow = async (ID) => {
  console.log('clicked', ID);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${ID}`);
  const data = await res.json();
  const Details = data.data;
  ShowPhoneDetails(Details)
}

const ShowPhoneDetails = (Details) => {
  console.log(Details);
  const PhoneName = document.getElementById('show-detail-phone-name');
  const ImgContainer = document.getElementById('show-detail-img-container');
  ImgContainer.innerHTML = `<img src="${Details.image}" alt="Phone" rounded-xl class="mx-auto bg-cyan-200 py-5" />`
  PhoneName.innerText = Details.name;
  show_details_modal.showModal()
}

const HandleSearch = () =>{
  ToggleLoadingSpinner(true)
  const SearchFeild = document.getElementById('search-feild');
  const SearchText = SearchFeild.value;
  LoadData(SearchText)
}

const ToggleLoadingSpinner = (IsLoading) => {
  const Loader = document.getElementById('loader')
  if(IsLoading){
    Loader.classList.remove('hidden');
  }
  else{
    Loader.classList.add('hidden')
  }
  }


LoadData()