    // import React from "react";

    // function JobDescription() {
    // return (
    //     <div style={{ display: "flex", justifyContent: "space-between", padding: "20px", marginTop: "40px" }}>
    //     {/* Left Column */}
    //     <div style={{ flex: 3, marginRight: "20px" }}>
    //         <h1>Company Story:</h1>
    //         <p>
    //         It is a long established fact that a reader will be distracted by the readable
    //         content of a page when looking at its layout. The point of using Lorem Ipsum is
    //         that it has a more-or-less normal distribution of letters, as opposed.
    //         </p>
    //         <p>
    //         Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
    //         in a piece of classical Latin literature from 45 BC, making it over 2000 years
    //         old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
    //         looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
    //         passage.
    //         </p>
    //         <img
    //         src="https://via.placeholder.com/600x300"
    //         alt="Office Space"
    //         style={{ width: "100%", marginTop: "20px", borderRadius: "10px" }}
    //         />
    //     </div>

    //     {/* Right Column */}
    //     <div style={{ flex: 1, paddingLeft: "10px" }}>
    //         {/* Google Maps */}
    //         <iframe
    //         title="Google Maps"
    //         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.1621604046634!2d-95.47068268484268!3d29.736784081988888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bf87fd4a4e7f%3A0x2285c21627d4a92!2sGerald%20D.%20Hines%20Waterwall%20Park!5e0!3m2!1sen!2sus!4v1687693471717!5m2!1sen!2sus"
    //         width="100%"
    //         height="300"
    //         style={{ border: "0", borderRadius: "10px" }}
    //         allowFullScreen=""
    //         loading="lazy"
    //         ></iframe>

    //         {/* Company Information */}
    //         <div style={{ marginTop: "20px", lineHeight: "1.8" }}>
    //         <p><strong>Founded:</strong> 1984</p>
    //         <p><strong>Founder:</strong> Liu Chuanzhi</p>
    //         <p><strong>Headquarters:</strong> Hong Kong</p>
    //         <p><strong>Number of employees:</strong> +75000</p>
    //         <p><strong>Website:</strong> <a href="https://www.lenovo.com" target="_blank" rel="noopener noreferrer">www.lenovo.com</a></p>
    //         <p>
    //             <strong>Social:</strong> 
    //             <a href="#" style={{ margin: "0 10px" }}>🌐</a>
    //             <a href="#">🔗</a>
    //             <a href="#">📸</a>
    //             <a href="#">🐦</a>
    //         </p>
    //         </div>
    //     </div>
    //     </div>
    // );
    // }

    // export default JobDescription;



    import React from "react";

    function JobDescription() {
      // Card Component for Vacancy
      const VacancyCard = ({ role, postedTime, type, salary }) => {
        return (
          <div style={{ 
            border: "1px solid #ccc", 
            borderRadius: "10px", 
            padding: "20px", 
            marginBottom: "20px", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ margin: "0 0 10px 0" }}>{role}</h3>
            <p style={{ margin: "5px 0" }}><strong>Posted:</strong> {postedTime}</p>
            <p style={{ margin: "5px 0" }}><strong>Type:</strong> {type}</p>
            <p style={{ margin: "5px 0" }}><strong>Salary:</strong> {salary}</p>
          </div>
        );
      };
    
      return (
        <div style={{ display: "flex", flexDirection: "column", padding: "20px", marginTop: "40px" }}>
          {/* Company Story Section */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Column */}
            <div style={{ flex: 3, marginRight: "20px" }}>
              <h1>Company Story:</h1>
              <p>
                Tesla was founded in 2003 with the mission to accelerate the world’s transition 
                to sustainable energy. From electric vehicles to clean energy products, Tesla 
                continues to innovate and lead the way in the industry.
              </p>
              <p>
                With a focus on performance, safety, and innovation, Tesla has redefined what 
                electric cars can be. From the Roadster to the Model S, Tesla has made electric 
                driving not only practical but desirable.
              </p>
              <img
                src="https://via.placeholder.com/600x300"
                alt="Tesla Office Space"
                style={{ width: "100%", marginTop: "20px", borderRadius: "10px" }}
              />
            </div>
    
            {/* Right Column */}
            <div style={{ flex: 1, paddingLeft: "10px" }}>
              {/* Google Maps */}
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.1621604046634!2d-95.47068268484268!3d29.736784081988888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bf87fd4a4e7f%3A0x2285c21627d4a92!2sGerald%20D.%20Hines%20Waterwall%20Park!5e0!3m2!1sen!2sus!4v1687693471717!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: "0", borderRadius: "10px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
    
              {/* Company Information */}
              <div style={{ marginTop: "20px", lineHeight: "1.8" }}>
                <p><strong>Founded:</strong> 2003</p>
                <p><strong>Founder:</strong> Elon Musk</p>
                <p><strong>Headquarters:</strong> Palo Alto, California, USA</p>
                <p><strong>Number of employees:</strong> +100,000</p>
                <p><strong>Website:</strong> <a href="https://www.tesla.com" target="_blank" rel="noopener noreferrer">www.tesla.com</a></p>
                <p>
                  <strong>Social:</strong> 
                  <a href="#" style={{ margin: "0 10px" }}>🌐</a>
                  <a href="#">🔗</a>
                  <a href="#">📸</a>
                  <a href="#">🐦</a>
                </p>
              </div>
            </div>
          </div>
    
          {/* Vacancies Section */}
          <div style={{ marginTop: "40px" }}>
            <h2>Open Vacancies:</h2>
            <VacancyCard 
              role="Software Engineer"
              postedTime="2 days ago"
              type="Full-time, Remote"
              salary="$120,000 - $150,000"
            />
            <VacancyCard 
              role="Electrical Engineer"
              postedTime="1 week ago"
              type="Full-time, On-site"
              salary="$100,000 - $130,000"
            />
            <VacancyCard 
              role="Battery Scientist"
              postedTime="3 weeks ago"
              type="Part-time, On-site"
              salary="$90,000 - $110,000"
            />
            <VacancyCard 
              role="Product Manager"
              postedTime="1 month ago"
              type="Full-time, Hybrid"
              salary="$130,000 - $160,000"
            />
          </div>
        </div>
      );
    }
    
    export default JobDescription;
    
    