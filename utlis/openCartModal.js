export const openCartModal = () => {
  // Dynamically import bootstrap
  import("bootstrap")
    .then((bootstrap) => {
      // Hide all currently open modals
      const modalElements = document.querySelectorAll(".modal.show");
      modalElements.forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      });

      // Close any open offcanvas components
      const offcanvasElements = document.querySelectorAll(".offcanvas.show");
      offcanvasElements.forEach((offcanvas) => {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      });

      // Show the shopping cart modal
      const shoppingCartModal = document.getElementById("shoppingCart");
      if (shoppingCartModal) {
        const myModal = new bootstrap.Modal(shoppingCartModal, {
          keyboard: false,
        });
        myModal.show();

        shoppingCartModal.addEventListener("hidden.bs.modal", () => {
          myModal.hide();
        });
      }
    })
    .catch((error) => {
      console.error("Error loading Bootstrap:", error);
    });
};
