const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter')
const clearBtn = document.getElementById('clear')


function displayItems(){
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkUI()
}


function onAddItemSubmit(e){
    e.preventDefault()
    
    const newItem = itemInput.value;

    //validate input
    if(newItem === ''){
        alert('Please add an item')
        return
    }

    //Create DOM element
    addItemToDOM(newItem);

    //Add item to Local Storage
    addItemToStorage(newItem)

    checkUI()

    itemInput.value = ""
       
}


function addItemToDOM(item){
    // Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)

    itemList.appendChild(li)
}




function createButton(classes){
    const button = document.createElement('button')
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}


function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    //Add new item to Array
    itemsFromStorage.push(item);

    //Convert to JSON String and set to LocalStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
    let itemsFromStorage;
    
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];

    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage
}


/*
The eventListener will be added on the parent, and using TARGET to identify the item we will delete
The function will search if the clicked target's parent contains the 'remove-item' class. If YES,
it will go up 1 level (button), then up another level (li) and remove it.
from the target will up to the button, then up to the li and the remove method will remove the entire li.

*/

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    }
}


function removeItem(item){
    if (confirm('Are you sure?')){
        item.remove()

        removeItemFromStorage(item.textContent)
        checkUI()
    }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()

    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

/*
Clear Items Function:
While the UL has an Li, remove the child identified as 'first child'
This will remove the first li, one by one until the condition is not true.

*/

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }

    localStorage.removeItem('items')
    checkUI()
}


function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        } else{
            item.style.display = 'none'
        }
    })
    
}



function checkUI(){
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else{
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
}


//Initialize app

function init(){
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItems)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)
    
    checkUI()
}

init()

