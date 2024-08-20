const LoadingMenuBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const Menus = data.data;
    SetMenuBtn(Menus)
}
const SetMenuBtn = (Menus) =>{
    const MenuContainer = document.getElementById('menu-container');
        Menus.forEach(menu =>{
            const div = document.createElement('div');
            div.innerHTML = `
                    <button class="py-1 border rounded-lg bg-gray-400 px-4">${menu.category}</button>
            `
            MenuContainer.appendChild(div);
        })
}
LoadingMenuBtn();
// All Menu 
const AllMenuCardShow = async (sort=false) =>{
        const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
        const data = await res.json();
        const cards = data.data;
        let number = parseFloat(cards[0].others.views) * 1000;
        if(sort){
            // console.log(cards);
            cards.sort(function (a,b) {
                return  parseFloat(b.others.views) * 1000 - parseFloat(a.others.views) * 1000;
            })
            SetMenuCard(cards);
        }else{
            SetMenuCard(cards);
        }
        console.log(cards);
        
}
const SetMenuCard = (cards) =>{
    const CardContainer = document.getElementById('card-container');
    CardContainer.textContent = '';
        cards.forEach(card => {
            const div = document.createElement('div');
            div.classList.add("container");
            div.innerHTML = `
            <img class="h-[200px] rounded-xl" src=${card.thumbnail} alt="">
            <div class="flex gap-2 items-center my-2">
                <img class="w-[40px] h-[40px] rounded-full" src=${card.authors[0].profile_picture}
                <p>${card.title}</p>
            </div>
            <div class="flex gap-2 items-center">
            <h2>${card.authors[0]?.profile_name}</h2>
            ${card.authors[0].verified ===true ? `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="text-blue-900" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6L7 9L4 6"/><circle cx="7" cy="7" r="6.5"/></g></svg>` : ''}
            </div>
            <p>${card.others.views}</p>
            `
            CardContainer.appendChild(div);
        })
}


AllMenuCardShow();
const handleSortData = () =>{
    AllMenuCardShow(true);
}