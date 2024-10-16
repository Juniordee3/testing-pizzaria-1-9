"use client";

import {useEffect, useState} from "react";

import {PuffLoader} from "react-spinners";

import { getJSONData } from '@/tools/Toolkit';
import { Orders, OrderDetails } from '@/tools/orders.model';

import OrderInfo from './OrderInfo';

export default function OrdersReport({setAppState, appState}:{setAppState:Function, appState:number}) {
    // retrieve server sided script
    const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

    // ------------------------- private methods
    const getOrders = async () => {
        const data:Orders = await getJSONData(RETRIEVE_SCRIPT, false, true);
        console.log(data);

        // save it in a state variable - because it is used in JSX and needs to persist
        setOrders(data.orders);

        // data all loaded! Change app state of web app
        setAppState(3);
    }



    // ------------------------- useEffects
    useEffect(() => {
        if (appState == 2) getOrders();
    }, [appState]);

    // ------------------------- state variables
    const [orders, setOrders] = useState<OrderDetails[]>([]);

    if (appState == 1) {

        return (<>No orders retrieved...</>);

    } else if (appState == 2) {

        return (
            <>
                <div className={"flex items-center gap-5"}>
                    {/*<PuffLoader color={"#000000"} size={20} />*/}
                    <i className="fas fa-pizza-slice fa-spin"></i>
                    <span> Loading...</span>
                </div>
            </>
        )

    } else {
        return (
            <>
                <div>
                    <div className="divide-dashed divide-y-2 divide-accent">
                        {orders.map(
                            (orderData: OrderDetails, i: number) =>
                                <OrderInfo
                                    key={i}
                                    id={orderData.id}
                                    name={orderData.name}
                                    address={orderData.address}
                                    city={orderData.city}
                                    size={orderData.size}
                                    delivered={orderData.delivered}
                                    toppings={orderData.toppings}
                                    notes={orderData.notes}
                                />
                        )}
                    </div>
                </div>
            </>
        );
    }
}