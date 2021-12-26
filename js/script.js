; (function () {

    const formulario = document.getElementById('todo-form')
    const novoItem = document.getElementById('item')
    const btnAdd = document.getElementById('add')
    const todoList = document.getElementsByClassName('todo-list')[0]
    const maxLengthInput = parseInt(novoItem.maxLength)
    const caracteresRestantesSpan = document.querySelector('.caracteres-restantes p > span')



    caracteresRestantesSpan.textContent = maxLengthInput

    // adicionar listener ao submit. O listener executará um a função que adicionará o que estiver no campo de input ao ul

    formulario.addEventListener('submit', function (e) {
        e.preventDefault()
        if (!novoItem.value) {
            alert('Adicione um item')
        } else {
            addLi(novoItem.value)
            novoItem.value = ''
            novoItem.focus()

            caracteresRestantesSpan.textContent = maxLengthInput
        }
    })

// Função que adiciona os nós ao dom para poder ser chamada
    function addLi(valor){
        const li = document.createElement('li')
        const btn = document.createElement('button')
        const btnI = document.createElement('i')
        const p = document.createElement('p')
        const edit = document.createElement('i')
        const thrash = document.createElement('i')

        li.className = 'todo-item'
        btn.className = 'check-button'
        btnI.className = 'far fa-square'
        p.className = 'task'
        edit.className = 'fas fa-edit'
        thrash.className = 'fas fa-trash-alt'

        p.textContent = valor

        btn.appendChild(btnI)
        li.appendChild(btn)
        li.appendChild(p)
        li.appendChild(edit)
        li.appendChild(thrash)
        todoList.appendChild(li)
        
    }


    // adicionar listener ao input. Toda vez que o usuário digitar, um contador diminuirá os caracteres restantes 

    novoItem.addEventListener('input', function(){
        console.log(novoItem.value.length)
        let restante = maxLengthInput - parseInt(novoItem.value.length)
        caracteresRestantesSpan.textContent = restante
    })
}())