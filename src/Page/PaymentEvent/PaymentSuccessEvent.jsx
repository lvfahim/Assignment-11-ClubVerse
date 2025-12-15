import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
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
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId : res.data.trackingId
                    })
                })
        }

    }, [sessionId, axiosSecure])

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 text-center">
            
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                Payment Successful 🎉
            </h2>

            <p className="text-gray-500 mb-6">
                Thank you! Your payment has been completed successfully.
            </p>

            {/* Payment Info */}
            <div className="bg-gray-100 rounded-xl p-4 mb-6 text-left space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">
                        Transaction ID
                    </span>
                    <span className="text-gray-800 font-mono">
                        {paymentInfo.transactionId || '—'}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <Link
                to="/dashboard/myJoinEvent"
                className="inline-block w-full py-3 rounded-xl bg-teal-600 text-white font-semibold text-lg hover:bg-teal-700 transition duration-300"
            >
                Go to My Joined Events
            </Link>

            {/* Footer Note */}
            <p className="text-xs text-gray-400 mt-6">
                If you face any issue, please contact support.
            </p>
        </div>
    </div>
);
};

export default PaymentSuccessEvent;