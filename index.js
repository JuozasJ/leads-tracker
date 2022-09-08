let myLeads = []
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')

if (localStorage.myLeads) {
    myLeads = JSON.parse(localStorage.myLeads)
    render(myLeads)
}

function render(leads) {
    let listItems = ''
    for ( let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

function saveInput() {
    if (inputEl.value) {
        myLeads.push('https://' + inputEl.value)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        inputEl.value = ''
    }
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

inputBtn.addEventListener('click', saveInput)

inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        saveInput()
    }
})


let deleteConfirm = false

deleteBtn.addEventListener('click', function() {
    if (deleteConfirm) {
        localStorage.clear()
        myLeads = []
        render(myLeads)
        deleteConfirm = false
        deleteBtn.textContent = "DELETE ALL"
    } else {
        deleteBtn.textContent = "PRESS TO CONFIRM"
        deleteConfirm = true
        setTimeout(function() {
            deleteConfirm = false
            deleteBtn.textContent = "DELETE ALL"
        }, (2000))
    }
})
