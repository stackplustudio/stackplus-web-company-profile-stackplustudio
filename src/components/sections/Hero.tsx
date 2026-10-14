import Image from "next/image";
import { FORMSUBMIT_ACTION } from "@/lib/site";
import { getLatestPortfolios } from "@/lib/queries";
import { portfolioCategoryLabel } from "@/lib/categories";
import HeroShowcase from "./HeroShowcase";

export default async function Hero() {
  const latest = await getLatestPortfolios(12);
  const projects = latest.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: portfolioCategoryLabel(p.category),
    year: p.year,
    image: p.images[0] ?? null,
  }));

  return (
    <section className="relative pt-4 pb-10 lg:pt-8 lg:pb-12 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Kiri: Teks & Input */}
        <div className="max-w-xl z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <p className="text-sm font-medium text-gray-500">
              Trusted by founders
            </p>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Build Digital <br />
            Products That <br />
            <span className="text-primary">Actually Work</span>
          </h1>

          <p className="text-gray-500 mb-10 max-w-md text-base leading-relaxed">
            Turning ideas into actionable digital solutions. Focus is on
            creating meaningful and impactful products.
          </p>

          {/* Input Form Email */}
          <form
            action={FORMSUBMIT_ACTION}
            method="POST"
            className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full p-2 shadow-lg shadow-gray-200/50 max-w-md border border-gray-100 gap-2 sm:gap-0"
          >
            <div className="flex items-center flex-1 px-2 py-2 sm:py-0">
              <div className="pr-2 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                required
                aria-label="Your email address"
                placeholder="Enter your email here"
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 w-full"
              />
            </div>
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value="[New Lead] Email from StackPlus website hero"
            />
            <button
              type="submit"
              className="bg-primary text-white w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full text-xs font-bold hover:bg-primary/90 transition-all whitespace-nowrap"
            >
              CONTACT US
            </button>
          </form>
        </div>

        {/* Kanan: Portfolio Showcase */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center mt-4 lg:mt-0">
          {/* Latar belakang grid & gradient glow */}
          <div className="absolute right-0 top-0 w-3/4 h-3/4 bg-surface-alt rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute w-40 h-40 sm:w-64 sm:h-64 bg-primary opacity-[0.05] sm:opacity-10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>

          {projects.length > 0 ? (
            <HeroShowcase projects={projects} />
          ) : (
            <Image
              src="/icons/Primary Logo 2 PNG.png"
              alt="StackPlus Studio logo"
              width={250}
              height={250}
              className="relative z-10 h-[140px] w-[140px] object-contain drop-shadow-xl sm:h-[250px] sm:w-[250px]"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}