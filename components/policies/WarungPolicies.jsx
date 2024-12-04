import React, { useContext } from "react";
import { useRouter } from "next/router";
// contexts
import MerchantContext from "@/contexts/MerchantContext";
import EWarungFooter from "../footer/EwarungFooter";

const Policies = () => {
  const merchantInfoContext = useContext(MerchantContext);
  const router = useRouter();
  return (
    <>
      {router.query.policyType === "privacy" ? (
        <div className="p-5">
          <h1>Privacy Policy</h1>
          <div>
            <div>
              <p>
                {merchantInfoContext.name} (the “Company”) collects, stores, and
                manages your Personal Information in accordance with the
                Personal Data Protection Act 2010 (“PDPA”).
              </p>
              <p>What Personal Information does the Company Collect?</p>
              <ul>
                <li>Name, race, date of birth, age</li>
                <li>E-mail address, telephone number</li>
                <li>Purchase history</li>
              </ul>
              <p>How does the Company collect your Personal Information?</p>
              <p>
                Registration as new member in {merchantInfoContext.name} website
              </p>
              <ul>
                <li>Sign-in via Google or Facebook account</li>
                <li>Live chat or phone call</li>
                <li>Online purchase</li>
                <li>Response on our online marketing materials</li>
                <li>
                  Third party where you have given consent for the disclosure of
                  information relating to yourself
                </li>
              </ul>
              <p>Why does the Company collect your Personal Information?</p>
              <p>
                To register a new user account in our Customer Relationship
                Management system (CRM)
              </p>
              <ul>
                <li>
                  To send you personalized educational or marketing materials
                </li>
                <li>
                  To facilitate investigation (if required by legal agency)
                </li>
                <li>For administrative purposes</li>
                <li>
                  For data analysis to enable the Company to provide more
                  relevant services and products to you
                </li>
              </ul>
              <p>
                Your personal information will not be disclosed to any third
                parties or legal agencies, unless for the following reasons:
              </p>
              <ul>
                <li>User has agreed to share with third party</li>
                <li>
                  User has made known to public of their personal information
                  voluntarily and willingly in order to enjoy products or
                  services
                </li>
                <li>User has violated the law</li>
                <li>
                  User has violated {merchantInfoContext.name} Terms and
                  Conditions
                </li>
              </ul>
              <p>
                Users are entitled to access their Personal Information by
                logging into their {merchantInfoContext.name} eStore account.
                Amendments can be directly performed by the users. The Company
                reserves the right to verify or amend the Personal Information
                if deemed necessary.
              </p>
              <p>
                Should you have any questions, concerns or feedback regarding
                this Privacy Policy, kindly get in touch with us via the
                following channels:
              </p>
              <p>
                {merchantInfoContext.name} FB/ Website Live Chat / Ticketing
                (Mon - Fri between 9am - 5pm)
              </p>
              <p>Email: {merchantInfoContext.email}&nbsp;</p>
            </div>
          </div>
        </div>
      ) : router.query.policyType === "shipping" ? (
        <div className="p-5">
          <h1>Shipping Policy</h1>
          <div>
            <div>
              <p>
                {merchantInfoContext.name} can only send orders to street
                addresses in Malaysia. We do not deliver to P.O. Box
                addresses.&nbsp;
              </p>
              <p>
                We are unable to ship to international addresses at this moment.
              </p>
              <p>
                At the time of delivery, you will be required to validate the
                receipt of the products by providing your signature to the
                delivery courier.&nbsp;<br></br>By signing, you agree that you
                have inspected the packing of the parcel and have ensured that
                the seal is not damaged.<br></br>Should the seal be broken,
                please check the contents of the parcel and you may refuse to
                sign for the parcel.
              </p>
              <p>
                If you are not at home to receive your purchased order, please
                log in to your account or the courier website to track the
                status of your shipment.&nbsp;<br></br>Should the order be
                unable to be delivered to you successfully after 2 attempts (or
                any stipulated number of attempts by the appointed logistics
                provider) or you do not pick up your order at a nearby location
                as stated by the courier, the order may be forfeited and we will
                not refund you any amount that you have spent on your order.
              </p>
              <p>
                We deliver all orders using our standard packaging materials. We
                do not provide any special packaging at this moment.
              </p>
              <p>
                We are only able to deliver to one address per order. If you
                wish to deliver to multiple addresses, please place multiple
                orders separately for each unique address.
              </p>
              <p>
                <u>
                  <strong>SHIPPING CHARGES</strong>
                </u>
              </p>
              <p>
                {merchantInfoContext.name} delivery will only be limited to
                local delivery only by PosLaju, DHL &amp; Pigeon Malaysia.
              </p>
              <p>
                {merchantInfoContext.name} charges a standard shipping &amp;
                handling fee as following:
              </p>
              <ul>
                <li>
                  West Malaysia RM7.00 for the first 25KG, next 1KG or part
                  thereof RM3.00 on all purchases.
                </li>
                <li>
                  East Malaysia RM17.00 for the first 5KG, next 1KG or part
                  thereof RM10.00 on all purchases.
                </li>
              </ul>
              <p>These conditions are subject to change by the management.</p>
              <p>
                There will be STRICTLY NO REFUNDS for any shipping &amp;
                handling charges.
              </p>
              <p>
                We strive to deliver your purchased products within the shortest
                time possible. All orders are processed as soon as the
                transaction is confirmed. All orders are dispatched and
                delivered by our designated courier on Monday to Friday,
                excluding weekends and public holidays.
              </p>
              <p>
                <u>
                  <strong>STANDARD DELIVERY LEAD TIME</strong>
                </u>
              </p>
              <p>
                Confirmed orders will be shipped out from our warehouse within 1
                - 3 business day(s) if they are placed before 12:00pm, Monday to
                Friday, excluding public holidays.
              </p>
              <p>
                Aside from public holidays, orders placed on Friday after
                12:00pm and over the weekend will be processed on the following
                Monday and shipped out from our warehouse within 1 - 3 business
                day(s).
              </p>
              <p>Delivery ETA (Expected Time of Arrival) are as follows:</p>
              <ul>
                <li>
                  Peninsular Malaysia: 5 – 7 working days for your order to
                  arrive.
                </li>
                <li>
                  Sabah / Sarawak: 7 – 14 working days for your order to arrive.
                </li>
              </ul>
              <p>
                Delivery to rural or remote areas may require an additional of 2
                – 3 working days.
              </p>
              <p>
                Delivery ETA may be changed due to unforeseen circumstances and
                is not under {merchantInfoContext.name} responsibility.
              </p>
              <p>
                For pre-order item will be shipped out from our warehouse on the
                ETA date stated. (ETA is subject to change by the stock
                availability)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 mb-10">
          <h1>Refund Policy</h1>
          <div>
            <p>REFUND POLICY</p>
            <p>
              1. Buyer will only have the right to request refund for a
              cancelled Order only if a Vendor has not yet accepted Buyer’s
              Order. Should Buyer still decide to cancel Order after it has been
              accepted by the Vendor, you understand that no refunds (whether in
              whole or in part) will be issued to Buyer and forfeit the delivery
              of the said cancelled Order.
            </p>
            <p>
              2. Buyer is NOT entitled for any refunds for concluded orders and
              fulfilled orders.
            </p>
            <p>
              3. For credict card payment, If your refund is approved, we will
              initiate a refund to your credit card. You will receive the credit
              within a certain amount of days, depending on your card issuer's
              policies.&nbsp;
            </p>
            <p>
              4. For online transfer payment, If your refund is approved, we
              will initiate a refund to your not later than 7 working days. (or
              original method of payment)
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1">
        <EWarungFooter></EWarungFooter>
      </div>
    </>
  );
};

export default Policies;
