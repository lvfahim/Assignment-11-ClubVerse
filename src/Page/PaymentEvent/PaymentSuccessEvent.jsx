import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
const PaymentSuccessEvent = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const isMounted=useRef(false)

    useEffect(() => {
        if(isMounted.current)return
        isMounted.current=true
        if (sessionId) {
            axiosSecure.patch(`/payment-success-event?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId : res.data.trackingId
                    })
                })
        }

    }, [sessionId, axiosSecure])

    return (
        <div>
            <h2 className="text-4xl">Payment successful</h2>
            <p>Your TransactionId: {paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccessEvent;