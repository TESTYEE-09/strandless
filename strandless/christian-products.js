(() => {
  const productUpdates = [
    {
      name: "Made New Heavy Tee",
      subtitle: "Bone / 2 Corinthians 5:17",
      badge: "Made New",
      alt: "Bone Christian streetwear tee with Ethan Dart portrait and 2 Corinthians 5:17 artwork"
    },
    {
      name: "Stand Firm Hoodie",
      subtitle: "Faded black / 1 Corinthians 16:13",
      badge: "Stand Firm",
      alt: "Faded black Christian hoodie with Ethan Dart portrait and 1 Corinthians 16:13 artwork"
    },
    {
      name: "The Way Portrait Tee",
      subtitle: "Earth / John 14:6",
      badge: "The Way",
      alt: "Earth brown Christian tee with Ethan Dart portrait and John 14:6 artwork"
    },
    {
      name: "Grace Over Fear Cap",
      subtitle: "Olive / 2 Timothy 1:7",
      badge: "Grace > Fear",
      alt: "Olive Christian cap with Ethan Dart portrait and 2 Timothy 1:7 artwork"
    }
  ];

  const cards = [...document.querySelectorAll(".product-card")];
  cards.forEach((card, index) => {
    const update = productUpdates[index];
    if (!update) return;

    card.dataset.name = update.name;
    const title = card.querySelector("h3");
    const subtitle = card.querySelector(".product-info p");
    const image = card.querySelector("img");
    const imageButton = card.querySelector(".product-image");
    const badge = card.querySelector(".badge");

    if (title) title.textContent = update.name;
    if (subtitle) subtitle.textContent = update.subtitle;
    if (image) image.alt = update.alt;
    if (imageButton) imageButton.setAttribute("aria-label", `View ${update.name}`);

    if (badge) {
      badge.textContent = update.badge;
    } else if (imageButton) {
      const newBadge = document.createElement("span");
      newBadge.className = "badge";
      newBadge.textContent = update.badge;
      imageButton.prepend(newBadge);
    }
  });

  const shopTitle = document.querySelector("#shop-title");
  if (shopTitle) shopTitle.textContent = "Wear what you believe.";

  const intro = document.querySelector(".hero-intro");
  if (intro) {
    intro.textContent = "Christian streetwear built around truth, grace and courage. Every piece carries Ethan Dart's portrait and a verse worth remembering.";
  }

  const faithCopy = document.querySelector(".faith-copy > p:not(.section-index)");
  if (faithCopy) {
    faithCopy.textContent = "Every piece in Release 001 is openly Christian. Ethan Dart's portrait becomes the collection mark, paired with scripture about being made new, standing firm, following The Way and choosing grace over fear.";
  }

  const modalDescription = document.querySelector(".modal-copy > p:not(.eyebrow):not(.modal-price)");
  if (modalDescription) {
    modalDescription.textContent = "A relaxed unisex Christian streetwear piece featuring Ethan Dart's portrait, a cross-led graphic system and scripture from Release 001.";
  }

  const detailParagraphs = document.querySelectorAll(".modal-copy details p");
  if (detailParagraphs[0]) {
    detailParagraphs[0].textContent = "Portrait artwork of Ethan Dart, scripture reference, premium construction, woven neck label and understated Strandless finishing.";
  }
})();