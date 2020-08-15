import React, { useState } from 'react'

export default function AddProduct(props) {
    const [product, setProduct] = useState('')

    function handleInputChange(event) {
        const { name, value } = event.target
        console.log(name, value)
        setProduct({ ...product, [name]: value })
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            if (!product.nome || !product.preco) return
            props.create(product)
            document.querySelector("#form").reset()
        }}
            id="form"
        >
            <label>Nome:</label>
            <input
                id="nome"
                name="nome"
                placeholder="Digite o nome do produto"
                onChange={handleInputChange}
            />
            <label>Preço:</label>
            <input
                id="preco"
                name="preco"
                placeholder="Digite o valor"
                onChange={handleInputChange}
            />
            <button type="submit">

                <i className="fa fa-floppy-o" aria-hidden="true"></i>
            </button>
        </form>
    )
}
