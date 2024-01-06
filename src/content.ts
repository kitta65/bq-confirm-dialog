import { assertHTMLElement, html2dom, markAsProcessed } from "./utils.ts";

const popover = html2dom(
  `<div id='bq-confirm-dialog' popover>this is popover</div>`
);
document.body.append(popover);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === "BQUI-QUERY-EDITOR") {
        const marker = "bq-confirm-dialog";
        const buttons = document.querySelectorAll(
          `cfc-progress-button[instrumentationid="bq-run-query-button"] button:not([${marker}])`
        );
        const states = document.querySelectorAll(
          `query-validation-status:not([${marker}])`
        );

        // mark as processed
        if (buttons.length !== 1) {
          console.log("something went wrong with buttons");
          buttons.forEach((button) => console.log(button));
          return;
        }
        if (states.length !== 1) {
          console.log("something went wrong with states");
          states.forEach((state) => console.log(state));
          return;
        }
        const button = buttons[0];
        const state = states[0];
        markAsProcessed(button);
        markAsProcessed(state);

        // create dummy button
        // TODO ▶ is a little ugly, use svg file instead
        const dummy = html2dom(
          `<button popovertarget='bq-confirm-dialog' popovertargetaction='show'>▶ RUN</button>`
        );
        dummy.setAttribute("class", button.getAttribute("class") || "");
        markAsProcessed(dummy);
        button.parentNode!.insertBefore(dummy, button);
        assertHTMLElement(button);
        button.style.display = "none";

        // add event listener
        dummy.addEventListener("click", () => {
          dummy.setAttribute("class", button.getAttribute("class") || "");
          // button.click();
        });
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const text = mutation.target.nodeValue || "";
            console.log(text);
            dummy.setAttribute("class", button.getAttribute("class") || "");
            dummy.setAttribute("bq-confirm-dialog-cost", "500");
          });
        });
        observer.observe(state, { subtree: true, characterData: true });
      }
    });
  });
});

observer.observe(document.body, {
  subtree: true,
  childList: true,
});
