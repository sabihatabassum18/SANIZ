
export default function LandingPage() {
  return (
    <>
      <div
        className="hero min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://fal.media/files/penguin/5sIay2J0M9wFGI-XXCPTG_7e0bc7fcb0564363af091ea79c4a4252.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Wellcome to SANIZ</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Few of our images */}

      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center">Few of our generated Images</h2>
          <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card shadow-lg">
              <img src="https://fal.media/files/penguin/5sIay2J0M9wFGI-XXCPTG_7e0bc7fcb0564363af091ea79c4a4252.jpg" alt="Image" />
            </div>
            <div className="card shadow-lg">
              <img src="https://fal.media/files/penguin/5sIay2J0M9wFGI-XXCPTG_7e0bc7fcb0564363af091ea79c4a4252.jpg" alt="Image" />
            </div>
            <div className="card shadow-lg">
              <img src="https://fal.media/files/penguin/5sIay2J0M9wFGI-XXCPTG_7e0bc7fcb0564363af091ea79c4a4252.jpg" alt="Image" />
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 ">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center">Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title">AI Photo Generation</h2>
                <p>
                  Our AI Photo Generation feature leverages advanced machine learning algorithms to create stunning, high-quality images from scratch. Whether you need unique visuals for your marketing campaigns, social media posts, or creative projects, our AI-powered tool can generate photos that meet your specific requirements.
                </p>
              </div>
            </div>
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Zero Configuration</h2
                >
                <p>
                  Our Zero Configuration feature is designed to simplify your workflow by eliminating the need for complex setup and configuration. With this feature, you can get started quickly and focus on what truly matters—building and deploying your applications.
                </p>

              </div>
            </div>
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Free Trail</h2>
                <p>
                  Enjoy our Free Trial without any credit card required. Users will receive 100 tokens for generating images, allowing you to explore our features and capabilities without any commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            SANIZ
            <br />
            Ai Image Generator
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>

    </>

  )
}


