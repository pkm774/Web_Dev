// ==> using 'class' Selector for multiple buttons
// Below we are using window.location.href = url; to change the browser’s location to the new URL.
// This effectively redirects the browser to the /view page with the specified postId.
// It works because it explicitly redirects the browser to the new URL.
$(".blogViewButton").on('click', async (event) => {
    try {
        event.preventDefault();
        if (event.type === 'click') {
            // Get the clicked button's ID
            const buttonId = event.target.id;
            // Send blog text
            let url = `/view?postId=${buttonId}`;
            window.location.href = url;
        }
    } catch (error) {
        console.log(`Client: Error in loading blog view page: ${error}`)
    }
});