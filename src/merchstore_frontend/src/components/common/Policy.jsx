import React from "react";

const Policy = ({ data }) => {
  return (
    <div className=" container mx-auto mt-4  px-6">
      <p className="  py-2 px-4 rounded-md cursor-pointer mr-2 my-2 gap-2">
        We value the trust you place in us and recognize the importance of
        secure transactions and information privacy. This Privacy Policy
        describes how stuffus Internet Private Limited and its affiliates
        (collectively “stuffus, we, our, us”) collect, use, share or otherwise
        process your personal information through stuffus website
        www.stuffus.com, its mobile application, and m-site (hereinafter
        referred to as the “Platform”).
      </p>
      <p className="  py-2 px-4 rounded-md cursor-pointer mr-2 my-6 gap-2">
        While you can browse sections of the Platform without the need of
        sharing any information with us, however, please note we do not offer
        any product or service under this Platform outside India.. By visiting
        this Platform, providing your information or availing out
        product/service, you expressly agree to be bound by the terms and
        conditions of this Privacy Policy, the{" "}
        <span className="text-blue-600"> Terms of Use</span> and the applicable
        service/product terms and conditions, and agree to be governed by the
        laws of India including but not limited to the laws applicable to data
        protection and privacy. If you do not agree please do not use or access
        our Platform.
      </p>
      <div className="py-2">
        {data.map((data, index) => (
          <div key={index}>
            <p className="text-2xl font-bold py-4">{data.name}</p>
            <div className="   py-2 px-4 rounded-md cursor-pointer mr-2 mb-2">
              {data.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;

/* <div className="py-2">
        <p className="text-2xl font-bold">
          Use of Demographic / Profile Data / Your Information
        </p>
        <p className="py-2">
          We use your personal information to provide the product and services
          you request. To the extent we use your personal information to market
          to you, we will provide you the ability to opt-out of such uses. We
          use your personal information to assist sellers and business partners
          in handling and fulfilling orders; enhancing customer experience;
          resolve disputes; troubleshoot problems; help promote a safe service;
          collect money; measure consumer interest in our products and services;
          inform you about online and offline offers, products, services, and
          updates; customize and enhance your experience; detect and protect us
          against error, fraud and other criminal activity; enforce our terms
          and conditions; and as otherwise described to you at the time of
          collection of information.
        </p>
        <p className="py-6">
          In our efforts to continually improve our product and service
          offerings, we and our affiliates collect and analyze demographic and
          profile data about our users' activity on our Platform. We identify
          and use your IP address to help diagnose problems with our server, and
          to administer our Platform. Your IP address is also used to help
          identify you and to gather broad demographic information.
        </p>
        <p className="py-6">
          We will occasionally ask you to participate in optional surveys
          conducted either by us or through a third-party market research
          agency. These surveys may ask you for personal information, contact
          information, date of birth, demographic information (like zip code,
          age, or income level), attributes such as your interests, household or
          lifestyle information, your purchasing behavior or history,
          preferences, and other such information that you may choose to
          provide. The surveys may involve collection of voice data or video
          recordings, the participation of which would purely be voluntary in
          nature. We use this data to tailor your experience at our Platform,
          providing you with content that we think you might be interested in
          and to display content according to your preferences.
        </p>
      </div>
      <div className="py-2">
        <p className="text-2xl font-bold">Cookies</p>
        <p className="py-2">
          We use data collection devices such as "cookies" on certain pages of
          the Platform to help analyze our web page flow, measure promotional
          effectiveness, and promote trust and safety. "Cookies" are small files
          placed on your hard drive that assist us in providing our services.
          Cookies do not contain any of your personal information. We offer
          certain features that are only available through the use of a
          "cookie". We also use cookies to allow you to enter your password less
          frequently during a session. Cookies can also help us provide
          information that is targeted to your interests. Most cookies are
          "session cookies," meaning that they are automatically deleted from
          your hard drive at the end of a session. You are always free to
          decline/delete our cookies if your browser permits, although in that
          case you may not be able to use certain features on the Platform and
          you may be required to re-enter your password more frequently during a
          session. Additionally, you may encounter "cookies" or other similar
          devices on certain pages of the Platform that are placed by third
          parties. We do not control the use of cookies by third parties. We use
          cookies from third-party partners such as Google Analytics for
          marketing and analytical purposes. Google Analytics help us understand
          how our customers use the site. You can read more about how Google
          uses your personal information here:
          <span className="text-blue-600">
            {" "}
            https://www.google.com/intl/en/policies/privacy/
          </span>
          . You can opt-out of Google Analytics here:{" "}
          <span className="text-blue-600">
            https://tools.google.com/dlpage/gaoptout
          </span>
          . You can also control the use of cookies at the individual browser
          level, but if you choose to disable cookies, it may limit your use of
          certain features or functions on the services.
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold">Sharing of personal information</p>
        <p className="py-2">
          We may share personal information internally within stuffus group
          companies, affiliates, related companies and with other third parties,
          including Credit Bureaus, for purposes of providing products and
          services offered by them, such as, personal loans, insurance, the
          deferred payment options, stuffus PayLater offered by stuffus Advanz
          Private Limited through its lending partners. These entities and
          affiliates may share such information with their affiliates, business
          partners and other third parties for the purpose of conducting the
          required checks , namely for the purpose of credit underwriting,
          providing you their products and services and may market to you as a
          result of such sharing unless you explicitly opt-out.
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold">Links to Other Sites</p>
        <p className="py-2">
          Our Platform may provide links to other websites or applications that
          may collect personal information about you. We are not responsible for
          the privacy practices or the content of those linked websites.
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold">Security Precautions</p>
        <p className="py-2">
          We maintain reasonable physical, electronic and procedural safeguards
          to protect your information. Whenever you access your account
          information, we offer the use of a secure server. Once your
          information is in our possession, we adhere to our security guidelines
          to protect it against unauthorized access. However, by using the
          Platform, the users accept the inherent security implications of data
          transmission over the internet and the World Wide Web which cannot
          always be guaranteed as completely secure, and therefore, there would
          always remain certain inherent risks regarding use of the Platform.
          Users are responsible for ensuring the protection of login and
          password records for their account.
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold">Choice/Opt-Out</p>
        <p className="py-2">
          We provide all users with the opportunity to opt-out of receiving
          non-essential (promotional, marketing-related) communications after
          setting up an account with us. If you do not wish to receive
          promotional communications from us, then please login into the
          Notification Preference page of [
          <span className="text-blue-600">
            https://www.stuffus.com/communication-preferences/email
          </span>
          ] to unsubscribe/opt-out.
        </p>
      </div> */
