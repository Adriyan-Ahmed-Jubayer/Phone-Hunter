//   -------- Accessing Data From API --------  //
const LoadData = async (SearchText) =>{
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
        console.log(phone);
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
                <button class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `;

        PhoneCardContainer.appendChild(PhoneCard);
    });
      ToggleLoadingSpinner(false)
}


const HandleSearch = () =>{
  ToggleLoadingSpinner(true)
  const SearchFeild = document.getElementById('search-feild');
  const SearchText = SearchFeild.value;
  console.log(SearchText);
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