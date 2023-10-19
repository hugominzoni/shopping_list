const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter')
const clearBtn = document.getElementById('clear')


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

function addItemToStorage(item){
    let itemsFromStorage;
    
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];

    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    //Add new item to Array
    itemsFromStorage.push(item);

    //Convert to JSON String and set to LocalStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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

/*
The eventListener will be added on the parent, and using TARGET to identify the item we will delete
The function will search if the clicked target's parent contains the 'remove-item' class. If YES,
it will go up 1 level (button), then up another level (li) and remove it.
from the target will up to the button, then up to the li and the remove method will remove the entire li.

*/

function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove()
            checkUI()
        }

    }

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




//Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)

checkUI()