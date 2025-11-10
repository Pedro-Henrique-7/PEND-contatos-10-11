'use strict'

import { lerContatos } from "./contato.js"

import { criarContato } from "./contato.js"

import { deletarContato } from "./contato.js"

async function criarCard() {

    let contatos = await lerContatos()
    const container = document.getElementById('container')

    contatos.forEach(contato => {
        const cardContato = document.createElement('div')
        cardContato.classList.add('card-contato')

        cardContato.addEventListener('click', () => {
            const main = document.querySelector('main')
            main.classList.replace('card-show', 'form-show')
            preencherContato(contato)
        })


        const img = document.createElement('img')
        img.src = contato.foto

        const h2 = document.createElement('h2')
        const p = document.createElement('p')

        h2.textContent = contato.nome
        p.textContent = contato.celular

        cardContato.append(img, h2, p)
        container.appendChild(cardContato)

    });
}

function abrirFormularioNovoContato() {
    const btnNovoContato = document.getElementById('novo-contato')
    btnNovoContato.addEventListener('click', () => {
        const main = document.querySelector('main')
        main.classList.replace('card-show', 'form-show')

        const foto = document.getElementById('preview-image')
        foto.src = ""

        const nome = document.getElementById('nome')
        nome.value = ""

        const email = document.getElementById('email')
        email.value = ""

        const celular = document.getElementById('celular')
        celular.value = ""

        const endereco = document.getElementById('endereco')
        endereco.value = ""

        const cidade = document.getElementById('cidade')
        cidade.value = ""

        const inputFoto = document.getElementById('foto')
        inputFoto.addEventListener('change', () => {
            foto.src = URL.createObjectURL(inputFoto.files[0])
        })
    })

}

function fecharFormulario() {

    const btnCancelar = document.getElementById('cancelar')
    btnCancelar.addEventListener('click', () => {
        const main = document.querySelector('main')
        main.classList.replace('form-show', 'card-show')
    })

}


async function preencherContato(contato) {

    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const celular = document.getElementById('celular')
    const endereco = document.getElementById('endereco')
    const cidade = document.getElementById('cidade')
    const foto = document.getElementById('preview-image')

    nome.value = contato.nome
    email.value = contato.email
    celular.value = contato.celular
    endereco.value = contato.endereco
    cidade.value = contato.cidade
    foto.src = contato.foto

    const btnDeletar = document.getElementById('deletar')
    btnDeletar.addEventListener('click', () => {

        let resposta = confirm("Deseja mesmo deletar? ")

        if (resposta === true) {
            fecharFormulario()
            deletarContato(contato.id)

        }
    })




}

async function enviarForm() {
    const foto = document.getElementById('preview-image')
    const inputFoto = document.getElementById('foto')
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const celular = document.getElementById('celular').value
    const endereco = document.getElementById('endereco').value
    const cidade = document.getElementById('cidade').value



    let contato = {
        'nome': nome,
        'email': email,
        'celular': celular,
        'endereco': endereco,
        'cidade': cidade,
        'foto': foto

    }

    await criarContato(contato)

}




await criarCard()

const btnSalvar = document.getElementById('salvar')
btnSalvar.addEventListener('click', enviarForm)




abrirFormularioNovoContato()
fecharFormulario()