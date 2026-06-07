import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[819px] flex items-center overflow-hidden bg-on-background">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA5mChFCdja4XZKmbpH1djSEO0_JlnMP1SBgCWRxx5Ntlv6nLzIDeWGEBDNtL8ItJvmeNuOzVkc-ZcnGCrVJqB3kIKTzdP3j-TtOMh3I2lXitgBBFi3VVxPVLqAZCnHiKXo2jfPKNTsK1O0mOXGC6LHnPPDuWcmzH_jcM0zK3-EY7N0VwhEja6nC_1X5WSP2D08Mh-vD0b8s3DDe8dZ2hLPN84jy6KPUUMaiTa_dRE22wn-bgYhSfcqygeLcRe-8sN0aQyoehX1cI"
          alt="A professional athlete in peak condition performing an explosive sprinting movement"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-gutter max-w-container-max mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-on-primary mb-6">
            UNLEASH YOUR PEAK PERFORMANCE
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container bg-primary-container/20 backdrop-blur-sm p-4 mb-8 border-l-4 border-primary">
            Pharmaceutical-grade supplementation engineered for those who demand
            uncompromising results. Scientific rigor meets athletic intensity.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-bold text-label-bold uppercase tracking-widest px-10 py-4 transition-all duration-200">
              SHOP NOW
            </button>
            <button className="bg-transparent border-2 border-on-primary text-on-primary font-label-bold text-label-bold uppercase tracking-widest px-10 py-4 hover:bg-on-primary hover:text-on-background transition-all duration-200">
              OUR SCIENCE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
