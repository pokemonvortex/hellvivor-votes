document.getElementById('add-other-vote').addEventListener('click', function() {
    const container = document.getElementById('other-votes-container');

    const otherVoteDiv = document.createElement('div');
    otherVoteDiv.className = 'other-vote';

    otherVoteDiv.innerHTML = `
        <div class="form-group">
            <label>Voted For Name</label>
            <input type="text" class="voted-for-name">
        </div>
        <div class="form-group">
            <label>Voters (one per line)</label>
            <textarea class="voters"></textarea>
        </div>
        <button class="remove-btn">Remove</button>
    `;

    container.appendChild(otherVoteDiv);

    otherVoteDiv.querySelector('.remove-btn').addEventListener('click', function() {
        container.removeChild(otherVoteDiv);
    });
});

document.getElementById('generate-output').addEventListener('click', function() {
    const tribeName = document.getElementById('tribe-name').value;
    const immunityHolder = document.getElementById('immunity-holder').value;
    const votedOutName = document.getElementById('voted-out-name').value;
    const placement = document.getElementById('placement').value;
    const votedOutVoters = document.getElementById('voted-out-voters').value.trim().split('\n');

    const otherVotes = [];
    document.querySelectorAll('.other-vote').forEach(div => {
        const name = div.querySelector('.voted-for-name').value;
        const voters = div.querySelector('.voters').value.trim().split('\n');
        otherVotes.push({ name, voters });
    });

    const inputData = {
        tribe: tribeName,
        immunity: immunityHolder,
        votedOut: {
            name: votedOutName,
            placement: placement,
            voters: votedOutVoters
        },
        otherVotes: otherVotes
    };

    sessionStorage.setItem('inputData', JSON.stringify(inputData, null, 2));
    console.log("worked");
    window.location.href = "result.html";
});
