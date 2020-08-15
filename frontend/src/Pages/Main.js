import React, { useState, useEffect } from 'react'
import api from '../api'

import './Main.css'

import AddProduct from './components/AddProduct'
import EditProductForm from './components/EditProductForm'

export default function Main() {
    const initialFormState = { id: null, nome: '', preco: '' }

    const [products, setProducts] = useState([])
    const [editing, setEditing] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(initialFormState) //Usuário atual que está sendo editado

    useEffect(() => {
        api.get('')
            .then(response => {
                setProducts(response.data)
            })
    }, [products])



    function editRow(product) {
        setEditing(true) //Vai setar o modo de edição para Verdadeiro
        setCurrentProduct({ id: product._id, nome: product.nome, preco: product.preco }) //Vai setar o valor para ser editado
    }

    async function updatedProduct(updatedProduct) {
        // console.log(updatedProduct)
        const data = updatedProduct
        await api.put('', data)
            .then(res => console.log(res.data))
        setEditing(false)

    }

    function create(product) {
        const data = product
        api.post('', data)
    }

    function remove(id) {
        setEditing(false)
        api.delete('', { data: { id } })
    }

    return (
        <React.Fragment>
            <div className="main">
                <h1>Crud com NodeJs</h1>
                <hr></hr>
                {editing ?
                    (<EditProductForm
                        setEditing={setEditing}
                        currentProduct={currentProduct}
                        updatedProduct={updatedProduct}
                    />) : <AddProduct create={create} />

                }
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <th >{product.nome}</th>
                                <th>{product.preco}</th>
                                <th>
                                    <button className="delete" onClick={() => remove(product._id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                    <button className="put" onClick={() => editRow(product)}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </React.Fragment >
    )
}

