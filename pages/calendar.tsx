import * as React from 'react';
import MainLayout from '../src/components/MainLayout'
import {useDispatch, useSelector} from "react-redux";
import {createCustomAction, removeCustomAction} from "../src/store/customReducer";

interface Client {
    name: any;
}

export function CalendarContent() {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash)
    const clients = useSelector(state => state.custom.customs)
    const addCash = () => {
        dispatch({type: "ADD_CASH", payload: 1})
    }
    const takeCash = () => {
        dispatch({type: "TAKE_CASH", payload: 1})
    }

    function addClient(name: any) {
        const client = {
            name,
            id: Date.now()
        }
        dispatch(createCustomAction(client))
    }

    const removeClient = (client: any) => {
        dispatch(removeCustomAction(client.id))
    }
    return(
        <div>
            <div className="container">
                <div className="cash">{cash}</div>
                <button onClick={() => addCash()}>add</button>
                <button onClick={() => takeCash()}>take</button>
                <button onClick={() => addClient(prompt())}>Add Client</button>
            </div>
            <div>
                {clients.length > 0 ?
                    <div>
                        {clients.map(client =>
                            <div onClick={() => removeClient(client)}>{client.name}</div>
                        )}
                    </div>
                    :
                    <div>Empty</div>
                }
            </div>
        </div>
    )
}

export default function Calendar() {
    return(
        <MainLayout>
            <CalendarContent></CalendarContent>
        </MainLayout>
    )
}