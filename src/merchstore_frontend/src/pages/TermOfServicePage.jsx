import React from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import Policy from "../components/common/Policy.jsx";
const TermOfServicesList = [
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

const TermOfServicePage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Term and Service"} />
      <div className="container mx-auto mt-4 px-6 flex gap-2 items-center md:items-start justify-between flex-col">
        <h2 className="text-xl font-bold mb-2">1. Terms</h2>
        <p className="mb-4">
          By accessing this Website, accessible from
          https://fygdv-xiaaa-aaaak-afnuq-cai.icp0.io/, you agree to be bound by
          these Website Terms and Conditions of Use and agree that you are
          responsible for the agreement with any applicable local laws. If you
          disagree with any of these terms, you are prohibited from accessing
          this site. The materials contained in this Website are protected by
          copyright and trademark law.
        </p>

        <h2 className="text-xl font-bold mb-2">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the
          materials on Merch store's Website for personal, non-commercial
          transitory viewing only.This grant constitutes a license and not a
          transfer of title. Under this license, you may not:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>modify or copy the materials;</li>
          <li>
            use the materials for any commercial purpose or for any public
            display;
          </li>
          <li>
            attempt to reverse engineer any software contained on Merch store's
            Website;
          </li>
          <li>
            remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li>
            Transfer the materials to another person or "mirror" the materials
            on any other server.
          </li>
        </ul>
        <p className="mb-4">
          This will let Merch store to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be
          terminated and you should destroy any downloaded materials in your
          possession whether it is printed or electronic format.
        </p>

        <h2 className="text-xl font-bold mb-2">3. Disclaimer</h2>
        <p className="mb-4">
          All the materials on Merch store's Website are provided "as is". Merch
          store makes no warranties, may it be expressed or implied, therefore
          negates all other warranties. Furthermore, Merch store does not make
          any representations concerning the accuracy or reliability of the use
          of the materials on its Website or otherwise relating to such
          materials or any sites linked to this Website.
        </p>

        <h2 className="text-xl font-bold mb-2">4. Limitations</h2>
        <p className="mb-4">
          Merch store or its suppliers will not be held accountable for any
          damages that will arise with the use or inability to use the materials
          on Merch store's Website, even if Merch store or an authorized
          representative of this Website has been notified, orally or written,
          of the possibility of such damage. Some jurisdictions do not allow
          limitations on implied warranties or limitations of liability for
          incidental damages, these limitations may not apply to you.
        </p>

        <h2 className="text-xl font-bold mb-2">5. Revisions and Errata</h2>
        <p className="mb-4">
          The materials appearing on Merch store's Website may include
          technical, typographical, or photographic errors. Merch store will not
          promise that any of the materials on this Website are accurate,
          complete, or current. Merch store may change the materials contained
          on its Website at any time without notice. Merch store do not make any
          commitment to update the materials.
        </p>

        <h2 className="text-xl font-bold mb-2">6. Links</h2>
        <p className="mb-4">
          Merch store has not reviewed all of the sites linked to its Website
          and is not responsible for the contents of any such linked site. The
          presence of any link does not imply endorsement by Merch store of the
          site. The use of any linked website is at the user's own risk.
        </p>

        <h2 className="text-xl font-bold mb-2">
          7. Site Terms of Use Modifications
        </h2>
        <p className="mb-4">
          Merch store may revise these Terms of Use for its Website at any time
          without prior notice. By using this Website, you are agreeing to be
          bound by the current version of these Terms and Conditions of Use.
        </p>

        <h2 className="text-xl font-bold mb-2">8. Your Privacy</h2>
        <p className="mb-4">Please read our Privacy Policy.</p>

        <h2 className="text-xl font-bold mb-2">9. Governing Law</h2>
        <p className="mb-4">
          Any claim related to Merch store's Website shall be governed by the
          laws of af without regards to its conflict of law provisions.
        </p>
      </div>
      <Footer></Footer>
    </AnimationView>
  );
};

export default TermOfServicePage;
