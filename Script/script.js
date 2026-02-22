let interviewList = [];
let rejectedList = [];

let total = document.getElementById("total");
let interview = document.getElementById("interview");
let rejected = document.getElementById("rejected");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filteredCards = document.getElementById("filtered-cards");

// total part
function calculateCount() {
  total.innerText = allCardSection.children.length; //8
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
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

  selected.classList.remove("bg-[#FFFFFF]", "text-black");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredCards.classList.remove("hidden");
  } else if (id == "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filteredCards.classList.add("hidden");
  } else if (id == "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredCards.classList.remove("hidden");
  }
}

mainContainer.addEventListener("click", function (event) {
  // console.log(event.target.classList.contains("interview-btn"));
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode;

    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const jobInfo = parentNode.querySelector(".jobInfo").innerText;

    parentNode.querySelector(".status").innerText = "INTERVIEW";

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

    // rejectedList = rejectedList.filter(
    //   (item) => item.jobName != cardInfo.jobName,
    // );
    // console.log(interviewList);
    calculateCount();
    renderInterview();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode;

    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const jobInfo = parentNode.querySelector(".jobInfo").innerText;

    parentNode.querySelector(".status").innerText = "REJECTED";

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

    // interviewList = interviewList.filter(
    //   (item) => item.jobName != cardInfo.jobName,
    // );

    // console.log(interviewList);
    calculateCount();
    renderRejected();
  }
});

function renderInterview() {
  filteredCards.innerHTML = "";
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
