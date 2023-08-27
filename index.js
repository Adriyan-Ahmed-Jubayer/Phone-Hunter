//   -------- Accessing Data From API --------  //
const LoadData = async () =>{
    const Response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const Data = await Response.json();
    const Phones = Data.data;
    console.log(Phones);
}