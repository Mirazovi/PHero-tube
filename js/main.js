const LoadingMenuBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const Menus = data.data;
    SetMenuBtn(Menus)
}
const SetMenuBtn = (Menus) => {
    const MenuContainer = document.getElementById('menu-container');
    Menus.forEach(menu => {
        const div = document.createElement('div');
        div.innerHTML = `
                    <button 
                     onclick="handleClickedMenu(${menu?.category_id})" 
                    class="py-1 border rounded-lg bg-gray-400 px-4">${menu?.category}</button>
            `
        MenuContainer.appendChild(div);
    })
}
LoadingMenuBtn();
// All Menu 
const AllMenuCardShow = async (id = 1000, sort = false) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cards = data.data;
    let number = parseFloat(cards[0]?.others?.views) * 1000;
    if (sort) {
        // console.log(cards);
        cards.sort(function (a, b) {
            return parseFloat(b?.others?.views) * 1000 - parseFloat(a?.others?.views) * 1000;
        })
        SetMenuCard(cards);
    } else {
        SetMenuCard(cards);
    }
    // console.log(cards);

}
// Clicked function 
const handleClickedMenu = (id) => {
    AllMenuCardShow(id, false);
}
// setCard 
const SetMenuCard = (cards) => {
    const CardContainer = document.getElementById('card-container');
    const ErrorHandle = document.getElementById('error-div');
    ErrorHandle.textContent = '';
    CardContainer.textContent = '';
    if (cards?.length === 0) {
        const div1 = document.createElement('div');
        div1.innerHTML = `
        <div class="flex justify-center flex-col items-center w-full h-[70vh]">
              <div >
              <img src="/image/Icon.png">
              </div>
              <p class="text-2xl py-2 font-bold">Oops!! Sorry, There is no content here</p>
        </div>
        
        `;
        ErrorHandle.appendChild(div1);
    } else {
        cards?.forEach(card => {
            const div = document.createElement('div');

            div.classList.add("container");
            // time setting 
            const Postdate = card?.others?.posted_date;
            const hours = Math.floor((Postdate % 86400) / 3600);
            const minutes = Math.floor((Postdate % 3600) / 60);
            // const seconds = Postdate % 60;
            div.innerHTML = `
            <div class="relative">
            <img class="h-[200px] rounded-xl " src=${card.thumbnail} alt="">
            ${card?.others?.posted_date ? `<p class="absolute bottom-3 right-5 text-white">${hours}hrs ${minutes}min ago</p>` : ''}
            </div>
            <div class="flex gap-2 items-center my-2">
                <img class="w-[40px] h-[40px] rounded-full" src=${card.authors[0].profile_picture}
                <p>${card.title}</p>
            </div>
            <div class="flex gap-2 items-center">
            <h2>${card.authors[0]?.profile_name}</h2>
            ${card.authors[0].verified === true ? `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="text-blue-900" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6L7 9L4 6"/><circle cx="7" cy="7" r="6.5"/></g></svg>` : ''}
            </div>
            <p>${card.others.views}</p>
            `
            CardContainer.appendChild(div);
        })
    }
}


AllMenuCardShow();
const handleSortData = () => {
    AllMenuCardShow(1000, true);
}