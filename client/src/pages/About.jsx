

function About() {
 

  return (
    <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          About us
        </h2>
        <div>
          <p className="text-center text-pretty text-base text-slate-600">
            At Stunna Electronics our mission is to ensure our customers get
            high
            <br />
            quality computer products and phones at affordable rates every day.
            <br />
            Our vision is to be the most preferred ecommerce platform in terms
            of
            <br />
            pricing and quality when it comes to computing products.
            <br />
          </p>
        </div>
        <p className="mt-8 mb-8 lg:mb-12 font-light text-center text-gray-500 sm:text-xl">
          Got a technical issue? Want to send feedback about a product? Need
          details about our Business? Let us know.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#3b82f6] focus:border-[#3b82f6] block w-full p-2.5 "
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6]"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#1d4ed8] sm:w-fit hover:bg-[#1e40af] focus:ring-4 focus:outline-none focus:ring-[#93c5fd]"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default About;


