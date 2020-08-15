import React, { useState, useEffect } from 'react'

export default function EditProductForm(props) {
    const [product, setProduct] = useState(props.currentProduct)

    useEffect(() => {
        setProduct(props.currentProduct)
    }, [props.currentProduct])

    function handleInputChange(event) {
        const { name, value } = event.target
        setProduct({ ...product, [name]: value })
    }

    return (
        <form id="form"
            onSubmit={(event) => {
                event.preventDefault()
                props.updatedProduct(product)
            }}
        >
            <label>Nome:</label>
            <input
                id="nome"
                value={product.nome}
                name="nome"
                placeholder="Digite o nome do produto"
                onChange={handleInputChange}
            />
            <label>Preço:</label>
            <input
                id="preco"
                value={product.preco}
                name="preco"
                placeholder="Digite o valor"
                onChange={handleInputChange}
            />
            <button type="submit">
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
            </button>
            <button
                onClick={() => props.setEditing(false)} //Vai chamar a função do pai setEditing
                className="cancel"
            >
                <i className="fa fa-ban" aria-hidden="true"></i>
            </button>
        </form>
    )
}