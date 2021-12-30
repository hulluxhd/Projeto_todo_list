; (function () {

    const formulario = document.getElementById('todo-form')
    const novoItem = document.getElementById('item')
    const btnAdd = document.getElementById('add')
    const todoList = document.getElementsByClassName('todo-list')[0]
    const maxLengthInput = parseInt(novoItem.maxLength)
    const caracteresRestantesSpan = document.querySelector('.caracteres-restantes p > span')
    const lis = todoList.getElementsByTagName('li')


    caracteresRestantesSpan.textContent = maxLengthInput

    let arrayTasks = []

    // FUNCTIONS

    // Função que adiciona os nós ao dom 
    function generateLiTask(obj) {
        const li = document.createElement('li')
        const btn = document.createElement('button')
        const p = document.createElement('p')
        const edit = document.createElement('i')
        const thrash = document.createElement('i')

        li.className = 'todo-item'
        btn.className = 'check-button'
        p.className = 'task'
        edit.className = 'fas fa-edit'
        thrash.className = 'fas fa-trash-alt'

        p.textContent = obj.name

        // Criando atributos para os botões e facilitar a checkagem pois se os ícones forem trocados, os atributos permanecem e o código não perde efeito
        btn.setAttribute('b-action', 'check')
        edit.setAttribute('b-action', 'edit')
        thrash.setAttribute('b-action', 'thrash')


        // Adicionar o <i> de verificação de completo. Vai ser útil quando estivermos utilizando o localStorage
        btn.innerHTML = `<i b-action='check' class='fas fa-check ${obj.completed ? '' : 'displayNone'}'></i>`
        li.appendChild(btn)
        li.appendChild(p)
        li.appendChild(edit)
        li.appendChild(thrash)

        // criando a div oculta e seus elementos
        const containerEdit = document.createElement('div')
        containerEdit.className = 'editContainer'
        const inputEdit = document.createElement('input')
        inputEdit.setAttribute('type', 'text')
        inputEdit.className = 'editInput'
        inputEdit.value = obj.name
        containerEdit.appendChild(inputEdit)


        const containerEditBtn = document.createElement('button')
        containerEditBtn.className = 'editButton'
        containerEditBtn.textContent = 'Edit'
        //
        containerEditBtn.setAttribute('b-action', 'editBtn')

        containerEdit.appendChild(containerEditBtn)

        const containerCancelBtn = document.createElement('button')
        containerCancelBtn.className = 'cancelButton'
        containerCancelBtn.textContent = 'Cancel'
        //
        containerCancelBtn.setAttribute('b-action', 'cancelBtn')

        containerEdit.appendChild(containerCancelBtn)

        li.appendChild(containerEdit)

        return li
    }

    // adiciona um objeto literal ao array de objetos 'arrayTasks'

    function addTask(task) {
        arrayTasks.push({
            name: task,
            createdAt: Date.now(),
            completed: false
        })
    }


    // renderiza os elementos do array de objetos

    function render() {
        todoList.innerHTML = '' // limpa o html da ul
        arrayTasks.forEach(task => { // para cada task (objeto) em arrayTasks, faça um appendChild
            todoList.appendChild(generateLiTask(task)) // o appendChild então utiliza a função de gerar uma 'li', que usa a propriedade 'name' (linha 63) do objeto para inserir no parágrafo do html (linha 48)
        })

    }

    function clickedUl(e) {

        /* switch(e.target.getAttribute('b-action')){
            case 'check':
                console.log('teste')
                break

            
            case 'edit':
                e.target.parentElement.querySelector('.editContainer').style.display = 'flex'
                break

            case 'thrash':
                todoList.removeChild(e.target.parentElement)
                break

            case 'editBtn':
                const task = e.target.parentElement.parentElement.querySelector('.task')
                const editInput = e.target.parentElement.querySelector('.editContainer .editInput')
                task.textContent = editInput.value
                editInput.value = ''
                break

            case 'cancelBtn':
                e.target.parentElement.parentElement.querySelector('.editContainer').style.display = 'none'
                break

            default:
                return
        } */
        
        const bAction = e.target.getAttribute('b-action')
        if (!bAction) return

        let currentLi = e.target

        while (currentLi.nodeName !== 'LI') {
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)
        console.log(currentLiIndex)

        const actions = {
            check: function(){
                arrayTasks[currentLiIndex].completed = !arrayTasks[currentLiIndex].completed
                if(arrayTasks[currentLiIndex].completed){
                    currentLi.querySelector('.fa-check').classList.remove('displayNone')
                } else{
                    currentLi.querySelector('.fa-check').classList.add('displayNone')
                }
            },
            edit: function () {
                [...todoList.querySelectorAll('.editContainer')].forEach(cont => {
                    cont.style = ''
                })
                currentLi.querySelector('.editContainer').style.display = 'flex'
            },
            thrash: function () {
                arrayTasks.splice(currentLiIndex, 1)
                render()
            },
            editBtn: function () {
                const atualizandoInput = currentLi.querySelector('.editInput')
                arrayTasks[currentLiIndex].name = atualizandoInput.value

                console.log(arrayTasks)
                render()
            },
            cancelBtn: function () {
                currentLi.querySelector('.editContainer').style.display = 'none'
                currentLi.querySelector('.editInput').value = arrayTasks[currentLiIndex].name
            }
        }

        if (actions[bAction]) {
            actions[bAction]()
        }

    }




    // LISTENERS


    // adiciona listener ao input. Toda vez que o usuário digitar, um contador diminuirá os caracteres restantes 

    novoItem.addEventListener('input', function () {

        let restante = maxLengthInput - parseInt(novoItem.value.length)
        caracteresRestantesSpan.textContent = restante
    })


    // adicionar listener ao submit. O listener executará funções que adicionarão o que estiver no campo de input ao ul

    formulario.addEventListener('submit', function (e) {
        e.preventDefault()
        if (!novoItem.value) {
            alert('Adicione um item')
        } else {
            addTask(novoItem.value)
            render()
            novoItem.value = ''
            novoItem.focus()

            caracteresRestantesSpan.textContent = maxLengthInput
        }
    })


    todoList.addEventListener('click', clickedUl)

    // adiciona listener às 'lis' criadas dinamicamente
    /* function addEventListenerToLi(li){
        li.addEventListener('click', function(e){
            console.log(e)
            console.log(e.target)
            console.log(this)
            e.target.focus()
        })
    } */

    render()
}())