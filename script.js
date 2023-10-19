const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter')
const clearBtn = document.getElementById('clear')


function addItem(e){
    e.preventDefault()



    const newItem = itemInput.value;

    //validate input
    if(newItem === ''){
        alert('Please add an item')
        return
    }

    // Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)

    itemList.appendChild(li)

    checkUI()

    itemInput.value = ""
    
    
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
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)

checkUI()