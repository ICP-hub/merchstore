import React from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import Policy from "../components/common/Policy.jsx";
const privacyList = [
  {
    name: "Collection of Your Information",
    description: [
      "When you use our Platform, we collect and store your information which is provided by you from time to time. In general, you can browse the Platform without telling us who you are or revealing any personal information about yourself. Once you give us your personal information, you are not anonymous to us. Where possible, we indicate which fields are required and which fields are optional. You always have the option to not provide information by choosing not to use a particular service, product or feature on the Platform.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
];

const PrivacyPolicyPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"PRIVACY POLICY"} />
      <div className="container mx-auto px-6 mt-4">
        <h1 className="  font-bold mb-4">Last updated: March 15, 2024</h1>
        <p className="mb-4">
          Thank you for visiting Merch store. We are committed to protecting
          your privacy and ensuring the security of your personal information.
          This Privacy Policy outlines the types of information we collect from
          you or that you may provide when you visit our website and how we use,
          maintain, protect, and disclose it. By using our website, you consent
          to the data practices described in this policy.
        </p>
        <h2 className="text-xl font-bold mb-2">
          What Information We Collect and How We Use It:
        </h2>
        <p className="mb-4">
          At Merch store, we understand the importance of safeguarding your
          privacy. We collect and store the following personal information when
          you create an account with us: your name, date of birth, address,
          phone number, email address, username, and password. This information
          is essential for providing you with the services you requested, such
          as processing orders and communicating with you about your purchases.
          We may also use your email address to send you updates about new
          products, promotions, and special offers unless you opt-out.
        </p>
        <h2 className="text-xl font-bold mb-2">Security:</h2>
        <p className="mb-4">
          Protecting your personal information is our top priority. We have
          implemented stringent administrative, physical, and technical measures
          to prevent unauthorized access, disclosure, alteration, or destruction
          of your data. Our website is regularly monitored for security
          vulnerabilities to ensure your information remains safe and secure.
        </p>
        <h2 className="text-xl font-bold mb-2">
          Updating, Deleting and Editing Your Account Information:
        </h2>
        <p className="mb-4">
          After creating an account with Merch store, you can access, review,
          correct, and delete the information you provided by logging into your
          account. If you require assistance or have any questions, please
          contact us at merchstore@gmail.com.
        </p>
        <h2 className="text-xl font-bold mb-2">Opting Out:</h2>
        <p className="mb-4">
          If you prefer not to receive marketing emails from us, you can opt-out
          by contacting us at merchstore@gmail.com. We respect your preferences
          and will promptly update our records accordingly.
        </p>
        <h2 className="text-xl font-bold mb-2">Contacting Us:</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy or the
          practices of Merch store, please contact us at merchstore@gmail.com or
          by phone at [Your Phone Number]. We value your feedback and are
          committed to addressing any issues promptly and effectively.
        </p>
        <p className="mt-8 ">
          We appreciate your trust in Merch store, and we are dedicated to
          protecting your privacy and ensuring a secure online shopping
          experience. Thank you for choosing us for your clothing merchandise
          needs.
        </p>

        <p className="font-bold mt-4">Merch store Team</p>
      </div>
      <Footer></Footer>
    </AnimationView>
  );
};

export default PrivacyPolicyPage;
