/*
Created By: M. Fadli Alifvian
*/


let items = [];
const inputedItem = document.querySelector("#input-value");
const submitBtn = document.querySelector("#submit-btn");
const itemBody = document.querySelector("#main-body");

// Function to create new element to document. return element with its node.
function createElement(element, node){
    const elementCreated = document.createElement(element);
    if(node){
        const elementNode = document.createTextNode(node);
        elementCreated.appendChild(elementNode);
    }
    return elementCreated;
}

// Create Item/ Appending Item
function createItem(id, value){
    const itemContainer = createElement("div");
    const itemCheckmark = createElement("input");
    itemCheckmark.setAttribute("type", "checkbox");
    itemCheckmark.setAttribute("id", `checkmark-${id}`);
    itemCheckmark.setAttribute("value_id", id);
    itemCheckmark.setAttribute("class", "item-checkmark");
    const itemName = createElement("p", value);
    itemName.setAttribute("id", `paragraph-${id}`)
    itemName.setAttribute("value_id", id);
    itemName.setAttribute("class", "item-inline")
    const buttonContainer = createElement("div");
    buttonContainer.setAttribute("class", "item-btn-container");
    const itemDelete = createElement("button", "Delete");
    itemDelete.setAttribute("id", `delete-${id}`)
    itemDelete.setAttribute("value_id", id);
    itemDelete.setAttribute("class", "item-deleteBtn");
    const itemEdit = createElement("button", "Edit");
    itemEdit.setAttribute("id", `edit-${id}`)
    itemEdit.setAttribute("value_id", id);
    itemEdit.setAttribute("class", "item-editBtn");
    buttonContainer.appendChild(itemDelete);
    buttonContainer.appendChild(itemEdit);
    itemContainer.appendChild(itemCheckmark);
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(buttonContainer);
    itemContainer.setAttribute("class", "item-container");
    itemContainer.setAttribute("id", `item-container-${id}`);
    itemBody.appendChild(itemContainer);
}

// DisplayItem on page if the item is newly added
function showItem(){
    // seenID contains id information that has been stored in items array of objects
    const storedID = []
    const mainContainer = document.querySelectorAll("#main-body div");

    // get ID of the item that has been stored 
    if(mainContainer.length !== 0){
        const myItem = document.querySelectorAll("#main-body div p");
        myItem.forEach(item => {
            storedID.push(parseInt(item.attributes.value_id.value));
        })
    }

    // create item when ID of the item is not same as ID of the item that has been stored
    items.forEach(item => {
        if(storedID.includes(item.id) === false){
            createItem(item.id, item.value);
        }
    })
}

// Adding checkmark onchange event handler. Receive id as selector for which checkmark should be added onchange event handler
function checkmarkItem (valueId) {
    const itemCheckmark = document.querySelector(`#main-body #checkmark-${valueId}`);
    itemCheckmark.addEventListener("change", function(){
        const thisValueId = this.attributes.value_id.value;
        const thisRelatedParagraph = document.querySelector(`#main-body #paragraph-${thisValueId}`);
        const thisRelatedContainer = document.querySelector(`#main-body #item-container-${thisValueId}`);
        if(this.checked){
            thisRelatedParagraph.classList.add("paragraph-stroke");
            thisRelatedContainer.classList.add("item-done");
        } else if (!this.checked){
            thisRelatedParagraph.classList.remove("paragraph-stroke");
            thisRelatedContainer.classList.remove("item-done");
        }
    })
}

// Adding delete event handler when delete button is clicked. Receive id as argument for selecting item id in which needs to removed from array and display
function deleteItemBtn (valueId) {
    const deleteItemBtn = document.querySelector(`#main-body #delete-${valueId}`);
    deleteItemBtn.addEventListener("click", function(){
        const thisButtonId = parseInt(this.attributes.value_id.value);
        // removing item with same id as the deletebtn from array
        let newItem = items.filter(item => {
            return item.id !== thisButtonId;
        })
        items = newItem;

        // removing from display/ page
        const thisRelatedItem = this.parentNode.parentNode;
        thisRelatedItem.remove();
    })
} 

// Adding Edit container element when edit button is clicked. 
// Adding edit event handler after submit button in edit container is clicked.
// Receive id as argument for selecting item id in which needs to removed from array and display
function editItemBtn (valueId) {
    const editItemBtn = document.querySelector(`#main-body #edit-${valueId}`);

    // Creating edit container element
    const editContainer = createElement("div");
    const editlabel = createElement("button", "Edit");
    editlabel.setAttribute("class", "edit-input-label");
    const editInput = createElement("input");
    editInput.setAttribute("type", "text");
    const newArray = items.filter(item => {
        return item.id === valueId;
    })
    editInput.setAttribute("value", newArray[0].value);
    const editSubmit = createElement("button", "Submit");
    editInput.setAttribute("id", `edit-input-${valueId}`);
    editInput.setAttribute("value_id", `${valueId}`);
    editInput.setAttribute("class", "edit-input-area");
    editSubmit.setAttribute("id", `editSubmit-${valueId}`);
    editSubmit.setAttribute("class", "edit-input-btn");
    editContainer.appendChild(editlabel);
    editContainer.appendChild(editInput);
    editContainer.appendChild(editSubmit);
    editContainer.setAttribute("id", `edit-container-${valueId}`)
    editContainer.setAttribute("class", "edit-container");
    const thisItemContainer = editItemBtn.parentNode.parentNode;
    thisItemContainer.appendChild(editContainer);


    let editItemid = valueId;
    editItemBtn.addEventListener("click", function(){
        const editItemContainer = document.querySelector(`#edit-container-${editItemid}`);
        const editSubmitContainer = document.querySelector(`#editSubmit-${editItemid}`);
        const editInputContainer = document.querySelector(`#edit-input-${editItemid}`);
        const whichParagraph = document.querySelector(`#paragraph-${editItemid}`);
        editItemContainer.classList.toggle("edit-container-show");
        editInputContainer.value = whichParagraph.innerText; 
        editSubmitContainer.addEventListener("click", function(){            
            let editInputContainerValue = editInputContainer.value;

            // changing the value on array
            items.forEach(item => {
                if(item.id === parseInt(editInputContainer.attributes.value_id.value)){
                    item.value = editInputContainerValue;
                }
            })

            // changing the value on display  
            whichParagraph.innerText = editInputContainerValue;
            editItemContainer.classList.remove("edit-container-show");
        })
    })
}


/////////////////////////////// MAIN //////////////////////////////////////

let itemID = 1;
submitBtn.addEventListener("click", function(){
    // adding value into item array as object with ID and value
    items.push({id: itemID, value: inputedItem.value});

    // display inputed item
    showItem();

    // adding change event handler in every added checkmark
    checkmarkItem(itemID);

    // adding delete event handler to delete button
    deleteItemBtn(itemID);

    // adding edit event handler
    editItemBtn(itemID);

    // changing id for next item
    itemID += 1;
    inputedItem.value = "";
})


