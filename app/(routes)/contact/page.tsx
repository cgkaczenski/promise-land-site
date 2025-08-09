import getStore from "@/actions/get-store";

const ContactPage = async () => {
  const store = await getStore();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">{store.description}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">
              Rollin Caristianos, President
            </h3>
            <p className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              501-318-8782
            </p>
            <p className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              rcaristianos21@hotmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
