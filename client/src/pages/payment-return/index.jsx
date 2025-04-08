import {Card, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {capturePaymentAndFinalizeService} from "@/services/index.js";


function PaypalPaymentReturnPage(){

    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId")
    const payerId = params.get("PayerID")
    console.log(paymentId, payerId)


    useEffect(() => {
        if(paymentId && payerId){
            async function capturePayment(){
                const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))

                const response = await capturePaymentAndFinalizeService(
                    paymentId, payerId, orderId
                );

                if(response?.success){
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = '/student-courses'
                }
            }
            capturePayment()
        }

    }, [paymentId,payerId ])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing paymet... Please wait</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalPaymentReturnPage;