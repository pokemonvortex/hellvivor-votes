// Example input data
const input = JSON.parse(sessionStorage.getItem('inputData'));

function populateData(data) {
    // document.getElementById("tribe-name").innerText = data.tribe;
    // document.getElementById("immunity-holder").innerText = data.immunity;
    document.getElementById("voted-out-img").src = `cast/${data.votedOut.name.toLowerCase()}.png`;
    document.getElementById("voted-out-name").innerText = data.votedOut.name;
    document.getElementById("placement").innerText = data.votedOut.placement;
    // document.getElementById("voted-out-name-list").innerText = data.votedOut.name;

    const tribe = data.tribe
    const tribeDiv = document.getElementById("tribe-name");
    const tribeImg = document.createElement("img");
    tribeImg.src = `cast/${tribe.toLowerCase()}.png`;
    tribeImg.alt = tribe;
    const tribeName = document.createElement("p");
    tribeName.innerText = tribe;
    tribeDiv.appendChild(tribeImg);
    tribeDiv.appendChild(tribeName);

    const immunity = data.immunity
    const immunityDiv = document.getElementById("immunity-holder");
    const immunityImg = document.createElement("img");
    immunityImg.src = `cast/${immunity.toLowerCase()}.png`;
    immunityImg.alt = immunity;
    const immunityName = document.createElement("p");
    immunityName.innerText = immunity;
    immunityDiv.appendChild(immunityImg);
    immunityDiv.appendChild(immunityName);

    const voteCounts = {};
    data.votedOut.voters.forEach(voter => {
        voteCounts[data.votedOut.name] = (voteCounts[data.votedOut.name] || 0) + 1;
    });
    data.otherVotes.forEach(vote => {
        voteCounts[vote.name] = (voteCounts[vote.name] || 0) + vote.voters.length;
    });

    const voteCountText = Object.values(voteCounts).join(" - ");
    document.getElementById("vote-count").innerText = voteCountText;

    const votesForOut = document.getElementById("votes-for-out");
    votesForOut.innerHTML = '';
    const topRow = document.createElement("div");
    topRow.className = "votes-row";
    const bottomRow = document.createElement("div");
    bottomRow.className = "votes-row";

    const voters = data.votedOut.voters;
    const topRowCount = voters.length > 5 ? Math.floor(voters.length / 2) : voters.length;

    voters.forEach((voter, index) => {
        const voteDiv = document.createElement("div");
        voteDiv.className = "vote";
        voteDiv.innerHTML = `<img src="cast/${voter.toLowerCase()}.png" alt="${voter}"><p>${voter}</p>`;
        voteDiv.addEventListener("click", () => toggleSelfVote(voteDiv));
        if (index < topRowCount) {
            topRow.appendChild(voteDiv);
        } else {
            bottomRow.appendChild(voteDiv);
        }
    });

    votesForOut.appendChild(topRow);
    votesForOut.appendChild(bottomRow);

    if (data.otherVotes.length !== 0) {
        const otherVotes = document.getElementById("other-votes");
        data.otherVotes.forEach(vote => {
            const otherVoteDiv = document.createElement("div");
            otherVoteDiv.className = "other-vote";
            otherVoteDiv.innerHTML = `<img src="cast/${vote.name.toLowerCase()}.png" alt="${vote.name}" class="main"><p>${vote.name}</p><div class="voters"></div>`;
            otherVoteDiv.querySelector(".main").addEventListener("click", () => toggleBoth(otherVoteDiv));

            const votersDiv = otherVoteDiv.querySelector(".voters");
            vote.voters.forEach(voter => {
                const voterImg = document.createElement("img");
                voterImg.src = `cast/${voter.toLowerCase()}.png`;
                voterImg.alt = voter;
                const voterName = document.createElement("p");
                voterName.innerText = voter;
                const voterContainer = document.createElement("div");
                voterContainer.style.display = "flex";
                voterContainer.style.flexDirection = "column";
                voterContainer.style.alignItems = "center";
                voterContainer.appendChild(voterImg);
                voterContainer.appendChild(voterName);
                votersDiv.appendChild(voterContainer);
            });

            otherVotes.appendChild(otherVoteDiv);
        });
    }
    else {
        document.getElementById("other-votes-container").remove();
    }
}

function toggleSelfVote(voteDiv) {
    if (voteDiv.classList.contains("self-vote")) {
        voteDiv.classList.remove("self-vote");
        voteDiv.querySelector(".self-vote-label")?.remove();
    } else {
        voteDiv.classList.add("self-vote");
        const label = document.createElement("div");
        label.className = "self-vote-label";
        label.innerText = "Self-Vote";
        label.style.position = "absolute";
        label.style.color = "red";
        label.style.fontWeight = "bold";
        label.style.fontSize = "25px";
        label.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
        label.style.transform = "rotate(-20deg)";
        voteDiv.appendChild(label);
    }
}

function toggleNullified(otherVoteDiv) {
    const img = otherVoteDiv.querySelector(".main");
    if (img.classList.contains("nullified")) {
        img.classList.remove("nullified");
        otherVoteDiv.querySelector(".nullified-label")?.remove();
    } else {
        img.classList.add("nullified");
        const label = document.createElement("div");
        label.className = "nullified-label";
        label.innerText = "Nullified";
        label.style.position = "absolute";
        label.style.color = "khaki";
        label.style.fontWeight = "bold";
        label.style.fontSize = "25px";
        label.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
        label.style.transform = "rotate(-20deg)";
        otherVoteDiv.appendChild(label);
    }
}

function toggleBoth(voteDiv) {
    if (voteDiv.classList.contains("self-vote")) {
        voteDiv.classList.remove("self-vote");
        voteDiv.querySelector(".self-vote-label")?.remove();
        toggleNullified(voteDiv);
    }
    else if (voteDiv.querySelector(".main").classList.contains("nullified")) {
        toggleNullified(voteDiv);
    }
    else {
        toggleSelfVote(voteDiv);
    }
}

// Populate with example data
populateData(input);
