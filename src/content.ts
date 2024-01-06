const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === "BQUI-QUERY-EDITOR") {
        const buttons = document.querySelectorAll(
          'cfc-progress-button[instrumentationid="bq-run-query-button"]'
        );
        buttons.forEach((button) => {
          const attribute = "has-bq-confirm-dialog-lister";
          if (button.getAttribute(attribute) === "true") return;
          button.setAttribute(attribute, "true");
          button.addEventListener("click", () => {
            // NOTE not fiered when console is empty
            console.log("clicked");
          });
        });
      }
    });
  });
});

observer.observe(document.body, {
  subtree: true,
  childList: true,
});
