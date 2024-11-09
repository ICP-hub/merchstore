import React from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import Policy from "../components/common/Policy.jsx";
const shippingList = [
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

const ShippingPolicyPage = () => {
  return (
    <>
      {/* <AnimationView>
       <ScrollToTop />
      <Header title={"SHIPPING POLICY"} /> */}
      <div className="container mx-auto px-6 mt-4">
        <p className="mb-4">
          Merch store is committed to excellence, and the full satisfaction of
          our customers. Merch store proudly offers shipping services. Be
          assured we are doing everything in our power to get your order to you
          as soon as possible. Please consider any holidays that might impact
          delivery times. Merch store also offers same day dispatch.
        </p>
        <h2 className="text-xl font-bold mb-2">SHIPPING</h2>
        <p className="mb-4">
          All orders for our products are processed and shipped out in 4-10
          business days. Orders are not shipped or delivered on weekends or
          holidays. If we are experiencing a high volume of orders, shipments
          may be delayed by a few days. Please allow additional days in transit
          for delivery. If there will be a significant delay in the shipment of
          your order, we will contact you via email.
        </p>
        <h2 className="text-xl font-bold mb-2">WRONG ADDRESS DISCLAIMER</h2>
        <p className="mb-4">
          It is the responsibility of the customers to make sure that the
          shipping address entered is correct. We do our best to speed up
          processing and shipping time, so there is always a small window to
          correct an incorrect shipping address. Please contact us immediately
          if you believe you have provided an incorrect shipping address.
        </p>
        <h2 className="text-xl font-bold mb-2">UNDELIVERABLE ORDERS</h2>
        <p className="mb-4">
          Orders that are returned to us as undeliverable because of incorrect
          shipping information are subject to a restocking fee to be determined
          by us.
        </p>
        <h2 className="text-xl font-bold mb-2">LOST/STOLEN PACKAGES</h2>
        <p className="mb-4">
          Merch store is not responsible for lost or stolen packages. If your
          tracking information states that your package was delivered to your
          address and you have not received it, please report to the local
          authorities.
        </p>
        <h2 className="text-xl font-bold mb-2">RETURN REQUEST DAYS</h2>
        <p className="mb-4">
          Merch store allows you to return its item(s) within 7 days. Kindly be
          advised that the item(s) should be returned unopened and unused.
        </p>
        <h2 className="text-xl font-bold mb-2">OUT OF STOCK ITEM PROCESS</h2>
        <p className="mb-4">
          Merch store has the following options in the event there are items
          which are out of stock Merch store end available items first and send
          remaining items when items arrive back in stock.
        </p>
        <h2 className="text-xl font-bold mb-2">IMPORT DUTY AND TAXES</h2>
        <p className="mb-4">
          When dealing with Merch store you have the following options when it
          comes to taxes as well as import duties: You will be required to
          settle the requisite fees when the items are arriving in the
          destination country.
        </p>
        <h2 className="text-xl font-bold mb-2">ACCEPTANCE</h2>
        <p className="mb-4">
          By accessing our site and placing an order you have willingly accepted
          the terms of this Shipping Policy.
        </p>
        <h2 className="text-xl font-bold mb-2">CONTACT </h2>
        <p className="mb-4">Email - merchstore@gmail.com</p>
      </div>
      {/* <Footer></Footer>
    </AnimationView> */}
    </>
  );
};

export default ShippingPolicyPage;
