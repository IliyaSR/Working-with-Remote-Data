let BASE_URL = 'http://localhost:3030/jsonstore/tasks/'

let loadButton = document.getElementById('load-course')
let addButton = document.getElementById('add-course')
let courseEdit = document.getElementById('edit-course')

let courseName = document.getElementById('course-name')
let courseType = document.getElementById('course-type')
let description = document.getElementById('description')
let teacherName = document.getElementById('teacher-name')


loadButton.addEventListener('click', loadFunction)
addButton.addEventListener('click', addFunction)

let deletedList = document.getElementById('list')
let productIdObjs = {};

function loadFunction(){
    deletedList.innerHTML = ''
    fetch(BASE_URL)
        .then((resolve) => resolve.json())
        .then((data) => {
            for (const key in data) {
                productIdObjs[data[key].title] = data[key]._id;

                let divContainer = createElement('div', list, '', ['container'])
                let header = createElement('h2', divContainer, data[key].title)
                let header3 = createElement('h3', divContainer, data[key].teacher)
                let headerType = createElement('h3', divContainer, data[key].type)
                let header4 = createElement('h4', divContainer, data[key].description)
                let editButton = createElement('button', divContainer, 'Edit Course', ['edit-btn'])
                let finishButton = createElement('button', divContainer, 'Finish Course', ['finish-btn'])


                
                finishButton.addEventListener('click', finishFunction)
                editButton.addEventListener('click', editFunction)

            }
        })
}

function addFunction(){
    let data = {title: courseName.value, type: courseType.value, description : description.value, teacher: teacherName.value}

    fetch(BASE_URL,{
        method : 'post',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
    })
    .then(() => loadFunction(), courseName.value = '', courseType.value = '', description.value = '', teacherName.value = '')
}

function finishFunction(event){
    const product = event.currentTarget.parentNode.firstChild.textContent
    let id = getId(product)
    fetch(BASE_URL + id, {
        method: 'delete'
    });

    loadFunction()
    
}

function editFunction(event){
    let deletedDiv = event.target.parentNode
    courseName.value = deletedDiv.children[0].textContent
    courseType.value = deletedDiv.children[2].textContent
    teacherName.value = deletedDiv.children[1].textContent
    description.value = deletedDiv.children[3].textContent
    deletedDiv.remove()
    addButton.disabled = true
    courseEdit.disabled = false
    const product = event.currentTarget.parentNode.firstChild.textContent
    let id = getId(product)

    courseEdit.addEventListener('click', function(){
        let data = {title: courseName.value, type: courseType.value, description : description.value, teacher: teacherName.value}
    fetch(BASE_URL + id, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
    .then(() => loadFunction())
    })


}


function getId(product) {
    return productIdObjs[product];
}



function createElement(
    type,
    parentNode,
    content,
    classes,
    id,
    attributes,
    useInnerHtml
  ) {
    const htmlElement = document.createElement(type);

    if (content && useInnerHtml) {
      htmlElement.innerHTML = content;
    } else {
      if (content && type !== "input") {
        htmlElement.textContent = content;
      }

      if (content && type === "input") {
        htmlElement.value = content;
      }
    }

    if (classes && classes.length > 0) {
      htmlElement.classList.add(...classes);
    }

    if (id) {
      htmlElement.id = id;
    }

    if (attributes) {
      for (const key in object) {
        htmlElement[key] = attributes[key];
      }
    }

    if (parentNode) {
      parentNode.appendChild(htmlElement);
    }

    return htmlElement;
  }

