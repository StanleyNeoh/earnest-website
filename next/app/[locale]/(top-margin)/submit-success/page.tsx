import React from 'react';
import Link from 'next/link';

const SubmitSuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Submission Successful!</h1>
                <p className="text-gray-700 mb-6">Thank you for your submission. We will get back to you shortly.</p>
                <Link
                    href="/"
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default SubmitSuccessPage;