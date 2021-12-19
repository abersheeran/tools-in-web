import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";

const SuccessIconSvg = <svg style={{ display: "block", height: "1em" }} viewBox="0 0 1024 1024"><path d="M464.247573 677.487844C474.214622 686.649009 489.665824 686.201589 499.086059 676.479029L798.905035 367.037897C808.503379 357.131511 808.253662 341.319802 798.347275 331.721455 788.44089 322.12311 772.62918 322.372828 763.030833 332.279215L463.211857 641.720346 498.050342 640.711531 316.608838 473.940461C306.453342 464.606084 290.653675 465.271735 281.319298 475.427234 271.984922 485.582733 272.650573 501.382398 282.806071 510.716774L464.247573 677.487844Z" p-id="3346"></path><path d="M1024 512C1024 229.230208 794.769792 0 512 0 229.230208 0 0 229.230208 0 512 0 794.769792 229.230208 1024 512 1024 629.410831 1024 740.826187 984.331046 830.768465 912.686662 841.557579 904.092491 843.33693 888.379234 834.742758 877.590121 826.148587 866.801009 810.43533 865.021658 799.646219 873.615827 718.470035 938.277495 618.001779 974.048781 512 974.048781 256.817504 974.048781 49.951219 767.182496 49.951219 512 49.951219 256.817504 256.817504 49.951219 512 49.951219 767.182496 49.951219 974.048781 256.817504 974.048781 512 974.048781 599.492834 949.714859 683.336764 904.470807 755.960693 897.177109 767.668243 900.755245 783.071797 912.462793 790.365493 924.170342 797.659191 939.573897 794.081058 946.867595 782.373508 997.013826 701.880796 1024 608.898379 1024 512Z" p-id="3347"></path></svg>;
const ErrorIconSvg = <svg style={{ display: "block", height: "1em" }} viewBox="0 0 1024 1024"><path d="M512 1022.912c-279.168 0-506.304-229.44-506.304-511.488 0-101.056 29.12-198.72 84.224-282.496a21.76 21.76 0 0 1 36.288 23.808A468.864 468.864 0 0 0 49.088 511.424c0 258.112 207.68 468.16 462.912 468.16 255.296 0 462.912-209.984 462.912-468.16C974.912 253.312 767.232 43.392 512 43.392a458.88 458.88 0 0 0-236.864 65.792 21.76 21.76 0 0 1-22.4-37.12A501.504 501.504 0 0 1 512 0c279.168 0 506.304 229.44 506.304 511.424 0 282.048-227.136 511.488-506.304 511.488z" p-id="5320"></path><path d="M681.024 702.08a21.504 21.504 0 0 1-15.296-6.336L327.68 357.76a21.76 21.76 0 0 1 30.656-30.656l338.048 337.984a21.76 21.76 0 0 1-15.36 36.992z" p-id="5321"></path><path d="M341.184 703.936a21.76 21.76 0 0 1-15.296-36.992l341.632-341.632a21.76 21.76 0 0 1 30.656 30.656L356.48 697.6a21.632 21.632 0 0 1-15.296 6.336z" p-id="5322"></path></svg>;

const Notification: FunctionComponent<{ icon: JSX.Element, description: string }> = ({ icon, description }) => (
  <div style={{
    display: "flex", justifyContent: "end", alignItems: "center",
    margin: "1em 0", padding: "0.5em 1em 0.5em 0",
    boxShadow: `0 0.2rem 0.5rem rgb(0 0 0 / 10%), 0 0 0.05rem rgb(0 0 0 / 30%)`
  }}>
    <span style={{ position: "relative", padding: "0 .5em" }}>{icon}</span>
    <span style={{ padding: ".4em", paddingLeft: "0", fontSize: "0.8em", lineHeight: "1.0" }}>{description}</span>
  </div>
)

export const sendNotification = (status: "success" | "error", description: string, maxtime: number = 3000) => {
  let notification_dom = document.getElementById("-temporary-notification") || document.createElement("div");
  if (!document.getElementById("-temporary-notification")) {
    notification_dom.id = "-temporary-notification";
    notification_dom.style.position = "fixed";
    notification_dom.style.top = "5em";
    notification_dom.style.right = "1em";
    notification_dom.style.textAlign = "right";
    document.body.appendChild(notification_dom);
  }

  let dom = document.createElement("div");
  notification_dom.appendChild(dom)
  ReactDOM.render(
    <Notification icon={status === "success" ? SuccessIconSvg : ErrorIconSvg} description={description} />,
    dom,
    () => {
      setTimeout(dom => {
        ReactDOM.unmountComponentAtNode(dom);
        document.getElementById("-temporary-notification")?.removeChild(dom);
      }, maxtime, dom)
    }
  )
}
