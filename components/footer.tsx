"use client";

import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleManageSubscription = () => {
    const accountPage = process.env.NEXT_PUBLIC_ACCOUNT_PAGE || "/account";
    router.push(accountPage);
  };

  return (
    <footer className="mt-auto relative z-20">
      <div className="mx-auto px-2 py-4 max-w-7xl">
        <p className="text-center text-xs text-black">
          The Promised Land is a 501(c)(3) nonprofit charity registered in the
          US under EIN: <span className="whitespace-nowrap">33-3736069</span>
        </p>
        <p className="text-center text-xs text-black mt-2">
          Need to manage your subscription?{" "}
          <button
            onClick={handleManageSubscription}
            className="text-indigo-600 hover:text-indigo-800 underline pointer-events-auto"
          >
            Click here
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
