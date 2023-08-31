const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const dataInfo = data.data;

    const catagorysContainer = document.getElementById('catagory-container');
    dataInfo.forEach(catagory => {
        const div = document.createElement('div');
        if (catagory.category == 'All') {
            div.innerHTML = `
            <a onclick="handleLoadCatagory(${catagory.category_id})" class="tab tab-active  rounded text-base font-medium text-white text-[252525b3]  bg-red-500">${catagory.category}</a>
            `;
        }
        else {
            div.innerHTML = `
            <a onclick="handleLoadCatagory(${catagory.category_id})" class="tab tab-active rounded text-base font-medium text-[252525b3]  bg-[#25252526]">${catagory.category}</a>
            `;
        }
        catagorysContainer.appendChild(div);
    });

};

const handleLoadCatagory = async (catagoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryId}`);
    const data = await res.json();
    const dataItems = data.data;

    const showCatagory = document.getElementById('show-catagory');
    showCatagory.innerText = '';
    dataItems.forEach(item => {
        console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 w-[312px] ">
            <figure>
            <img src="${item.thumbnail}" class="rounded-xl w-full h-[200px]"/>
            </figure>
            <div class="flex gap-3 mt-5">
                <img src="${item.authors[0].profile_picture}" class="rounded-full h-10 w-10">
                <div>
                    <h1 class="font-bold">${item.title}</h1>
                    <div class="flex gap-2 my-2">
                        <p class="text-[#171717b3] text-sm">${item.authors[0].profile_name}</p>
                    </div>
                    <h3 class="text-[#171717b3] text-sm pb-6">${item.others.views}</h3>
                </div>
            </div>
        </div>
        `;
        showCatagory.appendChild(div);
    });


}
 


loadData();