let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let total = document.getElementById("total");
let interview = document.getElementById("interviewCount");
let rejected = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filteredCards = document.getElementById("filtered-cards");

// total part
function calculateCount() {
  total.innerText = allCardSection.children.length; //8
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleEvent(id) {
  allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  allFilterBtn.classList.add("bg-[#FFFFFF]", "text-black");
  interviewFilterBtn.classList.add("bg-[#FFFFFF]", "text-black");
  rejectedFilterBtn.classList.add("bg-[#FFFFFF]", "text-black");

  const selected = document.getElementById(id);

  currentStatus = id;
  console.log(currentStatus);

  selected.classList.remove("bg-[#FFFFFF]", "text-black");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredCards.classList.remove("hidden");
    renderInterview();
  } else if (id == "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filteredCards.classList.add("hidden");
  } else if (id == "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredCards.classList.remove("hidden");
    renderRejected();
  }
}

mainContainer.addEventListener("click", function (event) {
  // console.log(event.target.classList.contains("interview-btn"));
  if (event.target.classList.contains("interview-btn")) {
    const parenNode = event.target.parentNode;

    const jobName = parenNode.querySelector(".jobName").innerText;
    const jobTitle = parenNode.querySelector(".jobTitle").innerText;
    const salary = parenNode.querySelector(".salary").innerText;
    const status = parenNode.querySelector(".status").innerText;
    const jobInfo = parenNode.querySelector(".jobInfo").innerText;

    parenNode.querySelector(".status").innerText = "INTERVIEW";

    const cardInfo = {
      jobName,
      jobTitle,
      salary,
      status: "INTERVIEW",
      jobInfo,
    };
    //   console.log(cardInfo);

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    if (currentStatus == "rejected-filter-btn") {
      renderRejected();
    }
    // console.log(interviewList);
    calculateCount();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parenNode = event.target.parentNode;

    const jobName = parenNode.querySelector(".jobName").innerText;
    const jobTitle = parenNode.querySelector(".jobTitle").innerText;
    const salary = parenNode.querySelector(".salary").innerText;
    const status = parenNode.querySelector(".status").innerText;
    const jobInfo = parenNode.querySelector(".jobInfo").innerText;

    parenNode.querySelector(".status").innerText = "REJECTED";

    const cardInfo = {
      jobName,
      jobTitle,
      salary,
      status: "REJECTED",
      jobInfo,
    };
    //   console.log(cardInfo);

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    if (currentStatus == "interview-filter-btn") {
      renderInterview();
    }
    // console.log(interviewList);
    calculateCount();
  }

  //delete
  else if (event.target.closest(".delete-btn")) {
    const parentNode = event.target.closest(".job-card");
    const jobName = parentNode.querySelector(".jobName").innerText;

    // remove from interview list
    interviewList = interviewList.filter((item) => item.jobName !== jobName);

    // remove from rejected list
    rejectedList = rejectedList.filter((item) => item.jobName !== jobName);

    // remove from DOM
    parentNode.remove();

    // re-render filtered view if active
    if (currentStatus === "interview-filter-btn") renderInterview();
    if (currentStatus === "rejected-filter-btn") renderRejected();

    calculateCount();
  }
});

function renderInterview() {
  filteredCards.innerHTML = "";

  if (interviewList.length === 0) {
    filteredCards.innerHTML = `
      <div class="text-center bg-[#FFFFFF] shadow-xl rounded-[8px] py-20">
        <p class="text-[#7DA8FF] text-6xl"><i class="fa-solid fa-file-lines"></i></p>
        <br />
        <h3 class="font-bold text-lg">No jobs available</h3>
        <p class="text-[#64748B]">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }
  
  for (let interview of interviewList) {
    console.log(interview);
    let div = document.createElement("div");
    div.className = "gap-5 flex flex-col";
    div.innerHTML = `
    <div class="bg-[#FFFFFF] shadow-xl rounded-[8px] p-5">
          <div class="flex justify-between">
            <div>
              <p class="jobName font-semibold text-[18px]">${interview.jobName}</p>
              <p class="jobTitle text-[16px]">${interview.jobTitle}</p>
            </div>
            <button
              class="cursor-pointer border rounded-full h-[30px] w-[30px] mb-7"
            >
              <i class="fa-solid fa-trash-can text-[#64748B]"></i>
            </button>
          </div>
          <p class="salary mb-4 text-[14px]">
            ${interview.salary}
          </p>
          <button
            class="status cursor-pointer mb-3 text-[14px] bg-[#EEF4FF] p-2 rounded-[4px] text-[#002C5C]"
          >
            ${interview.status}
          </button>
          <p class="jobInfo mb-3">
            ${interview.jobInfo}
          </p>
          <button
            class="cursor-pointer border text-[#10B981] p-2 rounded-[4px] hover:bg-[#10B981] hover:text-[#FFFFFF]"
          >
            INTERVIEW
          </button>
          <button
            class="cursor-pointer border text-[#EF4444] p-2 rounded-[4px] hover:bg-[#EF4444] hover:text-[#FFFFFF]"
          >
            REJECTED
          </button>
        </div>
      `;
    filteredCards.appendChild(div);
  }
}

function renderRejected() {
  filteredCards.innerHTML = "";

  if (rejectedList.length === 0) {
    filteredCards.innerHTML = `
      <div class="text-center bg-[#FFFFFF] shadow-xl rounded-[8px] py-20">
        <p class="text-[#7DA8FF] text-6xl"><i class="fa-solid fa-file-lines"></i></p>
        <br />
        <h3 class="font-bold text-lg">No jobs available</h3>
        <p class="text-[#64748B]">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  for (let rejected of rejectedList) {
    console.log(rejected);
    let div = document.createElement("div");
    div.className = "gap-5 flex flex-col";
    div.innerHTML = `
    <div class="bg-[#FFFFFF] shadow-xl rounded-[8px] p-5">
          <div class="flex justify-between">
            <div>
              <p class="jobName font-semibold text-[18px]">${rejected.jobName}</p>
              <p class="jobTitle text-[16px]">${rejected.jobTitle}</p>
            </div>
            <button
              class="cursor-pointer border rounded-full h-[30px] w-[30px] mb-7"
            >
              <i class="fa-solid fa-trash-can text-[#64748B]"></i>
            </button>
          </div>
          <p class="salary mb-4 text-[14px]">
            ${rejected.salary}
          </p>
          <button
            class="status cursor-pointer mb-3 text-[14px] bg-[#EEF4FF] p-2 rounded-[4px] text-[#002C5C]"
          >
            ${rejected.status}
          </button>
          <p class="jobInfo mb-3">
            ${rejected.jobInfo}
          </p>
          <button
            class="cursor-pointer border text-[#10B981] p-2 rounded-[4px] hover:bg-[#10B981] hover:text-[#FFFFFF]"
          >
            INTERVIEW
          </button>
          <button
            class="cursor-pointer border text-[#EF4444] p-2 rounded-[4px] hover:bg-[#EF4444] hover:text-[#FFFFFF]"
          >
            REJECTED
          </button>
        </div>
      `;
    filteredCards.appendChild(div);
  }
}
