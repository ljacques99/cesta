import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Context } from "../main"
import { ethers } from "ethers"
import { Link } from 'react-router-dom'

export function Cesta() {
    const [estado, setEstado]= useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [txOK, setTxOK] = useState(null)
    const [txKO, setTxKO] = useState(null)
    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0)
    useEffect(()=>{
        window.ethereum && window.ethereum.request({
            method:'eth_requestAccounts'
        }).then( cuentas => {
            setCuenta(cuentas[0])
            ethereum.on("accountsChanged", (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    }, [])

    async function pagar() {
        const txParams = {
            to: "0xC81C8a7F668eAEc54a8ef5a78466410AbceEe328", // compte test curso
            from: cuenta,
            value: ethers.utils.parseEther(total.toString()).toHexString()
        }
        try {
            console.log(txParams)
            const tx = await ethereum.request({
                method:"eth_sendTransaction",
                params:[ txParams]
            })
            setTxOK(tx)
        } catch (error) {
            setTxKO(error)
        }

        console.log(txParams)
    }

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {estado.cesta.map(i => (
                    <tr key={i.producto.ProductID}>
                        <td>{i.producto.ProductID}</td>
                        <td><Link to={`/productos/${i.producto.ProductID}`}>{i.producto.ProductName}</Link></td>
                        <td>{i.producto.UnitPrice}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total : {total} </h3>
        <h4>Cuenta de pago : {cuenta}</h4>
        <button onClick= {() => pagar()} className="btn btn-primary">Pagar</button>{/*  il faudrait faire disparaître le bouton quand c'est payé */}
        {txOK && <p>Referencia de transaccion : {txOK}</p>}
        {txKO && <p>{txKO}</p>}
    </div>
}