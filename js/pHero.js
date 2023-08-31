const loadData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const dataInfo = data.data;

    const catagorysContainer = document.getElementById('catagory-container');
    dataInfo.forEach(catagory => {
        const div = document.createElement('div');
        if(catagory.category == 'All'){
            div.innerHTML = `
            <a onclick="handleLoadCatagory(${catagory.category_id})" class="tab tab-active  rounded text-base font-medium text-white text-[252525b3]  bg-red-500">${catagory.category}</a>
            `;
        }
        else{
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
    console.log(data);
    
}


loadData();