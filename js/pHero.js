let viewsItem = [];
const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const dataInfo = data.data;
    
    const catagorysContainer = document.getElementById('catagory-container');
    showCatagory('1000');
    dataInfo.forEach(catagory => {
        const div = document.createElement('div');
        if (catagory.category_id === '1000') {
            div.innerHTML = `
            <a onclick="showCatagory('${catagory.category_id}')" class="tab tab-active  rounded text-base font-medium text-white text-[252525b3]  bg-red-500">${catagory.category}</a>
            `;
        }
        else {
            div.innerHTML = `
            <a onclick="showCatagory('${catagory.category_id}')" class="tab tab-active rounded text-base font-medium text-[252525b3] bg-[#25252526]">${catagory.category}</a>
            `;
        }
        catagorysContainer.appendChild(div);
    });

};

const showCatagory = async (catagoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryId}`);
    const data = await res.json();
    const dataItems = data.data;
    
    viewsItem = dataItems;

    const showCatagory = document.getElementById('show-catagory');
    showCatagory.innerText = '';
    const showCatagoryTwo = document.getElementById('show-catagory-2');
    showCatagoryTwo.innerText = '';
    if(dataItems.length === 0){
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="images/Icon.png" class="mx-auto mb-8">
        <h1 class="text-center font-bold text-[32px]">Oops!! Sorry, There is no<br>content here</h1>
        `;
        showCatagoryTwo.appendChild(div);
    }
    else{
        dataItems.forEach(item => {
            const div = document.createElement('div');
            let value = item.others.posted_date;
            div.innerHTML = `
            <div class="card bg-base-100 w-[312px]  mx-auto md:mx-0">
                <figure>
                <img src="${item.thumbnail}" class="relative rounded-xl w-full h-[200px]"/>
                </figure>
                
                <h1 class="text-[10px] top-[150px] right-4 text-white absolute text-center px-3 py-2 rounded-md ${postedDateHandeler(value) ? 'bg-black':''}">${postedDateHandeler(value) ? postedDateHandeler(value):''}</h1>

                <div class="flex gap-3 mt-5">
                    <img src="${item.authors[0].profile_picture}" class="rounded-full h-10 w-10">
                    <div>
                        <h1 class="font-bold">${item.title}</h1>
                        <div class="flex gap-2 my-2">
                            <p class="text-[#171717b3] text-sm">${item.authors[0].profile_name}</p>
                            <h1>${item.authors[0].verified? '<img class="w-5 h-5" src="images/varification.png">':''} </h1>
                        </div>
                        <h3 class="text-[#171717b3] text-sm pb-6">${item.others.views}</h3>
                    </div>
                </div>
            </div>
            `;
            showCatagory.appendChild(div);
        });
    }
}

// calculate posted_date 
const postedDateHandeler = (value) => {
    const seconds = parseInt(value);
    const hours = parseInt(seconds / 3600);
    const remainder = seconds % 3600;
    const minutes = parseInt(remainder / 60);
    if(!isNaN(hours) && !isNaN(minutes)){
        return (`${hours}hrs ${minutes} min ago`);
    }
    else{
        return 0;
    }  
}

// Sort by view handle function
const clickeSort = () => {
    viewsItem.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
    updateDisplay();
}

// update the display content based on the sorted value 
const updateDisplay = () => {
    const showCatagory = document.getElementById('show-catagory');
    showCatagory.innerText = '';
    const showCatagoryTwo = document.getElementById('show-catagory-2');
    showCatagoryTwo.innerText = '';
    if(viewsItem.length === 0){
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="images/Icon.png" class="mx-auto mb-8">
        <h1 class="text-center font-bold text-[32px]">Oops!! Sorry, There is no<br>content here</h1>
        `;
        showCatagoryTwo.appendChild(div);
    }
    else{
        viewsItem.forEach(item => {
            const div = document.createElement('div');
            let value = item.others.posted_date;
            div.innerHTML = `
            <div class="card bg-base-100 w-[312px]  mx-auto md:mx-0">
                <figure>
                <img src="${item.thumbnail}" class="relative rounded-xl w-full h-[200px]"/>
                </figure>
                
                <h1 class="text-[10px] top-[150px] right-4 text-white absolute text-center px-3 py-2 rounded-md ${postedDateHandeler(value) ? 'bg-black':''}">${postedDateHandeler(value) ? postedDateHandeler(value):''}</h1>

                <div class="flex gap-3 mt-5">
                    <img src="${item.authors[0].profile_picture}" class="rounded-full h-10 w-10">
                    <div>
                        <h1 class="font-bold">${item.title}</h1>
                        <div class="flex gap-2 my-2">
                            <p class="text-[#171717b3] text-sm">${item.authors[0].profile_name}</p>
                            <h1>${item.authors[0].verified? '<img class="w-5 h-5" src="images/varification.png">':''} </h1>
                        </div>
                        <h3 class="text-[#171717b3] text-sm pb-6">${item.others.views}</h3>
                    </div>
                </div>
            </div>
            `;
            showCatagory.appendChild(div);
        });
    }
}

// Blog btn handeler function
const  blog = () => {
    const blogId = document.getElementById('blog-id');
    window.location.href ="qus-ans-html/index.html";
}
loadData();