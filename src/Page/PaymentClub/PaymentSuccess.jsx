import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const res = await axiosSecure.post("/verify-payment", { sessionId });
            
            if (res.data.paymentStatus === "paid") {

                // payment successful → now insert join record
                await axiosSecure.post("/joinMember", res.data.joinInfo);

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
    }, [axiosSecure,navigate,sessionId]);

    return <p className="text-center mt-20 text-xl">Verifying payment...</p>;
}
