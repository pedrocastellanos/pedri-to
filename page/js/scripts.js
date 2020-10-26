/*Menu Btn */
const menuBtn = document.getElementById("menu-btn");
const menu = document.querySelector(".menu");
const menuBars = document.querySelector(".menu-btn i");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

/*Create the URL DATA */
const section = document.getElementById("section");
const searchBtn = document.getElementById("search-btn");
const inputUrl = document.getElementById("input-url");

searchBtn.addEventListener("click", () => {
    const validateUrl = (url) => {
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
        if (urlRegex.test(url)) return true;
        return false;
    };

    if (validateUrl(inputUrl.value)) {
        const data = document.createElement("div");
        data.classList.add("data");
        // /*--*/
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = inputUrl.value;
        const i = document.createElement("i");
        i.classList.add("fas");
        i.classList.add("fa-copy");
        i.setAttribute("id", "copy-btn");
        i.setAttribute("data-clipboard-target", "#input-url");
        p.appendChild(i);
        div.appendChild(p);
        data.appendChild(div);

        const tooltip = document.createElement("span");
        tooltip.classList.add("tooltip");
        tooltip.textContent = "Copied";
        p.appendChild(tooltip);

        section.appendChild(data);

        const copyBtn = document.getElementById("copy-btn");
        copyBtn.addEventListener("click", () => {
            let clipboard = new ClipboardJS(".fa-copy");

            clipboard.on("success", function (e) {
                console.info("Action:", e.action);
                console.info("Text:", e.text);
                console.info("Trigger:", e.trigger);

                e.clearSelection();
            });

            clipboard.on("error", function (e) {
                console.error("Action:", e.action);
                console.error("Trigger:", e.trigger);
            });
            const tooltip = document.querySelector(".tooltip");
            tooltip.classList.add("show");
            setTimeout(() => {
                tooltip.classList.remove("show");
            }, 2000);
        });
    } else {
        Swal.fire({
            title: "Error!",
            icon: "error",
            text: "You must enter a valid URL",
            backdrop: true,
            allowEscapeKey: false,
            allowEnterKey: false,
        });
    }
});
