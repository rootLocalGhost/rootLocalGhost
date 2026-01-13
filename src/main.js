import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createIcons,
  ArrowUpRight,
  Github,
  Facebook,
  MessageCircle,
  Phone,
  X,
} from "lucide";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

createIcons({
  icons: {
    ArrowUpRight,
    Github,
    Facebook,
    MessageCircle,
    Phone,
    X,
  },
});

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  smooth: true,
  smoothTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const mainContent = document.getElementById("main-content");
const navbar = document.getElementById("navbar");

lenis.on("scroll", (e) => {
  if (mainContent && window.innerWidth > 768) {
    gsap.to(mainContent, {
      skewY: e.velocity * 0.05,
      duration: 0.2,
      ease: "power1.out",
    });
  }

  if (e.scroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    lenis.scrollTo(targetId);
  });
});

const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");

let mouseX = 0,
  mouseY = 0,
  cursorX = 0,
  cursorY = 0,
  dotX = 0,
  dotY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const distCircleX = mouseX - cursorX;
  const distCircleY = mouseY - cursorY;
  cursorX += distCircleX * 0.15;
  cursorY += distCircleY * 0.15;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  const distDotX = mouseX - dotX;
  const distDotY = mouseY - dotY;
  dotX += distDotX * 0.8;
  dotY += distDotY * 0.8;
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top = dotY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTriggers = document.querySelectorAll(".hover-trigger");
hoverTriggers.forEach((trigger) => {
  trigger.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
  trigger.addEventListener("mouseleave", () =>
    cursor.classList.remove("hovered"),
  );
});

async function fetchGitHubProfile() {
  const username = "rootLocalGhost";
  const imgElement = document.getElementById("github-profile-img");
  const faviconElement = document.getElementById("dynamic-favicon");
  const fallback = "https://github.com/identicons/rootLocalGhost.png";
  try {
    const response = await fetch(`/api/github?path=users/${username}`);
    if (response.ok) {
      const data = await response.json();
      if (imgElement && data.avatar_url) imgElement.src = data.avatar_url;
      if (faviconElement && data.avatar_url)
        faviconElement.href = data.avatar_url;
    } else {
      console.warn("GitHub API Error. Loading fallback image.");
      if (imgElement) imgElement.src = fallback;
    }
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    if (imgElement) imgElement.src = fallback;
  }
}
fetchGitHubProfile();

async function fetchRepoLanguages(repoName, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;
  try {
    const response = await fetch(
      `/api/github?path=repos/rootLocalGhost/${repoName}/languages`,
    );
    if (response.ok) {
      const data = await response.json();
      container.innerHTML = "";
      const languages = Object.keys(data).slice(0, 4);
      if (languages.length === 0) {
        container.innerHTML = '<span class="lang-tag">Source Code</span>';
        return;
      }
      languages.forEach((lang) => {
        const tag = document.createElement("span");
        tag.className = "lang-tag";
        tag.innerText = lang;
        container.appendChild(tag);
      });
    } else {
      container.innerHTML = '<span class="lang-tag">Source Code</span>';
    }
  } catch (e) {
    container.innerHTML = '<span class="lang-tag">Offline</span>';
  }
}
fetchRepoLanguages("ViveStream-Revived", "lang-ViveStream-Revived");
fetchRepoLanguages("ArtTic-LAB", "lang-ArtTic-LAB");
fetchRepoLanguages("PixZen", "lang-PixZen");

const writingsData = [
  {
    id: 1,
    title_en: "Hunger & The Divine",
    title_bn: "ক্ষুধা ও ঈশ্বর",
    date: "27 OCT 2025",
    excerpt: "Hunger is the only true pain; everything else is metaphor.",
    content_en: `I have measured pain against the grief of losing you,
Yet, except for hunger, no suffering on earth is truly suffering.
Let me tell you a story...
A man visits God’s court daily, trembling in fear of Hell.
God recites tales of His own greatness, fills the man with hope, and sends him back.
But on the long walk home, the thought of hunger strikes. And he forgets—
He forgets that no one is waiting at home to eat.
He forgets how his child burned to ash along with hundreds of others.
He forgets how his sister died, discarded in a manhole.
He forgets his raped daughter, his traumatized friend, his murdered wife.
He forgets his parents rotting away in state negligence.
Then one day, he forgets God too.
He storms into that ornate, glowing Divine Court and screams—
"When will the religious armor of politicians finally crack?
When will the people forget the worry of rice and take to the streets for justice?
When will this earth belong only to humans?
When will the houses of worship open their doors to all castes?
When, God, will You be ours—and not the property of those fat-skinned capitalists?"
For the crime of demanding justice from God, 
He is labeled an "atheist" and hanged.
End of story.
The madman forgot everything in the delirium of food.
He died an atheist demanding justice and rice.
But not everyone becomes an atheist like him.
The rest are believers—civil, communal, brotherly,
Perfect symbols of every trait God commanded.
They work daily just to secure rice.
They have no time to speak of injustice, oppression, tyranny, or corruption.
They have no time to judge right from wrong, truth from lies.
Religion and Politics have kept us so busy,
That we cannot even lift our heads to claim the rights we are owed.
And on top of that, the pangs of hunger.
If we do not work one day, there is no rice the next.
How can we revolt?
If I die, who will feed my children?
In this fear, we endure everything in silence.
Question a politician, you are a traitor.
Question God, you are an atheist.
Where do we go?
That is why, the day you bathed in turmeric and wore the red Benarasi sari to go to another man's house,
I did not complain to anyone—not even to God.
Because I knew I did not have the power to put rice in your mouth.
Because I knew the pain of hunger is permanent, but the pain of losing you is not.
Because a beggar once told me—
"Except for hunger, no pain on earth is truly pain."`,
    content_bn: `তোমাকে না পাওয়ার কষ্টের সাথে তুলনা করেও দেখেছি,
পৃথিবীতে ক্ষুধা ব্যতীত কোনো কষ্টই মূলত কষ্ট নয়।
একটা গল্প বলি...
এক ব্যক্তি নরকের ভয়ে রোজ খোদার দরবারে হাজির হয়।
খোদা তাকে তাঁর মহত্ত্বের গল্প শুনিয়ে, আশাবাদী বানিয়ে তারপর ঘরে ফিরে যেতে বলেন।
পথে ক্ষুধার চিন্তা। চিন্তায় পথ চলতে চলতে সে ভুলে যায়
তার ঘরে খাবার খাওয়ার মতো কেউ নেই।
সে ভুলে যায়, কিভাবে সেদিন তার চোখের সামনে শত শত শিশুর সঙ্গে জ্বলে গিয়েছিল তার নিজের সন্তানও।
সে ভুলে যায়, কিভাবে হায়েনাদের হাতে ধর্ষিত ও খুন হয়েছিল তার কন্যা।
সে ভুলে যায়, কিভাবে রাস্তার জমা পানিতে পড়ে থাকা বৈদ্যুতিক তারের শকে মারা গিয়েছিল তার পাগল বন্ধুটা।
সে ভুলে যায়, কে বা কারা খুন করেছিল তার স্ত্রীকে।
সে ভুলে যায়, কিভাবে তার বৃদ্ধ বাবা-মা সরকারি হাসপাতালের অবহেলায় মরেছিল।
তারপর একদিন হঠাৎ খোদাকেও ভুলে যায়।
সেই সুসজ্জিত, সু-উজ্জ্বল দরবারে প্রবেশ করে চিৎকার করে জানতে চায়—
কবে ভাঙবে ওই রাজনীতিবিদদের ধর্মের প্রতিরক্ষা বলয়?
কবে মানুষ ভাতের চিন্তা ভুলে ন্যায়বিচারের জন্য রাস্তায় নামতে পারবে?
কবে এই পৃথিবীটা শুধু মানুষের হবে?
কবে খোলা হবে জাত-নিরপেক্ষ ভজনালয়?
কবে রে খোদা, তুই আমাদের হবি ওই মেদের চামড়াবিশিষ্ট পুঁজিবাদীদের নয়?
এসবের মাঝেই তাকে “নাস্তিক” তকমা দিয়ে,
খোদার কাছে সুবিচার চাওয়ার দোষে ফাঁসিতে চড়ানো হয়।
গল্প শেষ।
পাগলা শুধু খাবারের চিন্তায় সব ভুলে যায়।
শেষমেষ ন্যায়বিচার আর অন্নের দাবিতে নাস্তিক হয়ে মারা যায়।
তবে সবাই এর মতো নাস্তিক হয় না।
তারা সবাই আস্তিক তারা সবাই সুশীল, সাম্প্রদায়িক, ভ্রাতৃত্বপূর্ণ,
এবং খোদার বলে দেওয়া সকল বৈশিষ্ট্যের প্রতীক হয়।
তারা রোজ কর্ম করে অন্নের চাহিদায়।
তাদের অন্যায়, অবিচার, অত্যাচার, ব্যভিচার এসব বিষয়ে বলার সুযোগ হয় না।
তাদের সঠিক-ভুল, সত্য-মিথ্যা বিচারের সময় থাকে না।
এই ধর্ম আর রাজনীতি আমাদের এমনই ব্যস্ত রেখেছে,
যে মাথা উঁচু করে আমরা নিজেদের প্রাপ্য অধিকারও দাবি করতে পারি না।
তার উপর আবার ক্ষুধার তাড়না।
একদিন কর্ম না করলে পরদিন ভাত জুটবে না।
কিভাবে যাবো বিদ্রোহে?
আমি মরলে আমার সন্তানদের মুখে ভাত তুলে দেবে কে?
এই ভয়েই আমরা চুপচাপ সব সয়ে যাই।
রাজনীতিবিদদের প্রশ্ন করলে দেশদ্রোহী,
আর খোদাকে প্রশ্ন করলে নাস্তিক।
যাব কোথায়?
এজন্যই যেদিন তুমি হলুদ স্নানে গা মেখে
লাল বেনারসি শাড়ি পরে অন্যের ঘরে যাওয়ার প্রস্তুতি নিচ্ছিলে,
সেদিন আমি কারো কাছে অভিযোগ জানাইনি এমনকি খোদার কাছেও না।
কারণ আমি জানতাম, তোমার মুখে অন্ন জোটানোর ক্ষমতা আমার নেই।
কারণ আমি জানতাম, ক্ষুধার কষ্ট দীর্ঘস্থায়ী, কিন্তু তোমাকে হারানোর কষ্ট দীর্ঘস্থায়ী নয়।
কারণ এক ভিক্ষুক বলেছিল আমায় 
“ক্ষুধা ছাড়া পৃথিবীর কোনো কষ্টই মূলত কষ্ট নয়।”`,
  },
  {
    id: 2,
    title_en: "The Buried Self",
    title_bn: "আত্মজীবনী",
    date: "UNDEFINED",
    excerpt:
      "A human writes their most honest autobiography in a suicide note.",
    content_en: `The one you are looking for, I have just buried him there.
Go, speak to the grave; it has many stories to tell.
Do not ask me anything. Go to the grave.
The man inside me will speak no more.
But I can tell you the words he left unspoken:
"I ended long before I reached this grave.
Before that, I ended at the close of the story.
My acting ended where the darkness began.
My sorrows ended in a single, long sigh.
My desires ended when the love ran out.
Intimacy ended the moment the embrace broke.
My youth ended the romance.
And I... I ended in loving you.
But the need for you? That has not ended.
One task remains unfinished before the fade-out,
The very reason you are searching for me.
My autobiography was never written.
You know, a human writes their most honest autobiography in a suicide note.
I once read the note of a loved one,
But I could not write my own.
My cause of death is unknown.
Actually, for people like us, the cause of death is always unknown.
Why do we die again and again?
And why do we return?
Yes, I will return.
I will escape from this grave.
Do not tell him.
Let everything about me end, yet I will go back to you.
The need for you has not ended."
Alas, he does not know that rebirth is a lie.
Otherwise, he would have truly returned to you.
Sing a song for him...
Maybe then, the need for you will finally end too.
   "Forget me...
         what was my name... what was I..."`,
    content_bn: `আপনি যাকে খুজছেন, তাকে এইমাত্র দাফন করে আসলাম
ওখানে; যান কথা বলে আসুন
আমাকে কিছু জিজ্ঞেস করবেন না
কবরের কাছে যান, অনেক গল্প শোনাবে আপনাকে
আমার ভেতরের মানুষটা আর কথা বলবে না
তবে আমি বলতে পারি ওর না বলে যাওয়া কথাগুলো
"আমি ফুরিয়ে গিয়েছি এই কবরের কাছে এসে
এর আগে, ফুরিয়ে গিয়েছিলাম গল্পের শেষে
আমার অভিনয় শেষ হয়েছিলো আধারের কাছে এসে
আমার দুঃখেরা শেষ হয়েছিল এক দীর্ঘশ্বাসে
ইচ্ছেরা শেষ হয়েছিল প্রেমের শেষে এসে
যৌনতা ফুরিয়েছিল আলিঙ্গনের শেষে
প্রেম ফুরিয়েছিল বয়সের শেষে
আর আমি, এই যে ফুরিয়েছি, তোমায় ভালোবেসে
তবে তোমার চাহিদাটা এখনো ফুরায়নি
ফুরিয়ে যাওয়ার আগে একটা কাজ অসম্পূর্ণ রয়ে গেছে
যার কারণে তুমি আমায় খুজছো।
আমার একটা আত্মজীবনী লেখা হয়নি
তুমি জানো, মানুষ তার শ্রেষ্ঠ আত্মজীবনী লেখে সুইসাইড নোট এ
আমি পড়েছিলাম, এক খুব কাছের মানুষের আত্মজীবনী
নিজেরটা লিখে আসতে পারলাম না
আমার মৃত্যুর কারণটা অজানা
আসলে আমাদের মৃত্যুর কারণটা অজানা
কেন যে আমরা বারবার মরে যাই
আবার ফিরে আসি
হ্যাঁ, আমি আসবো ফিরে আবার
আমি পালিয়ে যাব এই কবর থেকে
ওকে বলো না
সব ফুরিয়ে যাক আমার, তবু ফিরে যাব তোমার কাছে
তোমাকে পাওয়ার চাহিদাটা ফুরায়নি"
আফসোস, ও জানে না পুনর্জন্ম সত্য নয়
নাহলে ঠিকই ফিরে যেত তোমার কাছে
তুমি ওর জন্য একটা গান গাইতে পারো
তাহলে তোমায় পাওয়ার চাহিদাটাও হয়তো ফুরিয়ে যাবে
   "ভুলে যেও আমাকে
         কি আমার নাম কি ছিলাম"`,
  },
  {
    id: 3,
    title_en: "Suropriya",
    title_bn: "সুরপ্রিয়া",
    date: "18 NOV 2023",
    excerpt:
      "Suropriya, give the poet death in your voice, or return his heart.",
    content_en: `Suropriya,
A new morning.
A new breeze.
Before the trees could even shed their leaves,
Your dream broke.
Your eyes wake, shaking off sleep.
You bind those messy strands of hair with such care.
Morning dresses up;
You bathe in the scent of Shiuli flowers and rose perfume.
You place a blood-red hibiscus in your black bun.
You tie a rose as a companion to your earrings.
Perhaps, sometimes, you ask the wood-rose for your identity.
It replies: "First, give me your heart."
Or, you decorate your inner sanctum yourself,
And again, you hide your face without answering.
Look... I have come with an offering.
Pay the price.
See the gift I brought; embrace the name the poet gave you.
Suropriya...
Either give the poet death in your voice,
Or give him back his heart.`,
    content_bn: `সুরপ্রিয়া
নতুন সকাল
এক নতুন হাওয়া
গাছেরা তাদের পাতা ঝরিয়ে দেওয়ার আগেই
তোমার স্বপ্ন ভেঙে গেছে
তোমার চোখ ঘুম ছাড়িয়ে ওঠে 
এলোমেলো সেই চুলগুলোকে আদরে বেঁধে রাখো
সকাল সাজে,
তুমি শিউলি ফুলের গন্ধস্নান আর আতর গোলাপ মাখো
কালো চুলের খোঁপায় একটা রক্তজবা রাখো
কানের দুলের সঙ্গী করে গোলাপ বেঁধে রাখো
হয়তো কখনো কাঠগোলাপের কাছে নিজের পরিচয় জানতে চাও
সে-ও বলে আগে তোমার হৃদয়খানি দাও
না-হয় নিজের অন্দরমহল
নিজেই সাজিয়ে নাও
আবার তুমি, প্রতি-উত্তর না জানিয়ে মুখ লুকিয়ে নাও
দেখো.., আমি এসেছি তোমার অর্ঘ্য নিয়ে
দামটা বুঝিয়ে দাও
সাথে এনেছি উপহার দেখো,
তোমার কবির দেওয়া নামটা জড়িয়ে নাও
সুরপ্রিয়া, তোমার কণ্ঠে কবিকে মৃত্যু দাও না-হয় হৃদয় ফিরিয়ে দাও`,
  },
  {
    id: 4,
    title_en: "That Girl",
    title_bn: "সেই মেয়েটা",
    date: "MUSE",
    excerpt:
      "Shoes left outside the temple are never stolen; I remain outside.",
    content_en: `That girl...
That girl is my friend.
In her eyes, the love of flowers; on her lips, the smile of the ocean.
A small mole on her cheek, a melody in her throat.
The crease of worry on her forehead, the reflection of light on her skin—
Like a clear mirror,
Though no man is ever seen reflected in that mirror.
Her hands are soft; the world's finest happiness is found in those fingers.
Only flowers suit those hands.
I won't speak of her waist, beautiful as silk-cotton.
Her head full of hair flows down to her waist;
The monsoon wind plays with her tresses all day long.
Blood-red Hibiscus and Tuberose reign in her bun.
Conflict breaks out among the combs over who gets to braid her hair today.
When she steps out after a rose-bath,
Her hair looks like a living noose—
As if it is tightening around my neck.
My heart forgets to breathe.
Her eyes are black, though I call her a foreigner,
But truly, she is my desired woman.
Bangles on her wrists, a red-bordered sari on her form.
A shell necklace at her throat, the lament of flowers in her ears.
A light nose-pin.
Her eyes are always wet with the waters of the Mississippi,
But she holds salt water there to keep the mermaid trait alive.
A guard of petals watches outside her eyes constantly;
Sometimes they are decorated with kohl.
Sometimes they instill fear in the mind—
Lest they wash away in tears.
Her forehead is empty,
Though the messy hair rarely lets it stay so.
Sometimes the veil of modesty fills her forehead with the desire for feeling.
The touch of a red rose on her cheek, the mischief of the afternoon sun—
Suddenly, they draw a gentle, sweet kiss.
Or the sari's edge, or shame itself, hides behind two hands.
Her cheeks are adorned by all this,
Completed by that small mole beneath her cheek.
Death sits on her rose-colored lips.
No one can imagine that death can be so beautiful.
One wishes to die again and again.
But I have no right to die on her lips.
When she calls me by name,
It seems all the beauty of the world descends into her voice.
She calls me in a tune unimaginably beautiful.
I wish to spend this life just hearing my name in her voice.
When she speaks, the birds fall silent.
Silence everywhere.
I listen to her words with deep attention.
How many words she throws at me!
I gather them all and keep them with care.
Except for flowers, no one has received the caress of her hands to this day.
No man has ever touched her.
Only bangles and flowers found a place in that court of happiness.
Even death was defeated there.
Corpses found new life.
The brightness of her skin blinds me.
I can see nothing.
I cannot judge good from bad.
So I have to look away to keep myself sane,
Otherwise, I will go blind forever.
Nature decorated her body with diverse beauties.
In the evening, I am the only one who can give her nothing.
What to do? I still have to borrow moonlight from the moon to write poetry.
I never asked for the light of her beauty to write.
If I get the chance, I will bring her some more moonlight.
She will dress in sunlight by day and my moonlight by night.
Seeing her, the poet will wish to die again in his heart.
Poets will sing, "I'm in want of love."
I will be in that team too.
Finally, let's talk about the beauty of her mind.
Her mind is very simple.
She wants to love people, she wants to keep them well.
But a group of lust-driven people use her wrongly.
I thought I would be the guard of her mind.
But no, that place is not for me.
It is reserved for some other man.
Actually, I cannot explain the beauty of her mind in words.
She is so good, she is so simple.
And a little bit foolish.
But somewhere in her four-chambered heart...
I found no place.
I am still standing outside, knocking.
But perhaps I will retire very soon.
Because one cannot live like this for long.
Poets get nothing.
Shoes left outside the temple do not get stolen.
Yes, the girl I talked about is my friend.
Whose story starts with beauty, ends with beauty.
In between lies sorrow, pain, suffering, etc.
But these are not part of my poem.
Let me know her well first.
Then I will write when the time comes.
If I get a place in her four-chambered heart...
Now it seems I will really die, who knows?
When will I be free from your memories?`,
    content_bn: `সেই মেয়েটা 
সেই মেয়েটা আমার বন্ধু 
চোখে ফুলেদের প্রেম 
ঠোঁটে সমুদ্রের হাসি 
গালে ছোট্ট একটা তিল 
গলায় মধুর সুর 
কপালে দুশ্চিন্তার ভাঁজ 
ত্বকে আলোর প্রতিফলন 
যেন এক স্বচ্ছ আয়না 
যদিও সেই আয়নায় কোনো পুরুষকে দেখা যায় না 
হাত কোমল, 
নরম আঙুল পৃথিবীর শ্রেষ্ঠতম সুখ যে হাতে খুঁজে পাওয়া যায় 
যে হাতে শুধু ফুলেদেরই মানায় 
শিমুল তুলোর মতো সুন্দর কোমরের কথা আর না-ই বলি 
মাথা ভরা চুল কোমর পর্যন্ত নেমে এসেছে কেশ 
তার চুলে সারাদিন ঢেউ খেলে বেড়ায় মৌসুমি বায়ু 
খোঁপায় রাজত্ব করে রক্তজবা আর রজনীগন্ধা 
আজ কে তার চুলে বেণী করে দেবে 
এই নিয়ে চিরুনীদের মাঝে দ্বন্দ্ব শুরু হয়ে যায় 
সে যখন গোলাপ স্নান শেষে বাহিরে আসে 
তার চুলদের দেখে মনে হয় যেন এক জীবন্ত ফাঁসির দড়ি 
যেন আমার গলায় জড়িয়ে যাচ্ছে 
হৃৎপিণ্ড ভুলে যাচ্ছে নিঃশ্বাস নিতে 
তার চোখের রঙ কালো যদিও 
আমি তাকে ভিনদেশী বলি 
কিন্তু আসলে সে আমার কাঙ্ক্ষিত নারী 
যার হাতে মানায় চুড়ি আর পরনে লাল পাড় শাড়ি 
গলায় ঝিনুকের মালা আর কানে ফুলেদের আহাজারি 
নাকে একটা হালকা নাকফুল 
তার চোখটা সবসময় মিসিসিপি নদীর জলে ভেজা 
কিন্তু সাগরকন্যার বৈশিষ্ট্য ধরে রাখতে নোনা জলও সে চোখে ধারণ করে 
চোখের বাহিরে সারাক্ষণ পাহারা দেয় একদল পাপড়ি 
মাঝে মাঝে তাদের কাজল দিয়ে সাজানো হয় 
কখনো কখনো তারা মনের মধ্যে ভয় জাগায় 
কখনো যেন আবার চোখের জলে ধুয়ে না যায় 
কপালটা খালি 
যদিও অগোছালো চুলেরা তাকে খালি থাকতে দেয় না 
কখনো আবার লজ্জার ঘোমটা তার কপালকে ভরিয়ে দেয় অনুভূতির আকাঙ্ক্ষায় 
গালে লাল গোলাপের ছোঁয়া, বিকেল রোদের দুষ্টুমি 
হঠাৎ হঠাৎ আলতো করে মিষ্টি চুমু আঁকে তারা 
কখনো বা আঁচল আবার কখনো 
দুহাতের আড়ালে লুকিয়ে পড়ে লজ্জা 
এসবেই তার গাল সাজে 
আর তাতে পরিপূর্ণতা দান করে তার গালের নিচে থাকা ছোট্ট তিলটা 
গোলাপ বর্ণের ঠোঁটে পুরুষের মৃত্যু বসে থাকে 
মৃত্যুও যে এতো সুন্দর হতে পারে তা কেউ কল্পনা করতে পারে না
ইচ্ছা করে বারবার মৃত্যুবরণ করতে 
কিন্তু তার ঠোঁটে মৃত্যুবরণ করার অধিকার আমার নেই 
সে যখন আমার নাম ধরে ডাকে 
মনে হয় পৃথিবীর সমস্ত সৌন্দর্য তার গলায় নেমে আসে 
এক অকল্পনীয় সুন্দর সুরে সে আমায় ডাকে 
ইচ্ছে করে এ জীবনটা তার গলায় আমার নামটা শুনেই কাটিয়ে দিই 
সে যখন কথা বলে, পাখিরাও চুপ করে থাকে 
নীরব হয়ে যায় চারিদিক 
খুব মনোযোগ দিয়ে শুনি তার কথা 
কত শব্দই না ছুঁড়ে দেয় সে আমাকে 
সকলকে গুছিয়ে নিয়ে যত্নে রেখে দিই আমি 
ফুলেরা ব্যতীত আজ পর্যন্ত কেউ তার হাতের আদর পায়নি 
কখনো ছুঁয়ে দেখেনি কোনো পুরুষ 
শুধু চুড়ি, আর ফুলেদের স্থান হয়েছে সেই সুখের দরবারে 
সে দরবারে পরাজিত হয়েছে মৃত্যুও 
লাশেরা পেয়েছে নতুন জীবন 
তার ত্বকের উজ্জ্বলতা আমায় অন্ধ করে দেয় 
আমি কিছুই দেখতে পাই না 
ভালো-মন্দের বিচার করতে পারি না 
তাই নিজেকে ধরে রাখতে চোখ ফিরিয়ে আনতে হয় 
নাহলে যে চিরতরে অন্ধ হয়ে যাবো 
প্রকৃতির দেওয়া নানা সৌন্দর্যে তার দেহটা 
সাঁজে আমিই শুধু তাকে কিছু দিতে পারিনা 
কি করব, আজও কবিতা লেখার জন্য চাঁদের কাছে জোছনা ধার করতে হয় 
কখনো তার রূপের আলো চাইনি কবিতা লেখার জন্য 
যদি কখনো সুযোগ হয় তাকে আরেকটু জোছনা এনে দিব 
দিনের বেলা সূর্যালোকে আর রাতে আমার দেওয়া জোছনায় সে সাজবে 
তাকে দেখে কবির বুকে আবারও মৃত্যুবরণ করার ইচ্ছা জাগবে 
কবিরা সুর তুলবে "I'm in want of love" 
আমিও সেই দলে থাকবো 
সবশেষে তার মনের সৌন্দর্যের কথা বলি 
তার মনটা খুবই সরল 
সে মানুষকে ভালোবাসতে চায়, ভালো রাখতে চায় 
কিন্তু একদল কামনায় বশীভূত মানুষ তাকে ভুলভাবে ব্যবহার করে 
ভেবেছিলাম তার মনের প্রহরী হব 
কিন্তু না সেই স্থান আমার জন্য নয় 
অন্য কোনো পুরুষের জন্য রক্ষিত 
আসলে আমি শব্দে ব্যাখ্যা করতে পারছি না তার মনের সৌন্দর্য 
এতোটাই ভালো সে এতোটাই সরল সে 
আর অল্প একটু বোকা 
তবে তার চার প্রকোষ্ঠবিশিষ্ট হৃৎপিণ্ডের কোথাও 
আমার জায়গা হয়নি 
এখনো বাহিরে দাঁড়িয়ে কড়া নেড়ে চলেছি 
তবে খুব তাড়াতাড়িই হয়তো অব্যাহতি নিব 
কেননা এভাবে বেশি দিন বাঁচা যায় না 
কবিরা কিছু পায় না 
উপাসনালয়ের বাহিরে জুতা রেখে গেলে জুতা চুরি হয় না 
হ্যাঁ এই যে মেয়েটার কথা বললাম সে আমার বন্ধু 
যার গল্প শুরু হয় সৌন্দর্য দিয়ে, শেষ হয় সৌন্দর্য দিয়ে 
মাঝে থাকে দুঃখ, কষ্ট, বেদনা ইত্যাদি ইত্যাদি 
তবে এসব আমার কবিতার অংশ নয় 
আগে ভালোভাবে তাকে জেনে নিই 
তারপর সময় হলে লিখব 
যদি তার চার প্রকোষ্ঠবিশিষ্ট হৃৎপিণ্ডের কোথাও আমার জায়গা
হয় এবার মনে হচ্ছে সত্যিই মারা যাব কে জানে
তোমার স্মৃতিদের থেকে কবে মুক্তি পাব`,
  },
  {
    id: 5,
    title_en: "That Day",
    title_bn: "সেদিন",
    date: "MEMOIR",
    excerpt: "Everything happened that day, except the union of our minds.",
    content_en: `That day...
That morning, my sleep broke with thoughts of you.
The morning words struck you,
And you are no less—
Your words made me cry in the night too.
I do not know if you saw.
But that day, the sky dressed in a new form.
There was a bridal chamber of clouds in the heavens.
The rains were standing guard.
I was looking for you.
I was looking at you the entire time.
Sometimes, I watched the union of the clouds too.
I thought I would take you to the clouds,
And ask them how they love.
But I could do nothing.
Your beauty consumed my heart.
Your wondrous smile encouraged me to die once again.
I stared at you like a madman.
But your gaze, for some reason, did not want to be mine.
Your lips were very happy that day.
How beautifully they were dressed in pink!
I wanted to make them a little more colorful.
But the mind did not give approval.
I brought a rose for you.
I thought I would give you the rose,
And tell it to dress just like you.
But again, finding no approval from the mind, the rose was not given.
Your eyes were very restless that day.
I could not catch them in any way.
I thought I would decorate them anew,
Though their decoration had already wounded my mind.
But even then, the mind did not give approval.
Everything is fine.
I just didn't sing for you.
I didn't hug you once.
I didn't get your caress.
I didn't hear a song in your tune.
Actually, everything happened that day; only our minds did not unite.`,
    content_bn: `সেদিন
সেদিন সকালে ঘুম তোমায় নিয়ে ভেঙেছিলো
প্রভাতের শব্দগুলো তোমাকে আঘাত করেছিলো 
তুমিও কিছু কম নও 
তোমার শব্দেরাও রাতে আমাকে কাঁদিয়েছিলো 
তুমি দেখেছো কি-না জানি না 
কিন্তু সেদিন আকাশ নতুন রূপে সেজেছিলো 
আকাশে মেঘেদের বাসর হয়েছিলো 
বৃষ্টিরা পাহারা দিচ্ছিলো 
আমি তোমায় খুঁজছিলাম 
সারাক্ষণ তোমার দিকে তাকিয়ে ছিলাম 
মাঝে মাঝে মেঘেদের মিলনও দেখছিলাম 
ভাবছিলাম তোমাকে নিয়ে মেঘেদের কাছে যাব 
জিজ্ঞেস করব তারা কিভাবে ভালোবাসে 
কিন্তু কিছুই করতে পারলাম না 
তোমার রূপ আমার হৃদয়কে গ্রাস করে নিলো 
তোমার বিস্ময়কর হাসি যেন আমায় আবার মৃত্যুবরণ করতে উৎসাহিত করল 
পাগলের মত তাকিয়ে রইলাম তোমার দিকে 
কিন্তু তোমার দৃষ্টি কেন জানি আমার হতে চাইলো না 
তোমার ঠোঁটেরা সেদিন অনেক খুশি ছিল 
গোলাপি রঙে কত সুন্দর করেই না সেজেছিলো তারা 
তাদের আরো একটু রঙিন করতে চেয়েছিলাম 
কিন্তু মন অনুমোদন দিল না 
তোমার জন্য একটা গোলাপ এনেছিলাম 
তোমায় গোলাপটা দিব ভাবছিলাম ভেবেছিলাম 
তাকে বলব সেও যেন তোমার মতো করে সাজে 
কিন্তু আবারো মনের অনুমোদন না পাওয়ায় তোমায় গোলাপটা দেওয়া হলো না 
তোমার চোখেরা সেদিন খুবই চঞ্চল ছিলো 
কোনোভাবেই তাদের ধরতে পারছিলাম না 
ভেবেছিলাম তাদেরও নতুন করে সাজাবো 
যদিও তাদের সাজ এমনিতেই আমার মনকে ক্ষত-বিক্ষত করেছে
কিন্তু এতেও মন অনুমোদন দিল না 
সবই ঠিক আছে 
শুধু তোমার জন্য গান গাওয়া হলো না 
তোমায় একটিবার জড়িয়ে ধরা হলো না 
তোমার আদর মাখা হলো না 
তোমার সুরে একটা গান শোনা হলো না 
সেদিন আসলে সবই হয়েছিলো শুধু আমাদের মনের মিলনটা হয়নি`,
  },
  {
    id: 6,
    title_en: "Rebirth",
    title_bn: "পুনর্জন্ম",
    date: "REBIRTH",
    excerpt:
      "I will watch the world end, wondering how to live with you for another hundred years.",
    content_en: `If humans,
If all the people of the earth promise to soak in the rain,
If the rush of living the monsoon falls upon every house on earth,
Then I will be born again as a poet.
If the priest's loud call of praise
And the cry of the child in the hungry mother's lap
Reach the Creator with equal importance,
Then I will be born again in that mother's lap.
If a government official ever finds the time to hear the past
Of a madman lying on the street,
If it can ever be known
Whose name was written in his poetry book,
Then I will definitely be born as a journalist in that city.
If a dying soldier
And a failed, suicidal lover
Sit together for a session of songs,
Then I will definitely be born again as a listener.
If the pen reveals the meaning of a complex poem,
If a lover can also know
What the poetry book knows about the lover,
Then I will be born again in this world as a lover.
If humans never propose love again,
If they only promise love,
Then I will tear up the lyrics of Anupam's 'Song of Giving Back' (Firiye Deowar Gaan),
And I will write a self-composed 'Song of Getting Back'.
Or,
"If the heart cries,
You come...
Come... in a monsoon."
— Humayun Ahmed
If the news reaches Hell shortly before the earth is destroyed,
Then, with a cup of tea in hand, I will embrace the print of your lips left behind,
And thinking about how to live with you for another hundred years,
I will watch the destruction of the world.`,
    content_bn: `পুনর্জন্ম
যদি মানুষ, 
যদি পৃথিবীর সব মানুষ বৃষ্টি ভেজার প্রতিশ্রুতি করে 
যদি পৃথিবীর ঘরে ঘরে বর্ষা যাপনের ধুম পড়ে 
তবে আমি আবার কবি হয়ে জন্ম নেব
যদি পূজারীর গেয়ে যাওয়া প্রশংসার হাঁক 
আর ক্ষুধার্ত মায়ের কোলের শিশুর ডাক 
সৃষ্টিকর্তার কাছে সমান গুরুত্বে পৌঁছায় 
তবে আমি সেই মায়ের কোলে আবার জন্ম নেব
যদি রাস্তায় পড়ে থাকা কোনো পাগলের 
অতীত শোনার সময় হয়ে যায় কোনো সরকারি কর্মকর্তার 
যদি কখনো জানতে পারা যায় 
কবিতার খাতায় কার নাম লেখা ছিল তার 
তবে আমি অবশ্যই সেই শহরে সাংবাদিক হয়ে জন্ম নেব
যদি কোনো মৃত্যুপথযাত্রী সৈনিক 
আর কোনো ব্যর্থ আত্মঘাতী প্রেমিক 
একসাথে বসে গানের আসর করে 
তবে আমি অবশ্যই আবারও শ্রোতা হয়ে জন্ম নেব
যদি কলম বলে দেয় জটিল কোনো কবিতার মানে 
যদি কোনো প্রেমিকাও জানতে পারে 
কবিতার খাতাটা প্রেমিকের সম্পর্কে যা যা জানে 
তবে আমি আবার এই পৃথিবীতে কোনো প্রেমিক হয়ে জন্ম নেব
যদি মানুষ আর কখনো ভালোবাসার প্রস্তাব না 
করে যদি শুধুই ভালোবাসার প্রতিজ্ঞা করে 
তবে আমি অনুপমের 'ফিরিয়ে দেওয়ার গান'-এর লিরিক্স ছিঁড়ে ফেলে 
লিখে দিব স্বরচিত 'ফিরে পাওয়ার গান'
অথবা, 
"যদি মন কাঁদে 
তুমি চলে এসো... 
চলে এসো... এক বর্ষায়" 
-হুমায়ূন আহমেদ
যদি পৃথিবী ধ্বংস হওয়ার কিছুক্ষণ আগে নরকে খবর পৌঁছে যায় 
তবে, এক কাপ চা হাতে নিয়ে তোমার ফেলে যাওয়া ঠোঁটের ছাপকে আলিঙ্গন করব 
আর কীভাবে তোমার সাথে আরো একশ বছর বাঁচা যায় তা ভাবতে ভাবতে 
পৃথিবীর ধ্বংস হওয়া দেখবো`,
  },
  {
    id: 7,
    title_en: "A Story of You",
    title_bn: "একটা তুমির গল্প",
    date: "STORY",
    excerpt: "Who knows, mindlessly you might paint my picture sometime.",
    content_en: `A story of you.
I know you love flowers.
You keep soft, tender petals with care,
Hiding the heart, smiling sweetly in the guise of death.
Every morning, a scent-bath of Shiuli flowers,
And you wear rose perfume.
You keep a red hibiscus in your black hair bun.
You draw imagination with the touch of artistic illusion;
You keep the paintbrush in the fold of your soft fingers.
Who knows? Perhaps mindlessly, sometime, you might paint my picture.`,
    content_bn: `একটা তুমির গল্প
আমি জানি তুমি ফুল ভালোবাস 
নরম কোমল দলমণ্ডল আদর মেখে রাখ 
মরণ বেশে মিষ্টি হেসে হৃদয় লুকিয়ে রাখ
রোজ সকালে, শিউলি ফুলের গন্ধ স্নান 
আর আতর গোলাপ মাখ 
কালো চুলের খোঁপায় একটা রক্তজবা রাখ
চিত্রকলার মায়ার ছোঁয়ায় কল্পনাটা আঁক 
নরম হাতের আঙুল ভাঁজে রংতুলিটা রাখ
কে-জানে আবার মন ভুলে কখন আমার ছবিটা আঁক`,
  },
];
const writingsContainer = document.getElementById("writings-grid");
if (writingsContainer) {
  writingsData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "writing-card hover-trigger reveal-scroll";
    card.setAttribute("data-id", item.id);
    card.innerHTML = `
            <span class="card-date">${item.date}</span>
            <h4 class="card-title">${item.title_en}</h4>
            <p class="card-excerpt">${item.excerpt}</p>
        `;
    card.addEventListener("click", () => openModal(item));
    writingsContainer.appendChild(card);
  });
}
const modal = document.getElementById("writing-modal");
const modalClose = document.getElementById("modal-close");
const modalLangToggle = document.getElementById("modal-lang-toggle");
const modalDate = document.getElementById("modal-date");
const modalTitle = document.getElementById("modal-title");
const modalBodyEn = document.getElementById("modal-body-en");
const modalBodyBn = document.getElementById("modal-body-bn");
let currentWriting = null;
let isEnglish = true;
function openModal(item) {
  currentWriting = item;
  isEnglish = true;
  updateModalContent();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  lenis.stop();
}
function updateModalContent() {
  if (!currentWriting) return;
  modalDate.innerText = currentWriting.date;
  if (isEnglish) {
    modalTitle.innerText = currentWriting.title_en;
    modalLangToggle.innerText = "[ SHOW ORIGINAL ]";
    modalBodyEn.classList.remove("hidden");
    modalBodyBn.classList.add("hidden");
  } else {
    modalTitle.innerText = currentWriting.title_bn;
    modalLangToggle.innerText = "[ SHOW TRANSLATION ]";
    modalBodyEn.classList.add("hidden");
    modalBodyBn.classList.remove("hidden");
  }
  modalBodyEn.innerText = currentWriting.content_en;
  modalBodyBn.innerText = currentWriting.content_bn;
}
modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  lenis.start();
});
modalLangToggle.addEventListener("click", () => {
  isEnglish = !isEnglish;
  updateModalContent();
});
const heroTl = gsap.timeline();
heroTl.from(".reveal-elem", {
  y: 30,
  opacity: 0,
  duration: 1.2,
  stagger: 0.15,
  ease: "power3.out",
});
const revealElements = document.querySelectorAll(".reveal-scroll");
revealElements.forEach((element) => {
  gsap.from(element, {
    scrollTrigger: { trigger: element, start: "top 80%" },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
});
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
const particles = [];
const particleCount = 40;
class Particle {
  constructor() {
    this.reset();
    this.x = Math.random() * width;
    this.y = Math.random() * height;
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2.5 + 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.pulseSpeed = 0.02 + Math.random() * 0.03;
    this.pulseDir = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    this.opacity += this.pulseSpeed * this.pulseDir;
    if (this.opacity > 0.8 || this.opacity < 0.2) this.pulseDir *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(0, 255, 157, " + this.opacity + ")";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0, 255, 157, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}
function animateCanvas() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();
