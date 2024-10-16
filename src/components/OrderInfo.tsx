"Use Client"

import { OrderDetails } from '@/tools/orders.model';
import { Topping } from "@/tools/orders.model";
import { Note } from "@/tools/orders.model";

export default function OrderInfo({ id, name, city, address, size, toppings, notes }:OrderDetails) {
    return (
        <>
            <div className="text-[0.9rem] pb-5 pt-5">
                <div>
                    <div className="font-bold text-[1.35rem] text-accent">
                        Order #{id}
                    </div>
                    <div>
                        <div className="font-bold pt-[15px]"><i className="fas fa-info-circle"></i> Customer Information</div>
                        <div>
                            {name}
                            <br/>
                            {address}
                            <br/>
                            {city}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold pt-[15px]"><i className="fas fa-pizza-slice"></i> Pizza Size</div>
                        <div>
                            {size}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold pt-[15px]"><i className="fas fa-list-ul"></i> Order Details</div>
                        <div>
                            {toppings.map(
                                (toppingsData: Topping, i: number) =>
                                    <div key={i}>{toppingsData.topping}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold pt-[15px]"><i className="fas fa-sticky-note"></i> Order Notes</div>
                        <div>
                        {notes.map(
                                (noteData: Note, i: number) =>
                                    <div key={i}>{noteData.note}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}