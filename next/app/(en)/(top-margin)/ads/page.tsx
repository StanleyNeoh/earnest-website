"use client";
import { useRouter } from 'next/navigation';
import EarnestBlackLogo from '@/public/earnest-black-logo.svg';

export default function AdsLandingPage() {
  const router = useRouter();

  const handleFormSubmit = () => {
    router.push('/contact');
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="container-fluid pb-5 pt-5" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container">
          <div className="row g-5 align-items-center">

            <div className="col-xl-6" data-wow-delay="0.2s">
              <h4 className="text-primary mb-2" style={{ fontSize: "1.2rem", color: "#3f3f3f" }}>
                Office Renovation Services in Singapore
              </h4>

              <h1 className="display-5 mb-3" style={{ fontSize: "2.6rem", fontWeight: 600 }}>
                Office transformations<br />that exceed expectations
              </h1>

              <p className="mb-4">
                Whether you're refreshing an existing space, creating a brand-new office, or transforming a commercial property — our end-to-end design and build solution makes the entire renovation journey smooth, efficient, and aligned with your vision.
              </p>

              <a href="#contact" className="btn btn-primary px-5 py-3">
                Get a quote
              </a>
            </div>

            <div className="col-xl-6">
              <img src="/ads/img/header.jpg" className="img-fluid" alt="Office renovation" />
            </div>

          </div>
        </div>
      </div>


      {/* WHO IT’S FOR */}
      <div className="container-fluid" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container pt-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary" style={{ fontSize: "1.2rem", color: "#3f3f3f" }}>Who It’s For</h4>
            <h1 className="display-5" style={{ fontSize: "2.3rem", fontWeight: 600 }}>Built for Growing & Moving Businesses</h1>
          </div>
          {/* Centered content */}
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <ul className="list-unstyled">
                <li className="feature-item">
                  <span className="check-icon"></span>
                  <p className="mb-2">Companies looking for a complete office renovation or refresh</p>
                </li>
                <li className="feature-item">
                  <span className="check-icon"></span>
                  <p className="mb-2">Fast-tracked timelines and budget-sensitive projects</p>
                </li>
                <li className="feature-item">
                  <span className="check-icon"></span>
                  <p className="mb-2">Teams seeking a one-stop design & build partner</p>
                </li>
              </ul>
            </div>

            <div className="col-lg-5">
              <ul className="list-unstyled">
                <li className="feature-item">
                  <span className="check-icon"></span>
                  <p className="mb-2">Businesses with expiring leases requiring relocation and fit-out</p>
                </li>
                <li className="feature-item">
                  <span className="check-icon"></span>
                  <p className="mb-2">Clients who value cost certainty and quality finishes</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="container-fluid" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container pb-5 pt-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary" style={{ fontSize: "1.2rem", color: "#3f3f3f" }}>Why Choose Us</h4>
            <h1 className="display-5" style={{ fontSize: "2.3rem", fontWeight: 600 }}>A Smarter Way to Renovate Offices</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="p-4 bg-white h-100 feature-card d-flex justify-content-between align-items-start">

                {/* Text */}
                <div className="feature-text pe-3">
                  <h5 className="mb-2">01 | Innovation Meets Practicality</h5>
                  <p className="mb-0">
                    Aesthetic, functional designs aligned to your brand identity and workplace strategy.
                  </p>
                </div>

                {/* Icon */}
                <div className="icon-wrapper">
                  <img src="/ads/img/lightbulb.png" alt="Lightbulb" width="100%" />
                </div>

              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 bg-white h-100 feature-card d-flex justify-content-between align-items-start">

                {/* Text */}
                <div className="feature-text pe-3">
                  <h5 className="mb-2">02 | Cost Transparency</h5>
                  <p className="mb-0">
                    Clear itemised costing with urgent estimates available — no hidden fees.
                  </p>
                </div>

                {/* Icon */}
                <div className="icon-wrapper">
                  <img src="/ads/img/cost.png" alt="Lightbulb" width="100%" />
                </div>

              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 bg-white h-100 feature-card d-flex justify-content-between align-items-start">

                {/* Text */}
                <div className="feature-text pe-3">
                  <h5 className="mb-2">03 | Regulatory Expertise</h5>
                  <p className="mb-0">
                    Full compliance with SCDF, BCA, and building management authorities. We handle the paperwork, so your renovation is 100% legal, safe, and hassle-free.
                  </p>
                </div>

                {/* Icon */}
                <div className="icon-wrapper">
                  <img src="/ads/img/expertise.png" alt="Lightbulb" width="100%" />
                </div>

              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 bg-white h-100 feature-card d-flex justify-content-between align-items-start">

                {/* Text */}
                <div className="feature-text pe-3">
                  <h5 className="mb-2">04 | Peace of mind </h5>
                  <p className="mb-0">
                    Comprehensive support including furniture procurement, reinstatement, and moving services. We manage the heavy lifting from start to finish.
                  </p>
                </div>

                {/* Icon */}
                <div className="icon-wrapper">
                  <img src="/ads/img/peaceofmind.png" alt="Lightbulb" width="100%" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid " style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container pt-5 pb-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary" style={{ fontSize: "1.2rem", color: "#3f3f3f" }}>Our Process</h4>
            <h1 className="display-5" style={{ fontSize: "2.3rem", fontWeight: 600 }}>Office Renovation in 7 Clear Steps</h1>
          </div>


          <div className="process-list">
            <div className="process-item">
              <div className="step-label">Step 01 | Space</div>
              <div className="step-desc">
                <p className="mb-0">Identify spatial needs including workstations, meeting rooms, and tech infrastructure.</p>
              </div>
            </div>

            <div className="process-item">
              <div className="step-label">Step 02 | Survey</div>
              <div className="step-desc">
                <p className="mb-0">Detailed site survey and fit-out guidelines from building management.</p>
              </div>
            </div>

            <div className="process-item">
              <div className="step-label">Step 03 | Design</div>
              <div className="step-desc">
                <p className="mb-0">Collaborative workspace design reflecting your culture and workflow.</p>
              </div>
            </div>

            <div className="process-item">
              <div className="step-label">Step 04 | Price</div>
              <div className="step-desc">
                <p className="mb-0">Clear, itemised quotation with urgent estimate support if needed.</p>
              </div>
            </div>

            <div className="process-item">
              <div className="step-label">Step 05 | Submission</div>
              <div className="step-desc">
                <p className="mb-0">SCDF & BCA submissions handled by professional engineers.</p>
              </div>
            </div>

            <div className="process-item">
              <div className="step-label">Step 06 | Build</div>
              <div className="step-desc">
                <p className="mb-0">Renovation execution typically completed within 1–3 months.</p>
              </div>
            </div>

            <div className="process-item">
              <div className="step-label">Step 07 | Move</div>
              <div className="step-desc">
                <p className="mb-0">Move-in, reinstatement, as-built drawings, and maintenance walkthrough.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className="container-fluid pt-5 pb-2 text-center" style={{ backgroundColor: "#F5F5F5", borderTop: "1px solid #cdcdcd" }}>
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
          <h1 className="display-5" style={{ fontSize: "2.3rem", fontWeight: 600 }}>Ready to Transform Your Workplace?</h1>
          <p className="text-primary">Let’s discuss your office renovation goals.</p>
        </div>
        {/* <div className="text-center mx-auto mb-5" style={{maxWidth: "800px"}} id="contact">
              <form className="col-xl-12" role="form" onSubmit={handleFormSubmit}>
                <div className="row g-4">
                  <div className="col-12">
                    <input className="form-control input-lg border-0 py-2" type="text" id="NAME" name="NAME" placeholder="Name*" required />
                  </div>
                  <div className="col-6">
                    <input className="form-control input-lg border-0 py-2" type="email" id="EMAIL" name="EMAIL" placeholder="Business Email*" required />
                  </div>
                  <div className="col-6">
                    <input className="form-control input-lg border-0 py-2" type="tel" id="PHONE_NO" name="PHONE_NO" placeholder="Phone Number*" required />
                  </div>
                  <div className="col-12">
                    <input className="form-control input-lg border-0 py-2" type="text" id="COMPANY" name="COMPANY" placeholder="Company Name" />
                  </div>
                  <div className="col-12">
                    <input className="form-control input-lg border-0 py-2" type="text" id="JOB" name="JOB" placeholder="Job Title*" required />
                  </div>


                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 py-2 px-5">Contact Us for a Free Consultation</button>
                  </div>
                </div>
              </form>
          </div> */}
        <div className="text-center mx-auto mb-5" style={{maxWidth: "800px"}} id="contact">
          <button onClick={handleFormSubmit} className="btn btn-primary w-100 py-2 px-5">Contact Us for a Free Consultation</button>
        </div>
      </div>
    </>
  );
}
