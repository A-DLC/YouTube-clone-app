const apiKey = "AIzaSyBzlVw7uf8dXPPx6qwJx8ikdD5quDVnbDE";

const endpoint =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&q= js tutorials&key=AIzaSyBzlVw7uf8dXPPx6qwJx8ikdD5quDVnbDE";

//selectors
const vidContainer = document.querySelector(".vidContainer");
const form = document.querySelector("form");
const input = document.querySelector("input");
const loading = document.querySelector(".loading");
const searchIcon = document.querySelector(".searchIcon");
const err = document.querySelector(".err");

//Hide the error, search icon and loading
loading.style.display = "none";
err.style.display = "none";

//search videos
const searchYoutubeVid = async (searchTerm) => {
  try {
    // show loading
    loading.style.display = "block";

    const res = await fetch(
      ` https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyBzlVw7uf8dXPPx6qwJx8ikdD5quDVnbDE`
    );

    const data = await res.json();
    console.log(data);

    //check for error
    if (data.error) {
      err.style.display = "block";
      loading.style.display = "none";
    }

    //hide loading
    loading.style.display = "none";

    //hide the search icon
    searchIcon.style.display = "none";
    //display the videos to dom
    data.items.forEach((vid) => {
      displayVids(vid);
    });
  } catch (error) {
    console.log(error);
    err.style.display = "block";
    loading.style.display = "none";
  }
};

//search bar code
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //get value from input
  const val = input.value;
  searchYoutubeVid(val);
  console.log(val);
});

// searchYoutubeVid("crossing fields");

//display youtube videos

const displayVids = (video) => {
  //create div with class of vidItem
  const vidItem = document.createElement("div");
  vidItem.classList.add("vidItem");

  //append the vidItem to the vidContainer, agregarle el elemento recine creado
  vidContainer.appendChild(vidItem);

  //create iframe with all the atribbutes
  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    `https://www.youtube.com/embed/${video.id.videoId}`
  );
  iframe.setAttribute("height", "315");
  iframe.setAttribute("width", "560");
  iframe.setAttribute("frameborder", "0");

  //append to vidItem
  vidItem.appendChild(iframe);

  //create the p tags
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerHTML = video.snippet.title;

  //desc
  const desc = document.createElement("p");
  desc.classList.add("desc");
  desc.innerHTML = video.snippet.description;

  //channel
  const channel = document.createElement("p");
  channel.classList.add("channel");
  channel.innerHTML = video.snippet.channelTitle;

  //date
  const date = document.createElement("p");
  date.classList.add("date");
  date.innerHTML = video.snippet.publishedAt;

  //append all the p tags to the vidItems
  vidItem.appendChild(title);
  vidItem.appendChild(channel);
  vidItem.appendChild(desc);
  vidItem.appendChild(date);
};

// displayVids();
