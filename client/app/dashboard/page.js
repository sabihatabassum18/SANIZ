"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export async function updateSessionData(updatedData) {
    const session = await getSession();
    console.log("Session before update:", session);
    // Use `signIn` to update the session with new data
    await signIn("credentials", {
        redirect: false, // Prevent page reload
        session: {
            ...session,
            user: {
                ...session.user,
                ...updatedData,
            },
        },
    });
}


export default function Dashboard() {
    const { data: session, update } = useSession();

    const [imageUrl, setImageUrl] = useState("https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [prompt, setPrompt] = useState("");
    const router = useRouter();


    const fetchImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Replace this with the user's token from your authentication
            const token = session?.user?.accessToken;

            if (!token) {
                setError("You must be logged in to generate an image.");
                setLoading(false);
                return;
            }

            refreshSession();

            const response = await axios.post(
                "http://localhost:8000/api/image-generation",
                {
                    prompt: prompt,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                }
            );

            if (response.data?.data?.imageUrl) {
                setImageUrl(response.data.data.imageUrl);
                setLoading(false);
            } else {
                setError("Image URL not found in the response.");
            }
        } catch (err) {
            if (err.response?.status === 400 && err.response?.data?.message === "Insufficient tokens. Please purchase more tokens.") {
                setTimeout(() => {
                    // Redirect to the pricing page
                    router.push("/pricing");
                }, 2000);
            }
            setError(err.response?.data?.message || "Failed to generate the image.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!imageUrl) {
            return;
        }

        try {
            // Fetch the image data as a Blob
            const response = await axios.get(imageUrl, { responseType: "blob" });

            // Create a Blob object from the response data
            const blob = response.data;
            const link = document.createElement("a");

            // Create a URL for the Blob object
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = JSON.stringify(new Date()) + "saniz.png"; // Set the download filename
            document.body.appendChild(link); // Append the link to the body
            link.click(); // Simulate a click to download
            document.body.removeChild(link); // Clean up by removing the link

            // Release the object URL after download
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the image", error);
        }
    };

    const refreshSession = async () => {
        const token = session?.user?.accessToken;
        if (!token) {
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedData = await response.json();

            // Update session with the latest data
            const updateDto = {
                creditToken: updatedData.token,
                subscriptionType: updatedData.subscription.type,
            }

            const res = await fetch("/api/update-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateDto),
            });
            await update(updateDto);
            console.log("Session updated:", updateDto);
        } catch (error) {
            console.error("Failed to refresh session:", error);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  pb-20 sm:pb-20  sm:p-10 font-[family-name:var(--font-geist-sans)]">

            {/* Navbar */}
            <div className="navbar bg-violet-300 rounded-lg">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">SANIZ</a>
                </div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    {session?.user?.name}
                                    <span className="badge">T: {session?.user?.creditToken}</span>
                                </a>
                            </li>
                            <li>
                                {session?.user?.subscriptionType === "trial" ? <a>Try Premium
                                    <svg fill="#FFD700" width="15px" height="15px" viewBox="0 -5.47 56.254 56.254" xmlns="http://www.w3.org/2000/svg">
                                        <path id="diamond_premium" data-name="diamond premium" d="M494.211,354.161l1.174-1.366H482.552L469.8,367.5h12.94Zm-8.4,13.336H510.05l-6.589-7.664-5.528-6.429-8.354,9.713Zm-15.856,2.329,24.1,25.356L482.53,369.826Zm40.824,0h-2.1l-8.829,0H485.083l12.774,28.1.082.178,12.17-26.8Zm-8.94,25.322,24.057-25.32H513.337Zm24.215-27.65L513.3,352.8H500.478l12.642,14.7Z" transform="translate(-469.802 -352.795)" />
                                    </svg>
                                </a> : <a>{session?.user?.subscriptionType} User</a>}
                            </li>
                            <li><a onClick={() => signOut({ callbackUrl: "/login" })}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <main className="flex flex-col mt-16 gap-8 items-center justify-center w-full sm:w-[80%]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-center"><span className="text-violet-600">Generate</span> Images from Text</h1>
                    <p className="text-lg text-center">Transforming moments into masterpices with Ai</p>
                </div>
                <div className="flex w-full gap-8 ">
                    <div className="flex-1">
                        {/* Form input a textarea with generate button */}
                        <div className="card glass w-full max-h-full">
                            <div className="p-2">
                                <form onSubmit={fetchImage}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Input Prompt</span>
                                        </label>
                                        <textarea className="textarea h-24 textarea textarea-bordered textarea-primary" placeholder="Type whatever you want to imagine" onChange={(e) => setPrompt(e.target.value)} ></textarea>
                                    </div>
                                    <div className="p-2">

                                        <div className="card-actions justify-end">
                                            <button className="btn bg-violet-400"  > {loading ? "Generating..." : "Generate Image"} </button>
                                        </div>
                                        {error && <p className="text-red-500 mb-4">{error}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="card glass w-full h-full">
                            <figure>
                                <img
                                    src={imageUrl || "https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg"}
                                    alt="car!" />
                            </figure>
                            <div className="p-2">

                                <div className="card-actions justify-end">
                                    <button className="btn bg-violet-400" onClick={handleDownload}>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
