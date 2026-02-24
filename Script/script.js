let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

// counters
const total = document.getElementById("total");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const jobCountText = document.getElementById("job-count");

// buttons
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// sections
const allCardSection = document.getElementById("allCards");
const filteredCards = document.getElementById("filtered-cards");
const mainContainer = document.querySelector("main");

// ================= COUNT =================
function calculateCount() {
  const totalJobs = allCardSection.querySelectorAll(".job-card").length;

  total.innerText = totalJobs;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  if (currentStatus === "all") {
    jobCountText.innerText = `${totalJobs} jobs`;
  } else if (currentStatus === "interview") {
    jobCountText.innerText = `${interviewList.length} of ${totalJobs}`;
  } else {
    jobCountText.innerText = `${rejectedList.length} of ${totalJobs}`;
  }
}

calculateCount();

// ================= FILTER =================
function toggleEvent(id) {
  // reset button styles
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach((btn) => {
    btn.classList.remove("bg-[#3B82F6]", "text-white");
    btn.classList.add("bg-white", "text-black");
  });

  const selected = document.getElementById(id);
  selected.classList.remove("bg-white", "text-black");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  if (id === "all-filter-btn") {
    currentStatus = "all";
    allCardSection.classList.remove("hidden");
    filteredCards.classList.add("hidden");
  }

  if (id === "interview-filter-btn") {
    currentStatus = "interview";
    allCardSection.classList.add("hidden");
    filteredCards.classList.remove("hidden");
    renderCards(interviewList);
  }

  if (id === "rejected-filter-btn") {
    currentStatus = "rejected";
    allCardSection.classList.add("hidden");
    filteredCards.classList.remove("hidden");
    renderCards(rejectedList);
  }

  calculateCount();
}

// ================= MAIN CLICK EVENT =================
mainContainer.addEventListener("click", function (event) {
  const card = event.target.closest(".job-card");
  if (!card) return;

  const jobName = card.querySelector(".jobName").innerText;
  const jobTitle = card.querySelector(".jobTitle").innerText;
  const salary = card.querySelector(".salary").innerText;
  const jobInfo = card.querySelector(".jobInfo").innerText;
  const statusBtn = card.querySelector(".status");

  // ===== INTERVIEW =====
  if (event.target.classList.contains("interview-btn")) {
    statusBtn.innerText = "INTERVIEW";
    statusBtn.className =
      "status mb-3 text-[14px] bg-green-100 text-green-700 p-2 rounded-[4px]";

    const jobData = { jobName, jobTitle, salary, jobInfo, status: "INTERVIEW" };

    if (!interviewList.find((item) => item.jobName === jobName)) {
      interviewList.push(jobData);
    }

    rejectedList = rejectedList.filter((item) => item.jobName !== jobName);

    if (currentStatus === "interview") renderCards(interviewList);
    if (currentStatus === "rejected") renderCards(rejectedList);

    calculateCount();
  }

  // ===== REJECTED =====
  if (event.target.classList.contains("rejected-btn")) {
    statusBtn.innerText = "REJECTED";
    statusBtn.className =
      "status mb-3 text-[14px] bg-red-100 text-red-700 p-2 rounded-[4px]";

    const jobData = { jobName, jobTitle, salary, jobInfo, status: "REJECTED" };

    if (!rejectedList.find((item) => item.jobName === jobName)) {
      rejectedList.push(jobData);
    }

    interviewList = interviewList.filter((item) => item.jobName !== jobName);

    if (currentStatus === "interview") renderCards(interviewList);
    if (currentStatus === "rejected") renderCards(rejectedList);

    calculateCount();
  }

  // ===== DELETE =====
  if (event.target.closest(".delete-btn")) {
    interviewList = interviewList.filter((item) => item.jobName !== jobName);
    rejectedList = rejectedList.filter((item) => item.jobName !== jobName);

    card.remove();

    if (currentStatus === "interview") renderCards(interviewList);
    if (currentStatus === "rejected") renderCards(rejectedList);

    calculateCount();
  }
});

// ================= RENDER FUNCTION =================
function renderCards(list) {
  filteredCards.innerHTML = "";

  if (list.length === 0) {
    filteredCards.innerHTML = `
      <div class="text-center bg-white shadow-xl rounded-[8px] py-20">
        <p class="text-[#7DA8FF] text-6xl">
          <i class="fa-solid fa-file-lines"></i>
        </p>
        <br />
        <h3 class="font-bold text-lg">No jobs available</h3>
        <p class="text-[#64748B]">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  list.forEach((job) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="job-card bg-white shadow-xl rounded-[8px] p-5">
        <div class="flex justify-between">
          <div>
            <p class="jobName font-semibold text-[18px]">${job.jobName}</p>
            <p class="jobTitle text-[16px]">${job.jobTitle}</p>
          </div>
          <button class="delete-btn cursor-pointer border rounded-full h-[30px] w-[30px] mb-7">
            <i class="fa-solid fa-trash-can text-[#64748B]"></i>
          </button>
        </div>
        <p class="salary mb-4 text-[14px]">${job.salary}</p>
        <button class="status mb-3 text-[14px] p-2 rounded-[4px] ${
          job.status === "INTERVIEW"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }">
          ${job.status}
        </button>
        <p class="jobInfo mb-3">${job.jobInfo}</p>
        <button
            class="interview-btn cursor-pointer border text-[#10B981] p-2 rounded-[4px] hover:bg-[#10B981] hover:text-[#FFFFFF]"
          >
            INTERVIEW
          </button>
          <button
            class="rejected-btn cursor-pointer border text-[#EF4444] p-2 rounded-[4px] hover:bg-[#EF4444] hover:text-[#FFFFFF]"
          >
            REJECTED
          </button>
      </div>
    `;
    filteredCards.appendChild(div);
  });
}
