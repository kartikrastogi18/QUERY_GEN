const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const questionInput = document.getElementById("question");
const outputSection = document.getElementById("outputSection");
const outputCode = document.getElementById("output");
let isRequestInProgress = false;
// Generate SQL
generateBtn.addEventListener("click", async () => {
    if (isRequestInProgress) return; 
    const question = questionInput.value.trim();
    console.log("Backend questionquestion:", question);
    if (!question) {
        alert("Please enter a question.");
        return;
    }
    isRequestInProgress = true;
    // UI Loading State
    const originalBtnContent = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;
    outputSection.style.display = "none";
    outputCode.innerText = "";

    try {
        const res = await fetch("http://localhost:3000/generate-sql", {
            
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
            
        });
        const data = await res.json();
        if (!res.ok) {
            // console.log("Backend response:", data);
            if (res.status === 429) {
              throw new Error("RATE_LIMIT");
            }
            throw new Error(data.error || "BACKEND_ERROR");
          }
      
        console.log("Backend response:", data);

        console.log("--------------")
        if (data) {
            console.log("---outputCodeoutputCode-7656789", outputCode)
            outputCode.innerText = data.sql;
            console.log("---outputCodeoutputCode-", outputCode)
            outputSection.style.display = "block";
            // Smooth scroll to result
            outputSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert(data.error || "Could not generate SQL.");
        }

    }catch (error) {
        console.error("Error generating answer:", error);
    
        if (error.message === "RATE_LIMIT") {
            alert("Too many requests. Please wait 1 minute and try again.");
        } else {
            alert("Something went wrong. Please try again.");
        }
    }finally {
        
        isRequestInProgress = false;
        generateBtn.innerHTML = originalBtnContent;
        generateBtn.disabled = false;
    }
});

// Copy Functionality
copyBtn.addEventListener("click", () => {
    const code = outputCode.innerText;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.style.borderColor = "var(--success)";
        copyBtn.style.color = "var(--success)";
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHtml;
            copyBtn.style.borderColor = "";
            copyBtn.style.color = "";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
