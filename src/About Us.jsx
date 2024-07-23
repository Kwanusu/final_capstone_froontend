
  import React from 'react';

  const About_Us = () => {
    return (
      <div className="container my-5">
        <h1 className="mb-4" style={{ fontFamily: 'Arial' }}>About Us</h1>
        <div className="row">
          <div className="col-lg-6">
            <img src='' width="200" height="200" className="img-fluid rounded mb-4" alt="Online Shop" />
          </div>
          <div className="col-lg-6">
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px' }}>
              Welcome to our e-commerce platform! We are dedicated to providing you with the best online shopping experience.
              Our mission is to bring you a wide variety of high-quality products at competitive prices, all from the comfort
              of your home.
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px' }}>
              Our team works tirelessly to curate an extensive selection of items to meet your needs and preferences. From
              electronics to fashion, home goods to beauty products, we strive to offer something for everyone.
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px' }}>
              We value our customers and are committed to ensuring your satisfaction. If you have any questions or feedback,
              please do not hesitate to reach out to us. Thank you for choosing us for your shopping needs!
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default About_Us;
  