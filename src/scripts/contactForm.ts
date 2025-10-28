
const form = document.querySelector<HTMLFormElement>('#contactForm');
if (!form) throw new Error("Form not found");

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const data = Object.fromEntries(new FormData(target).entries());

  const res = await fetch("/api/send-to-slack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Message sent!");
    target.reset();
  } else {
    alert("Error sending message.");
    console.error(await res.text());
  }
});
