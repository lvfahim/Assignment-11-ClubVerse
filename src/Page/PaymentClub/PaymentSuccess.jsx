import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const isMounted=useRef(false)
    useEffect(() => {
        if(isMounted.current)return
        isMounted.current=true
        const verify = async () => {
            const res = await axiosSecure.post("/verify-payment", { sessionId });

            if (res.data.paymentStatus === "paid") {
                await axiosSecure.post("/joinMember", res.data.joinInfo);
                if (sessionId) {
                    axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                        .then(res => {
                            setPaymentInfo({
                                transactionId: res.data.transactionId,
                            })
                        })
                }
                Swal.fire({
                    title: "Payment successful! You joined the club.",
                    icon: "success"
                });

                navigate("/dashboard/myjoinclub");
            } else {

                Swal.fire({
                    title: "Payment failed or cancelled!",
                    icon: "error"
                });

                navigate("/showAllClub");
            }
        };

        verify();
    }, [axiosSecure, navigate, sessionId]);

    return <p className="text-center mt-20 text-xl">Verifying payment...</p>;
}