import Card from "@/components/Card";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import { Navbar, NavbarItem } from "@/components/Navbar";
import Section, { SectionContent } from "@/components/Section";
import Head from "next/head";

export default function Services() {
  return (
    <>
      <Head>
        <title>Fleet | Services</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <NavbarItem to="/" name="Home" />
        <NavbarItem to="/services" name="Services" />
        <NavbarItem to="/about" name="About" />
      </Navbar>
      <main className="h-full min-h-screen w-full ">
        <Section>
          <SectionContent>
            <h1 className="text-center text-6xl">Our Services</h1>
            <Divider />
            <div className="text-3xl">
              At Fleet, we understand the importance of efficient logistics
              solutions in driving your business forward. With our commitment to
              simplifying and streamlining the complexities of supply chain
              management, we offer a range of comprehensive services tailored to
              meet your unique needs.
              <br />
              <br />
              Our minimalist approach ensures that your logistics experience is
              seamless,&nbsp;
              <span className="font-bold">
                allowing you to focus on what matters most - growing your
                business.&nbsp;
              </span>
              Discover our services below and let Fleet be your trusted
              logistics partner:
            </div>

            {/* Grid card i guess */}
            <div className="mt-20 grid grid-cols-2 gap-4">
              <Card
                name="Transportation Services"
                imageUrl="/images/transportation.jpg"
                description="Simplify your shipping needs with our comprehensive transportation solutions. We offer Full Truckload (FTL) and Less than Truckload (LTL) shipments, expedited delivery options, inter-modal transportation, and specialized equipment for sensitive or oversized cargo."
              />
              <Card
                name="Warehousing and Distribution"
                imageUrl="/images/warehouse.jpg"
                description="Streamline your storage and distribution operations with our modern warehouse facilities. Benefit from our inventory management services, cross-docking capabilities, trans-loading solutions, and just-in-time (JIT) delivery options."
              />
              <Card
                name="Supply Chain Management"
                imageUrl="/images/supply-chain.jpg"
                description="Optimize your supply chain with our end-to-end solutions. We provide demand forecasting, inventory planning, vendor management, procurement support, and efficient handling of reverse logistics and returns management."
              />
              <Card
                name="Customs Clearance and Trade Compliance"
                imageUrl="/images/clearance.jpg"
                description="Navigate customs regulations effortlessly with our expert assistance. We handle import/export documentation, duty and tax management, and ensure compliance with international trade laws."
              />
            </div>
          </SectionContent>
        </Section>
      </main>
      <Footer />
    </>
  );
}
