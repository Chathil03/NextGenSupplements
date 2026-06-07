import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FlaskConical, Beaker, ClipboardCheck, Activity, Search, AlertCircle } from "lucide-react";

export default function SciencePage() {
  return (
    <div className="bg-surface min-h-screen pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-on-background py-24 border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                <span className="text-primary font-label-bold text-xs uppercase tracking-[0.4em] mb-6 block">Evidence-Based Excellence</span>
                <h1 className="text-display-lg font-black text-on-primary mb-8 leading-[1.1]">The Science of <br />Precision.</h1>
                <p className="text-body-lg text-secondary-fixed-dim opacity-80 leading-relaxed mb-10">
                    NextGen is more than a brand; it's a pharmaceutical standard application. We treat every supplement like a clinical trial, ensuring maximum efficacy through molecular precision.
                </p>
                <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3 text-on-primary">
                        <ClipboardCheck className="w-6 h-6 text-primary" />
                        <span className="font-label-bold text-sm uppercase">ISO Certified Labs</span>
                    </div>
                    <div className="flex items-center gap-3 text-on-primary">
                        <Activity className="w-6 h-6 text-primary" />
                        <span className="font-label-bold text-sm uppercase">HPLC Verified</span>
                    </div>
                </div>
            </div>
            <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-outline-variant bg-surface-container shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                    <img 
                        src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80" 
                        alt="Laboratory testing"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Core Methodology Grid */}
      <section className="py-32 px-gutter max-w-container-max mx-auto space-y-24">
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-display-sm font-black text-on-surface mb-6 uppercase tracking-tight">Our Quality Protocol</h2>
            <p className="text-body-md text-secondary opacity-70">We maintain a rigorous 4-stage testing protocol that exceeds industry standard (GMP) requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { title: "RAW SPECTRUM", icon: Beaker, desc: "Testing raw materials for contaminants and heavy metals before ingestion." },
                { title: "BIO-AVAILABILITY", icon: Activity, desc: "Optimizing molecular structures for peak human absorption rates." },
                { title: "CLINICAL RATIOS", icon: ClipboardCheck, desc: "Formulated using the exact dosages found in peer-reviewed trials." },
                { title: "THIRD-PARTY VERIFIED", icon: FlaskConical, desc: "Independent batch testing to ensure what's on the label is in the tub." }
            ].map((step, idx) => (
                <div key={step.title} className="bg-surface-container border border-outline-variant p-8 rounded-3xl hover:border-primary transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-on-background flex items-center justify-center mb-10 group-hover:bg-primary transition-colors">
                        <step.icon className="w-6 h-6 text-on-primary" />
                    </div>
                    <span className="text-primary font-label-bold text-[10px] uppercase tracking-widest block mb-4 italic font-black">Stage 0{idx + 1}</span>
                    <h3 className="text-title-lg font-black text-on-surface mb-4 uppercase">{step.title}</h3>
                    <p className="text-body-sm text-secondary opacity-70 leading-relaxed">{step.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Lab Reports Section */}
      <section className="pb-32 px-gutter max-w-container-max mx-auto">
        <div className="bg-on-background rounded-[40px] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <Search className="w-48 h-48 text-primary" />
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-display-sm font-black text-on-primary mb-8 leading-tight">Batch Results. <br />Full Transparency.</h2>
                    <p className="text-body-lg text-secondary-fixed-dim opacity-70 mb-10">Scan the QR code on your product or enter the batch ID below to see the precise lab results for your specific container.</p>
                    <div className="flex gap-4 p-2 bg-surface/10 rounded-2xl border border-outline-variant/20 focus-within:border-primary transition-all">
                        <input 
                            type="text" 
                            placeholder="Enter Batch ID (e.g. NGS-24-991)"
                            className="bg-transparent border-none outline-none text-white flex-1 px-4 font-mono uppercase tracking-widest text-sm"
                        />
                        <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
                            VERIFY
                        </button>
                    </div>
                </div>
                <div className="bg-primary/10 rounded-3xl border border-primary/20 p-8">
                    <div className="flex items-center gap-4 text-primary mb-6">
                        <AlertCircle className="w-6 h-6" />
                        <span className="font-label-bold text-sm uppercase tracking-widest">Active Certification</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-outline-variant/30">
                            <span className="text-secondary-fixed-dim text-sm">NSF Safe for Sport</span>
                            <span className="text-primary font-bold text-sm">CERTIFIED</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-outline-variant/30">
                            <span className="text-secondary-fixed-dim text-sm">ISO 9001:2015</span>
                            <span className="text-primary font-bold text-sm">COMPLIANT</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-secondary-fixed-dim text-sm">Informed Choice</span>
                            <span className="text-primary font-bold text-sm">VERIFIED</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
