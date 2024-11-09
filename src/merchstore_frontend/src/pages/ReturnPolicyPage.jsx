import React from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import Policy from "../components/common/Policy.jsx";
const returnList = [
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

// Add more items as needed

// You can now use the updated returnList for your return policy page.

const ReturnPolicyPage = () => {
  return (
    // <AnimationView>
    //   <ScrollToTop />
    //   <Header title={"RETURN POLICY"} />
    <>
      <div className="container mx-auto  px-6 mt-4 ">
        <p className="font-bold mb-4">Last updated: March 15, 2024</p>
        <p>Thank you for shopping at Merch store.</p>

        {/* Your Order Cancellation Rights */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Your Order Cancellation Rights
          </h2>
          <p className="mb-4">
            You are entitled to cancel Your Order within 7 days without giving
            any reason for doing so.
          </p>
          <p className="mb-4">
            The deadline for cancelling an Order is 7 days from the date on
            which You received the Goods or on which a third party you have
            appointed, who is not the carrier, takes possession of the product
            delivered.
          </p>
          <p className="mb-4">
            In order to exercise Your right of cancellation, You must inform Us
            of your decision by means of a clear statement. You can inform us of
            your decision by email on : merchstore@gmail.com
          </p>

          <p className="mb-4">
            We will reimburse You no later than 14 days from the day on which We
            receive the returned Goods. We will use the same means of payment as
            You used for the Order, and You will not incur any fees for such
            reimbursement.
          </p>
        </div>

        {/* Conditions for Returns */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Conditions for Returns</h2>
          <p className="mb-4">
            In order for the Goods to be eligible for a return, please make sure
            that:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>The Goods were purchased in the last 7 days</li>
            <li>The Goods are in the original packaging</li>
          </ul>
          <p className="mb-4">The following Goods cannot be returned:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              The supply of Goods made to Your specifications or clearly
              personalized.
            </li>
            <li>
              The supply of Goods which according to their nature are not
              suitable to be returned, deteriorate rapidly or where the date of
              expiry is over.
            </li>
            <li>
              The supply of Goods which are not suitable for return due to
              health protection or hygiene reasons and were unsealed after
              delivery.
            </li>
            <li>
              The supply of Goods which are, after delivery, according to their
              nature, inseparably mixed with other items.
            </li>
          </ul>
          <p className="mb-4">
            We reserve the right to refuse returns of any merchandise that does
            not meet the above return conditions in our sole discretion.
          </p>
          <p className="mb-4">
            Only regular priced Goods may be refunded. Unfortunately, Goods on
            sale cannot be refunded. This exclusion may not apply to You if it
            is not permitted by applicable law.
          </p>
        </div>

        {/* Returning Goods */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Returning Goods</h2>
          <p className="mb-4">
            You are responsible for the cost and risk of returning the Goods to
            Us. You should send the Goods at the following address: Merch store
            Ludhiana, Punjab
          </p>
          <p className="mb-4">
            We cannot be held responsible for Goods damaged or lost in return
            shipment. Therefore, We recommend an insured and trackable mail
            service. We are unable to issue a refund without actual receipt of
            the Goods or proof of received return delivery.
          </p>
        </div>

        {/* Gifts */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Gifts</h2>
          <p className="mb-4">
            If the Goods were marked as a gift when purchased and then shipped
            directly to you, You'll receive a gift credit for the value of your
            return. Once the returned product is received, a gift certificate
            will be mailed to You.
          </p>
          <p className="mb-4">
            If the Goods weren't marked as a gift when purchased, or the gift
            giver had the Order shipped to themselves to give it to You later,
            We will send the refund to the gift giver.
          </p>
        </div>

        {/* Contact Us */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <ul className="list-disc pl-8">
            <li>By email: merchstore@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* <Footer></Footer>
    </AnimationView> */}
    </>
  );
};

export default ReturnPolicyPage;
